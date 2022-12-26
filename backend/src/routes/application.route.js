const express = require("express");
const ApplicationService = require("../services/application.service");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validateField");
const {
  validateJWT,
  validateApplication,
} = require("../middlewares/validation.middleware");

class ApplicationRoute {
  #router;
  #applicationService;
  constructor() {
    this.#router = express();
    this.#applicationService = new ApplicationService();
    this.#route();
  }
  #route() {
    this.#router.post(
      "/",
      [validateJWT, validateApplication],
      this.#applicationService.post
    );

    this.#router.get(
      "/",
      validateJWT,
      this.#applicationService.getApplications
    );

    this.#router.delete(
      "/:id",
      [
        validateJWT,
        check("id", "id is not valid Mongo id").isMongoId(),
        validateField,
      ],
      this.#applicationService.deleteApplication
    );
  }

  get router() {
    return this.#router;
  }
}

const { router: aapplicationRouter } = new ApplicationRoute();
module.exports = {
  aapplicationRouter,
};
