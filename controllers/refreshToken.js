import { verifyJwt, signJwt } from '../utils/jwtSignAndVerify.js';

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
        return res.status(200).json({
            status: 'success',
            token: newAccessToken
        });

    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default refreshToken;