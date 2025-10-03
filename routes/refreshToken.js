import refreshToken from '../controllers/refreshToken.js'

const router = express.Router();

router.post('/', refreshToken);
export default router;
