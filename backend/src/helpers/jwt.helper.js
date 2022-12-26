const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

const generateJWT = (user) => {
  const payload = {
    email: user.email,
    name: user.name,
    city: user.city,
    role: user.role,
    id:user._id
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.private_jwt,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      }
    );
  });
};



module.exports = {
  generateJWT,
};
