const { request, response } = require("express");
const responseMessage = require("../helpers/messages.helper");
const { applicationModel, offerModel } = require("../models");

class ApplicationService {
  async post(req = request, res = response) {
    const { offer } = req.body;
    const { id: user } = req.payload;
    try {
      const { user: employer } = await offerModel.findOne({ _id: offer });
      const application = new applicationModel({ user, offer, employer });
      await application.save();
      const response = responseMessage(
        true,
        201,
        "successful application ",
        application
      );
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async getApplications(req = request, res = response) {
    const { id, role } = req.payload;
    try {
      const applications =
        role === "EMPLOYER"
          ? await applicationModel
              .find({
                employer: id,
              })
              .populate(["user", "employer"])
              .populate({ path: "offer", populate: { path: "category" } })
              .populate({ path: "offer", populate: { path: "country" } })
          : await applicationModel
              .find({
                user: id,
              })
              .populate(["user", "employer"])
              .populate({ path: "offer", populate: { path: "category" } })
              .populate({ path: "offer", populate: { path: "country" } });

      const response = responseMessage(
        true,
        201,
        "list applications",
        applications
      );
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async deleteApplication(req = request, res = response) {
    const { id } = req.payload;
    const { id: applicationId } = req.params;
    try {
      const application = await applicationModel.findOne({_id:applicationId}).populate("user");
      console.log(application.user._id);
      if (application.user._id == id) {
        await applicationModel.findByIdAndDelete(applicationId);
        const response = responseMessage(true, 201, "application deleted");
        return res.status(200).json(response);
      }
      const response = responseMessage(false, 401, "unauthorized user");
      return res.status(401).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }
}

module.exports = ApplicationService;
