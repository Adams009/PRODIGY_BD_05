import crypto from 'crypto';
import ENV from '../config/envConfig.js';

const csrfTokenRoute = (req, res) => {
  const csrfToken = crypto.randomBytes(32).toString('hex');
  res.cookie('csrfToken', csrfToken, {
    httpOnly: false, // Must be accessible by JS
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'Lax', // or 'Lax' if not cross-domain
    maxAge: 60 * 60 * 1000 // 1 hour
  });
  res.status(204).end();
//   res.json({ csrfToken }); // Optionally send it in the response body
};

export default csrfTokenRoute;