const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
