const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token received:', token);
  if (!token) {
    return res.status(401).json({ error: 'Access denied - Token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    //req.user : {user_id : int, iat, exp}
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
module.exports = verifyToken;
