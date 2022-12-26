import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../context/auth/authContext";
import axios from "axios";
import { errormesage, successMessage } from "../helpers/alertMessages";
import { createErrorMessage } from "../helpers/responseErrorMessage";


const ModalUser = ({ userEdit ,options,getUsers}) => {
  const initialState = {
    email: userEdit.email,
    name: userEdit.name,
    role: userEdit.role,
    _id: userEdit._id,
  };
  const { user } = useContext(AuthContext);
  const [formValues, setformValues] = useState(initialState);
  const closeBtnRef = useRef();


  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.put(
        `/user/${formValues._id}`,
        formValues,
        options
      );
      closeBtnRef.current.click();
      successMessage(response.message)
      getUsers()
    } catch (error) {
      const responseError = createErrorMessage(error);
      errormesage(responseError);
    }
  };

  useEffect(() => {
    setformValues(userEdit);
  }, [userEdit]);

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
              Update user
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
                        onSubmit={handleSubmit}
                      >
                        <div className="form-floating mb-3">
                          <input
                            autoComplete="off"
                            name="name"
                            type="text"
                            className="form-control shadow-none"
                            id="floatingName"
                            placeholder="Name"
                            required={true}
                            value={formValues.name}
                            onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                          handleInputChange(e);
                        }}
                          />
                          <label htmlFor="floatingName">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                          <input
                            autoComplete="off"
                            name="email"
                            type="email"
                            className="form-control shadow-none"
                            id="floatingEmail"
                            placeholder="name@example.com"
                            required={true}
                            value={formValues.email}
                            onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                          handleInputChange(e);
                        }}
                          />
                          <label htmlFor="floatingEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                          <select
                            className="form-select form-control   text-light"
                            name="role"
                            value={formValues.role}
                            onChange={handleInputChange}
                            disabled={user.id === formValues._id}
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="EMPLOYER">EMPLOYER</option>
                            <option value="USER">APPLICANT</option>
                          </select>
                          <label htmlFor="">Role</label>
                        </div>

                        <button className="button  mt-3" type="submit">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span> Update
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

ModalUser.propTypes = {
  user: PropTypes.object,
};

export default ModalUser;
