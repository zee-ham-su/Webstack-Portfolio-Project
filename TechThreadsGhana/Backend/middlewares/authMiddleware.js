const jwt = require('jsonwebtoken');
require('dotenv').config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      console.error('Error verifying token:', err);
      return res.sendStatus(403);
    }
    console.log('Decoded Token:', decodedToken);
    req.user = decodedToken;
    next();
  });
}

module.exports = {
  authenticateToken,
  ACCESS_TOKEN_SECRET
};
