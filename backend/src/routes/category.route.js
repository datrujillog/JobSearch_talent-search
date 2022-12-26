const { Router } = require("express");
const { validateJWT } = require("../middlewares/validation.middleware");
const CategoryService = require("../services/category.service");

class CategoryRoute {
  #router;
  #categoryService;
  constructor() {
    this.#router = Router();
    this.#categoryService = new CategoryService();
    this.#routes();
  }

  #routes() {
    this.#router.get("/", validateJWT, this.#categoryService.getCategories);
  }

  get router() {
    return this.#router;
  }
}

const { router: categoryRoute } = new CategoryRoute();

module.exports = {
  categoryRoute,
};
