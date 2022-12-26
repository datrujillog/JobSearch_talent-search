const { request, response } = require("express");
const responseMessage = require("../helpers/messages.helper");
const { countryModel } = require("../models");

class ContryService {
  async getCountries(req = request, res = response) {
    try {
      const countries = await countryModel.find();
      const response = responseMessage(
        true,
        201,
        "list coutries",
        countries
      );
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }
}

module.exports = ContryService
