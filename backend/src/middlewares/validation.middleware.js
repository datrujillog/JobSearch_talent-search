const { request, response } = require("express");
const responseMessage = require("../helpers/messages.helper");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const { applicationModel } = require("../models");

const validateJWT = (req = request, res = response, next) => {
  if (!req.header("Authorization")) {
    const response = responseMessage(false, 401, "unauthorized user");
    return res.status(401).json(response);
  }
  try {
    const token = req.header("Authorization").split(" ");
    if (token.length < 2) {
      const response = responseMessage(false, 401, "invalid token");
      return res.status(401).json(response);
    }
    const payload = jwt.verify(token[1], config.private_jwt);
    req.payload = payload;
  } catch (error) {
    const response = responseMessage(
      false,
      401,
      `Invalid token ${error.message}`
    );
    return res.status(401).json(response);
  }
  next();
};
const validateRoleEmployeer = (req = request, res = response, next) => {
  if (req.payload.role !== "EMPLOYER") {
    const message = responseMessage(false, 401, "unauthorized user");

    return res.status(401).json(message);
  }
  next();
};

const validateRoleAdmin = (req = request, res = response, next) => {
  
  if (req.payload.role !== "ADMIN") {
    const message = responseMessage(false,401,"unauthorized user")
    return res.status(401).json(message)
  }
  next()
};

const validateApplication = async(req = request, res = response, next)=>{

  const {offer} = req.body 
  const { id: user,email } = req.payload;
  try {
    const application = await applicationModel.findOne({user,offer})
    if (application) {
      const response = responseMessage(
        true,
        400,
        `The user ${email} already applied this offer`,
        application
      );
      return res.status(400).json(response);
    }
  } catch (error) {
    const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
  }
  next()
}

module.exports = {
  validateJWT,
  validateRoleEmployeer,
  validateRoleAdmin,
  validateApplication
};
