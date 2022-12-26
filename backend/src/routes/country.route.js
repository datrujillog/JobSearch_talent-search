const { Router } = require("express");
const { validateJWT } = require("../middlewares/validation.middleware");
const ContryService = require("../services/country.service");


class CountryRoute {
  #router;
  #countryService;
  constructor() {
    this.#router = Router();
    this.#countryService = new ContryService();
    this.#routes();
  }

  #routes() {
    this.#router.get("/", validateJWT, this.#countryService.getCountries);
  }

  get router() {
    return this.#router;
  }
}

const { router: countryRoute } = new CountryRoute();

module.exports = {
  countryRoute,
};
