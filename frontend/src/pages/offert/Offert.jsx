import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth/authContext";
import moment from "moment";
import { NavLink } from "react-router-dom";

import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { createErrorMessage } from "../../helpers/responseErrorMessage";
import { errormesage } from "../../helpers/alertMessages";
import AlertComponent from "../../components/ui/AlertComponent";
import { ModalOffert } from "../../components/ModalOffert";

export const Offert = () => {
  const { user } = useContext(AuthContext);
  const options = { headers: { Authorization: `Bearer ${user.token}` } };
  const [offerts, setofferts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setcategories] = useState([]);
  const [category, setCategory] = useState("");
  const [country, setcountry] = useState("");
  const [filter, setfilter] = useState(false);
  const [loading, setloading] = useState(true);

  const handleChangeCountry = (e) => {
    setcountry(e.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const getDataFilter = async () => {
    try {
      const [{ data: responseCategory }, { data: responseCountry }] =
        await Promise.all([
          axios.get("/category", options),
          axios.get("/country/", options),
        ]);
      setcategories(responseCategory.data);
      setCountries(responseCountry.data);
    } catch (error) {
      const responseError = createErrorMessage(error);
      errormesage(responseError);
      console.error(error);
    }
  };

  const getOfferts = async () => {
    let url = "";
    if (user.role === "USER") {
      url = filter
        ? `/offer?country=${country}&category=${category}`
        : "/offer";
    } else {
      url = `/offer/employer-offerts/${user.id}`;
    }
    try {
      const { data: response } = await axios.get(url, options);
      setofferts(response.data);
    } catch (error) {
      setloading(false);
      console.error(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
    }
    setloading(false);
  };

  useEffect(() => {
    setloading(true);
    getDataFilter();
  }, []);

  useEffect(() => {
    setloading(true);

    if (!filter) {
      setCategory("");
      setcountry("");
    }

    getOfferts();
  }, [filter]);

  const alertMessaje = {
    notFoundFilter:
      "We are sorry at this time we do not have offers available for your search criterial",
    NotOfferts:
      "We are sorry we still do not have offers available in the application for any type of category or country",
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      {user.role === "USER" && (
        <div className="filter-section">
          <div className="row d-flex justify-content-center mt-5">
            <div className="col-12 col-lg-6  d-flex p-2">
              <select
                className="form-select mx-2 bg-dark text-light"
                value={category}
                onChange={handleChangeCategory}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <select
                className="form-select mx-2 bg-dark text-light"
                value={country}
                onChange={handleChangeCountry}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.country}
                  </option>
                ))}
              </select>
              <button
                className="button"
                onClick={() => {
                  (country || category) && setfilter(!filter);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span> {filter ? "Clear" : "Search"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-5">
        {offerts.length === 0 && !loading && (
          <AlertComponent
            message={
              filter ? alertMessaje.notFoundFilter : alertMessaje.NotOfferts
            }
          />
        )}
      </div>
      <section className="mt-3">
        {user.role === "EMPLOYER" && (
          <button
            style={{ maxWidth: 200 }}
            className="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span> New offer
          </button>
        )}
        <div className="card-deck row mt-3 animate__animated animate__slideInDown">
          {offerts.map((offert) => (
            <div key={offert._id} className="col-12 col-md-4 col-lg-3 my-3">
              <div className="card h-100 card-offert bg-dark">
                <div className="hover_color_bubble"></div>
                <div className="card-body">
                  <h5 className="card-title">{offert.name}</h5>
                  {user.role === "EMPLOYER" && (
                    <div className="d-flex my-3">
                      <div
                        className={`offer-status-${
                          offert.status ? "active" : "inactive"
                        } me-3`}
                      ></div>{" "}
                      {offert.status ? "Active" : "Inactive"}
                    </div>
                  )}
                  <p className="card-text my-3">
                    <span>Employer: </span>
                    {offert.user.name}
                  </p>
                  <div className="d-flex aling-items-center card-offert_category mb-3">
                    <div className="me-2 bg-darkcategory-item">
                      <i className="fa-solid fa-tags me-2 text-muted"></i>
                      {offert.category.category}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    {" "}
                    <div className="card-offert__time">
                      <i className="fa-solid fa-clock text-muted me-1"></i>{" "}
                      {moment(offert.createdAt).fromNow()}
                    </div>
                    <div className="card-offert__location">
                      <i className="fa-solid fa-location-dot text-muted me-1"></i>
                      {`${offert.country.country}`}
                    </div>
                  </div>

                  <div className="card-footer bg-transparent text-muted mt-3">
                    <NavLink to={`/details/${offert._id}`}>
                      <button className="button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span> Read more
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ModalOffert
        categories={categories}
        countries={countries}
        options={options}
        getOfferts={getOfferts}
      />
    </>
  );
};
