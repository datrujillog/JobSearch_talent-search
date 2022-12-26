import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { errormesage, successMessage } from "../helpers/alertMessages";
import { createErrorMessage } from "../helpers/responseErrorMessage";

export const ModalOffert = ({ countries, categories, options ,getOfferts}) => {
  const initialState = {
    name: "",
    country: "countries[0]._id",
    category: "categories[0]._id",
    salary: "",
    modality: "REMOTO",
    seniority: "JUNIOR",
    description: "",
  };
  const [formValues, handleInputChange, resetForm] = useForm(initialState);

  const closeBtnRef = useRef();

  const handleSubmitForm = async (e) => {
   
    e.preventDefault();
    const { salary, modality, seniority, description, ...data } = formValues;
    const body = {
      ...data,
      details: {
        salary,
        modality,
        seniority,
        description,
      },
    };
    try {
      const { data: response } = await axios.post("/offer/", body, options);
      closeBtnRef.current.click()
      successMessage(response.message);
      resetForm();
      getOfferts()
      
    } catch (error) {
      const responseError = createErrorMessage(error);
      errormesage(responseError);
    }
  };
  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title text-muted" id="staticBackdropLabel">
              New offert
            </h5>
            <button
              ref={closeBtnRef}
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container h-100 mt-5 ">
              <div className="d-flex row justify-content-center aling-items-center h-100">
                <div className="col-12 position-relative">
                  <div className="card custom-card-offert  text-light bg-dark">
                    <div className="card-body p-4">
                      <form
                        className="form-floating base-form"
                        onSubmit={handleSubmitForm}
                      >
                        <div className="form-floating mb-3">
                          <input
                            autoComplete="off"
                            name="name"
                            type="text"
                            className="form-control shadow-none"
                            id="floatingName"
                            placeholder="Title offer"
                            required={true}
                            value={formValues.name}
                            onChange={handleInputChange}
                          />
                          <label htmlFor="floatingName" className="text-muted">
                            Title offer
                          </label>
                        </div>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select form-control  text-light"
                            name="category"
                            value={formValues.category}
                            onChange={handleInputChange}
                            required={true}
                          >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.category}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="">Category</label>
                        </div>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select form-control text-light"
                            name="country"
                            value={formValues.country}
                            onChange={handleInputChange}
                            required={true}
                          >
                            <option value="">Select country</option>
                            {countries.map((country) => (
                              <option key={country._id} value={country._id}>
                                {country.country}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="">Country</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            autoComplete="off"
                            name="salary"
                            type="number"
                            className="form-control shadow-none"
                            id="floatingSalary"
                            placeholder="Salary"
                            required={true}
                            min={1}
                            step="0.01"
                            value={formValues.salary}
                            onChange={handleInputChange}
                          />
                          <label
                            htmlFor="floatingSalary"
                            className="text-muted"
                          >
                            Salary
                          </label>
                        </div>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select form-control   text-light"
                            name="modality"
                            defaultValue={"REMOTO"}
                            value={formValues.modality}
                            onChange={handleInputChange}
                          >
                            <option value="REMOTO">REMOTO</option>
                            <option value="HIBRIDO">HIBRIDO</option>
                            <option value="PRESENCIAL">PRESENCIAL</option>
                          </select>
                          <label htmlFor="">Modality</label>
                        </div>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select form-control   text-light"
                            name="seniority"
                            defaultValue={"JUNIOR"}
                            value={formValues.seniority}
                            onChange={handleInputChange}
                          >
                            <option value="JUNIOR">JUNIOR</option>
                            <option value="SEMI-SENIOR">SEMI-SENIOR</option>
                            <option value="MID-SENIOR">MID-SENIOR</option>
                            <option value="SENIOR">SENIOR</option>
                          </select>
                          <label htmlFor="">Seniority</label>
                        </div>

                        <div className="form-floating mb-3">
                          <textarea
                            name="description"
                            className="form-control"
                            placeholder="Leave a comment here"
                            id="floatingDescription"
                            style={{ resize: "none", height: 180 }}
                            required={true}
                            value={formValues.description}
                            onChange={handleInputChange}
                          ></textarea>
                          <label
                            htmlFor="floatingDescription"
                            className="text-muted"
                          >
                            Description
                          </label>
                        </div>
                        <button className="button  mt-3" type="submit">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span> Create offer
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalOffert.propTypes = {
  countries: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
};
