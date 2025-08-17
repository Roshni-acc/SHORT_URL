require("dotenv").config();
const jwt  = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "1h" } // optional: 1 hour expiry
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
