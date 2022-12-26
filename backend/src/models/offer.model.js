const { Schema, model } = require("mongoose");

const offerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    
    details: {
      salary: {
        type: Number,
        required: true,
      },
      modality: {
        type: String,
        enum: ["REMOTO", "HIBRIDO", "PRESENCIAL"],
        required: true,
      },
      seniority: {
        type: String,
        enum: ["JUNIOR", "SEMI-SENIOR", "MID-SENIOR", "SENIOR"],
      },
      description: {
        type: String,
        required: true,
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Offer", offerSchema);
