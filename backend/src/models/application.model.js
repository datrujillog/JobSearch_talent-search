const { model, Schema } = require("mongoose");

const applicationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Application", applicationSchema);
