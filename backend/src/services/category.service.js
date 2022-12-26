const { request, response } = require("express");
const responseMessage = require("../helpers/messages.helper");
const { categoryModel } = require("../models");

class CategoryService {
  async getCategories(req = request, res = response) {
    try {
      const categories = await categoryModel.find();
      const response = responseMessage(
        true,
        201,
        "list categories",
        categories
      );
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }
}

module.exports = CategoryService
