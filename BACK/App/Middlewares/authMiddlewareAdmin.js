const jwt = require('jsonwebtoken');
const {
  getUserInfoForMiddleware,
} = require('../../Admin/Controllers/aUserController');

async function adminPageMiddleware(req, res, next) {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    // console.log('Token received in adminPageMiddleware:', token);
    if (!token) {
      return res.status(401).json({ error: 'Access denied - Token missing' });
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user_id = decoded.user_id;
    // console.log('Decoded id:', decoded, req.user_id);
    const userInfo = await getUserInfoForMiddleware(req);

    // vérifier si le user role est admin
    if (userInfo.role !== 'Admin') {
      return res
        .status(403)
        .json({ error: 'Access denied - User is not an admin' });
    }

    req.user = userInfo;
    res.setHeader('isAdmin', userInfo.role === 'Admin');
    console.log('isAdmin set in middleware:', userInfo.role === 'Admin');
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

module.exports = { adminPageMiddleware };
