const jwt = require('jsonwebtoken');
const { getUserInfos } = require('../Controllers/userController');

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log('Token received:', token);
  if (!token) {
    return res.status(401).json({ error: 'Access denied - Token missing' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user_id = decoded.user_id;
    console.log('Decoded token:', decoded, req.user_id); // {user_id : int, iat, exp}
    // req.user : {user_id : int, iat, exp}
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
async function requireAdmin(req, res, next) {
  try {
    const userResponse = await getUserInfos(req);

    if (userResponse.error) {
      return res.status(404).json({ message: userResponse.error });
    }

    const user = userResponse.user;
    req.user_role = user.role;
    console.log('User role:', req.user_role);

    if (req.user_role === 'Admin') {
      next();
    } else {
      // If the user doesn't have the required role, deny access
      return res
        .status(403)
        .json({ error: 'Access denied - Insufficient privileges' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An unexpected error occurred.' });
  }
}

module.exports = { verifyToken, requireAdmin };
