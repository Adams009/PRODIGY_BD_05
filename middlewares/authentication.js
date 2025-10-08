import { verifyJwt } from '../utils/jwtSignAndVerify.js';

// Authentication middleware: verifies JWT and attaches user to req.user
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.replace('Bearer ', '');
        const payload = await verifyJwt(token);
        if (!payload) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }   
        req.user = payload;
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default authenticate