const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};
const comparePassword = async (password, hash) => {
  try {
    const isValid = await bcrypt.compareSync(password, hash);
    return isValid;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  encryptPassword,
  comparePassword
};
