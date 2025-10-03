import { verifyJwt, signJwt } from '../utils/jwtSignAndVerify.js';
import ENV from '../config/env.js';

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }

        const payload = await verifyJwt(refreshToken);

        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }

        // Optionally check for token revocation/blacklist here
        const { id, role } = payload;
        const newAccessToken = await signJwt({ id, role }, { exp: '15m' });

        const newRefreshToken = await signJwt({ id, role }, { exp : '7d', notBefore: '15m'})
        
        res.clearCookie('refreshToken'); // Clear the old refresh token from the client

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly : ENV.NODE_ENV === 'production',
            secure : ENV.NODE_ENV === 'production',
            sameSite : 'Lax',
            maxAge : 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(200).json({
            status: 'success',
            token: newAccessToken
        });

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default refreshToken;