import { verifyJwt, signJwt } from '../utils/jwtSignAndVerify.js';
import ENV from '../config/envConfig.js';
import { isRefreshTokenBlacklisted, blacklistRefreshToken } from '../utils/refreshTokenBlacklist.js';
import redisClient from '../config/redisConfig.js';
import { v4 as uuidv4 } from 'uuid';

const BLOCK_DURATION_SECONDS = 60 * 60; // 1 hour

const refreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }

        const userIp = req.ip;
        let userId = null;
        let jti = null;
        let payload = null;

        try {
            // extraction of jti and userId from the token
            payload = await verifyJwt(refreshToken);
            if (payload && payload.id) userId = payload.id;
            if (payload && payload.jti) jti = payload.jti;
        } catch (error) {
            // nothing to do
        }

        // Block check by user and IP
        const isUserBlocked = userId ? await redisClient.get(`block:user:${userId}`) : false;
        const isIpBlocked = await redisClient.get(`block:ip:${userIp}`);
        if (isUserBlocked || isIpBlocked) {
            return res.status(429).json({ error: 'Too many invalid attempts. Try again later.' });
        }

        // Blacklist check by jti
        const blackListed = jti ? await isRefreshTokenBlacklisted(jti) : false;
        if (blackListed) {
            if (userId) await redisClient.set(`block:user:${userId}`, userId, { EX: BLOCK_DURATION_SECONDS });
            await redisClient.set(`block:ip:${userIp}`, userIp, { EX: BLOCK_DURATION_SECONDS });
            return res.status(401).json({ error: 'Refresh token has been revoked. You are temporarily blocked.' });
        }

        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        // Generate a new access token and refresh token with new jti
        const { id, role } = payload;
        const newJti = uuidv4();
        const newAccessToken = await signJwt({ id, role }, { exp: '15m' });
        const newRefreshToken = await signJwt({ id, role, jti: newJti }, { exp: '7d', notBefore: '15m' });

        // Blacklist the old jti
        if (jti) await blacklistRefreshToken(jti);
        res.clearCookie('refreshToken');

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: ENV.NODE_ENV === 'production',
            secure: ENV.NODE_ENV === 'production',
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json({
            status: 'success',
            token: newAccessToken
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default refreshTokenController;