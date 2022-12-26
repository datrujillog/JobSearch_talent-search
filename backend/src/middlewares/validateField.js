const { request, response } = require("express");
const { validationResult } = require("express-validator");
const responseMessage = require("../helpers/messages.helper");

const validateField = (req=request, res=response, next)=>{

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const response = responseMessage(false,400,errors)
      return res.status(400).json(response)
    }
    next()
}

module.exports={
    validateField
}