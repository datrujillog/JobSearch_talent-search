const { request, response } = require("express");
const { comparePassword } = require("../helpers/bcrypt.helper");
const { generateJWT } = require("../helpers/jwt.helper");
const responseMessage = require("../helpers/messages.helper");
const { userModel } = require("../models");

class AuthService {
  async post(req = request, res = response) {
    const { password, email } = req.body;
    try {
      const user = await userModel.findOne({ email , status:true});
      if (!user) {
        const response = responseMessage(false, 404, `User or Password incorrect`);
        return res.status(404).json(response);
      }

      const isvalid = await comparePassword(password, user.password);
      if (!isvalid) {
        const response = responseMessage(
          false,
          401,
          "User or Password incorrect"
        );
        return res.status(401).json(response);
      }
      const token = await generateJWT(user);
      const response = responseMessage(true, 200, "User autenticate", {
        email: user.email,
        name: user.name,
        city: user.city,
        role: user.role,
        id: user._id,
        token,
      });
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }
}

module.exports = AuthService;
