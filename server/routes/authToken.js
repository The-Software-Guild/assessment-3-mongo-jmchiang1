const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res
      .status(401)
<<<<<<< HEAD:server/routes/authToken.js
      .json({ message: 'No token present, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret')); //decode the JWT back to plain text 
    //needs to verify that the server has the secret key 
=======
      .json({ msg: 'No token present, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78:Backend/middleware/auth.js

    req.user = decoded.user;
    next();
  } catch (err) {
<<<<<<< HEAD:server/routes/authToken.js
    res.status(401).json({ message: 'Token is not valid' });
=======
    res.status(401).json({ msg: 'Token is not valid' });
>>>>>>> 6fce6247fe8645ab9a999fdf588195ef775aef78:Backend/middleware/auth.js
  }
};
