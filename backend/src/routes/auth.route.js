const express = require("express");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validateField");
const AuthService = require("../services/auth.service");

class AuthRoute {
  #router;
  #authService;
  constructor() {
    this.#router = express();
    this.#authService = new AuthService();
    this.#routes();
  }

  #routes() {
    this.#router.post(
      "/",
      [
        check("email", "Email invalido").isEmail(),
       
        validateField,
      ],
      this.#authService.post
    );
  }

  get router() {
    return this.#router;
  }
}

const { router: authRouter } = new AuthRoute();
module.exports = {
  authRouter,
};
