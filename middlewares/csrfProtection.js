function csrfProtection(req, res, next) {
  const csrfCookie = req.cookies.csrfToken;
  const csrfHeader = req.headers['x-csrf-token'];
  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

export default csrfProtection