import refreshTokenController from '../controllers/refreshToken.js'
import { Router } from 'express';
const router = Router();

router.post('/', refreshTokenController);
export default router;
