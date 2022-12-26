const categories = require("../data/defaultCategories");
const countries = require("../data/defaultCountries");
const { countryModel, categoryModel } = require("../models");

const loadinitialData = async () => {
  try {
    const countCategory = await categoryModel.count();
    const countCountry = await countryModel.count();
    if (countCategory == 0 || !countCategory) {
      await countryModel.insertMany(countries);
    }
    if (countCountry == 0 || !countCountry) {
      await categoryModel.insertMany(categories);
    }
  } catch (error) {
      console.log(error);
  }
};

module.exports = loadinitialData
