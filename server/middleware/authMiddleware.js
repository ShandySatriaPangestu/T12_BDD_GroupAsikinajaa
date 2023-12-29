import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const [bearer, token] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid Authorization header format' });
    }

    const decodedData = jwt.verify(token, 'sendiganteng');

    req.userId = decodedData.userId;
    console.log('Decoded UserId:', req.userId);

    next();
  } catch (error) {
    // Tangani kesalahan verifikasi token
    console.error('Error during token verification:', error);

    // Tampilkan informasi kesalahan secara lebih rinci
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

export default authMiddleware;
