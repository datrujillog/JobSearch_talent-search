const { Router } = require("express");
const OfferService = require("../services/ofert.service");
const { check } = require("express-validator");
const { validateField } = require("../middlewares/validateField");
const {
  validateJWT,
  validateRoleEmployeer,
} = require("../middlewares/validation.middleware");

class OfferRoute {
  #router;
  #offerService;
  constructor() {
    this.#router = Router();
    this.#offerService = new OfferService();
    this.#routes();
  }

  #routes() {
    this.#router.post(
      "/",
      [validateJWT, validateRoleEmployeer],
      this.#offerService.post
    );

    this.#router.get(
      "/employer-offerts/:id",
      [
        validateJWT,
        check("id", "Id is invalid mongo id").isMongoId(),
        validateField,
      ],
      this.#offerService.getOffertByUser
    );

    this.#router.get(
      "/:id",
      [
        validateJWT,
        check("id", "Id is invalid mongo id").isMongoId(),
        validateField,
      ],
      this.#offerService.getOffert
    );

    this.#router.get("/", [validateJWT], this.#offerService.getofferts);

    this.#router.delete(
      "/:id",
      [
        validateJWT,
        validateRoleEmployeer,
        check("id", "Id is invalid mongo id").isMongoId(),
        validateField,
      ],
      this.#offerService.deleteoffert
    );

    this.#router.put(
      "/:id",
      [
        validateJWT,
        validateRoleEmployeer,
        check("id", "Id is invalid mongo id").isMongoId(),
        validateField,
      ],
      this.#offerService.putOffer
    );
  }

  get router() {
    return this.#router;
  }
}

const { router: offRoute } = new OfferRoute();

module.exports = {
  offRoute,
};
