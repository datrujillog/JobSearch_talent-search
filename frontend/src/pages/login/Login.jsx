import axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../context/auth/authContext";
import { useForm } from "../../hooks/useForm";
import { types } from "../../types/types";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { errormesage, successMessage } from "../../helpers/alertMessages";
import { createErrorMessage } from "../../helpers/responseErrorMessage";

export const Login = () => {
  const initialState = {
    email: "",
    password: "",
    name: "",
    role: "",
  };
  const { dispatch } = useContext(AuthContext);
  const [login, setlogin] = useState(true);
  const [formValues, handleInputChange, resetForm] = useForm(initialState);
  const [loading, setloading] = useState(false);

  const loginUser = async () => {
    setloading(true);
    try {
      const { data } = await axios.post("/login", formValues);
      dispatch({
        type: types.login,
        payload: data.data,
      });
      successMessage(`Welcome ${data.data.name}`);
    } catch (error) {
      setloading(false);
      console.log(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
    }
    setloading(false);
  };

  const registerUser = async () => {
    setloading(true);
    try {
      const { data } = await axios.post("/user", formValues);
      dispatch({
        type: types.login,
        payload: data.data,
      });
      successMessage(`Welcome ${data.data.name}`);
    } catch (error) {
      setloading(false);
      console.log(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
    }
    setloading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login ? loginUser() : registerUser();
    resetForm();
  };

  const handleCheck = (e) => {
    e.target.checked
      ? (e.target.value = "EMPLOYER")
      : (e.target.value = "USER");
    handleInputChange(e);
  };
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="container h-100 mt-5 ">
        <div className="d-flex row justify-content-center aling-items-center h-100">
          <div className="col-12 col-md-9 col-lg-6 col-xl-4 position-relative">
            <div className="card custom-card  text-light bg-dark">
              <img
                className="card-img-top"
                src="/assets/images/jobSearch24ejes.png"
                alt=""
              />
              <div className="card-body p-4">
                <h2 className="text-uppercase text-center mb-5">
                  {login ? "LOGIN" : "REGISTER"}
                </h2>
                <form
                  className="form-floating base-form"
                  onSubmit={handleSubmit}
                >
                  {!login && (
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
                  )}
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
                    <input
                      autoComplete="off"
                      name="password"
                      type="password"
                      className="form-control shadow-none"
                      id="floatingPassword"
                      placeholder="Password"
                      required={true}
                      value={formValues.password}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  {!login && (
                    <div className="w-100 d-flex justify-content-end mt-3">
                      <label className="switch">
                        <input
                          name="role"
                          value={formValues.role}
                          type="checkbox"
                          onClick={handleCheck}
                        />
                        <span name="role" className="slider"></span>
                      </label>
                    </div>
                  )}

                  <button className="button  mt-3" type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span> {login ? "LOGIN" : "REGISTER"}
                  </button>

                  <div className="text-center mt-3 link-form d-flex">
                    <label className="switch2">
                      <input
                        type="checkbox"
                        onClick={() => {
                          setlogin(!login);
                          resetForm();
                        }}
                      />
                      <span className="slider2"></span>
                    </label>
                    <label className="ms-3">
                      {login ? "Register" : "login"}
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
