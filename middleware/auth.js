const jwt = require("jsonwebtoken");
const config = require("config");

// Authenticates user with JWT token, allowing us to sign in or register a user 
// Put this in the user routes 

// The next function is called to move on to the next middleware.
module.exports = function (req, res, next) {
  // Gets the token from the header.
  const token = req.header("x-auth-token");
  // Checks to see if the token doesn't exist.
  if (!token) {
    return res.status(401).json({ message: "No token. Authorization denied." });
  }

  try {
    // Verifies token by checking the payload.
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Sets the decoded user of the payload to req.user, so that we have access to the user information inside the route.
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ mesasge: "Token is not valid." });
  }
};
