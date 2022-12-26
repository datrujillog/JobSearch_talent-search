const { Router } = require("express");
const UserService = require("../services/user.service");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validateField");
const {
  validateJWT,
  validateRoleAdmin,
} = require("../middlewares/validation.middleware");

class UserRoute {
  #router;
  #userService;
  constructor() {
    this.#router = Router();
    this.#userService = new UserService();
    this.#routes();
  }

  #routes() {
    this.#router.post(
      "/",
      [
        check("email", "Invalid Email").isEmail(),
        check("password")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "i"
          )
          .withMessage(
            "The password must have a minimum of 8 characters, letters, numbers and special characters."
          ),
        validateField,
      ],
      this.#userService.post
    );

    this.#router.get(
      "/",
      [validateJWT, validateRoleAdmin],
      this.#userService.getUsers
    );

    this.#router.delete(
      "/:id",
      [
        validateJWT,
        validateRoleAdmin,
        check("id", "Id is invalid mongo id").isMongoId(),
        validateField,
      ],
      this.#userService.deleteUser
    );

    this.#router.put("/:id", [
      validateJWT,
      validateRoleAdmin,
      check("id", "Id is invalid mongo id").isMongoId(),
      validateField,
    ],this.#userService.updateUser);
  }

  get router() {
    return this.#router;
  }
}

const { router: userRoute } = new UserRoute();

module.exports = {
  userRoute,
};
