const { request, response } = require("express");
const responseMessage = require("../helpers/messages.helper");
const { offerModel } = require("../models");

class OfferService {
  async post(req = request, res = response) {
    const { name, country, category, details } = req.body;
    const user = req.payload.id;
    try {
      const offer = new offerModel({ name, country, category, details, user });
      await offer.save();
      const response = responseMessage(true, 201, "Offer created", offer);
      return res.status(201).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async getOffertByUser(req = request, res = response) {
    const { id } = req.params;
    try {
      const offers = await offerModel
        .find({ user: id })
        .populate(["user", "category", "country"]);
      const response = responseMessage(true, 201, "Offerts", offers);
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async getOffert(req = request, res = response) {
    const { id } = req.params;
    try {
      const offert = await offerModel
        .findOne({ _id: id })
        .populate(["user", "category", "country"]);

      const response = offert
        ? responseMessage(true, 201, "Offert", offert)
        : responseMessage(true, 404, "Ofert not found", offert);
      return res.status(offert ? 200 : 404).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async getofferts(req = request, res = response) {
    const country = req.query.country || null;
    const category = req.query.category || null;
    let response;
    try {
      let offers;
      if (country && category) {
        offers = await offerModel
          .find({ country, category, status: true })
          .populate(["country", "category", "user"]);

        response = responseMessage(true, 200, "list offerts", offers);
        return res.status(200).json(response);
      }
      if (country || category) {
        offers = await offerModel
          .find({
            status: true,
            $or: [{ country: country }, { category: category }],
          })
          .populate(["country", "category", "user"]);

        response = responseMessage(true, 200, "list offerts", offers);
        return res.status(200).json(response);
      }
      offers = await offerModel
        .find({ status: true })
        .populate(["country", "category", "user"]);
      response = responseMessage(true, 200, "list offerts", offers);
      return res.status(200).json(response);
    } catch (error) {
      response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async deleteoffert(req = request, res = response) {
    const { id } = req.params;

    try {
      await offerModel.findByIdAndUpdate(id, { status: false });
      const response = responseMessage(true, 200, "offer inactive");
      return res.status(200).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }

  async putOffer(req = request, res = response) {
    const { name, country, category, details,status } = req.body;
    const { id } = req.params;
    try {
      const offer = await offerModel
        .findByIdAndUpdate(
          id,
          { name, country, category, details,status },
          { new: true }
        )
        .populate(["country", "category"]);
      const response = responseMessage(true, 201, "Offer updated", offer);
      return res.status(201).json(response);
    } catch (error) {
      const response = responseMessage(false, 500, error.message);
      return res.status(500).json(response);
    }
  }
}

module.exports = OfferService;
