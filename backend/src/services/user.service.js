const { request, response } = require("express");
const { generateJWT } = require("../helpers/jwt.helper");
const responseMessage = require("../helpers/messages.helper");
const { userModel } = require("../models");

class UserService {
  async post(req = request, res = response) {
    const { email, password, name, city, role } = req.body;
    const user = new userModel({ email, password, name, city, role });

    try {
      await user.save();
      const token = await generateJWT(user);
      const response = responseMessage(true, 200, "user created", {
        email: user.email.toUpperCase(),
        name: user.name,
        city: user.city,
        role: user.role,
        id: user._id,
        token,
      });
      return res.status(200).json(response);
    } catch (error) {
      let response;
      if(error.code===11000){
         response = responseMessage(false, 400, `the email ${email} is already registered`);
         return res.status(400).json(response);
    }
       response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }
  async getUsers(req = request, res = response) {
    try {
      const users = await userModel.find();
      const response = responseMessage(true, 200, "all users", users);
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async deleteUser(req = request, res = response) {
    const { id } = req.params;
    try {
      const user = await userModel.findOne({ _id: id, status: true });
      if (!user) {
        const response = responseMessage(false, 404, "user not found");
        return res.status(404).json(response);
      }
      user.status = false;
      await user.save();
      const response = responseMessage(true, 200, "user deleted", user);
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async updateUser(req = request, res = response) {
    const { id } = req.params;
    const { email, name, status, role } = req.body;
    try {
      const user = await userModel.findByIdAndUpdate(
        id,
        {
          email,
          name,
          status,
          role,
        },
        { new: true }
      );
      const response = responseMessage(true, 200, "user update", user);
      return res.status(200).json(response);
    } catch (error) {
      let response;
      if(error.code===11000){
         response = responseMessage(false, 400, `Email ${email} is in use`);
         return res.status(400).json(response);
    }
      response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }
}

module.exports = UserService;
