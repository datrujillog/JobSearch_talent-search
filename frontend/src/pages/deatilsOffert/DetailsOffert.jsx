import axios from "axios";
import moment from "moment";
import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { AuthContext } from "../../context/auth/authContext";
import { errormesage, successMessage } from "../../helpers/alertMessages";
import { getOffertById } from "../../helpers/axiosApi";
import { createErrorMessage } from "../../helpers/responseErrorMessage";

const initialState = {
  details: {
    salary: 0,
    modality: "0",
    seniority: "0",
    description: "",
  },
  _id: "",
  name: "",
  user: {
    _id: "",
    email: "",
    name: "",
    role: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  },
  country: {
    _id: "",
    country: "",
    __v: 0,
  },
  category: {
    _id: "",
    category: "",
    __v: 0,
    createdAt: "",
    updatedAt: "",
  },
  createdAt: "",
  updatedAt: "",
  __v: 0,
  status: true,
};

export const DetailsOffert = () => {
  const { user } = useContext(AuthContext);
  const options = { headers: { Authorization: `Bearer ${user.token}` } };
  const [offer, setoffert] = useState(initialState);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useMemo(async () => {
    setLoading(true);
    try {
      const data = await getOffertById(id, options);
      setoffert(data);
    } catch (error) {
      setLoading(false);
      errormesage(error.message);
      navigate("/");
    }
    setLoading(false);
  }, [id]);

  const handleButtonClick = async () => {
    setLoading(true);
    const body = {
      offer: offer._id,
    };
    try {
      const { data: response } =
        user.role === "EMPLOYER"
          ? offer.status
            ? await axios.delete(`/offer/${offer._id}`, options)
            : await axios.put(`/offer/${offer._id}`, { status: true }, options)
          : await axios.post(`/application`, body, options);
      successMessage(response.message);
      navigate("/offers");
    } catch (error) {
      setLoading(false);
      console.error(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
      navigate("/offers");
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <h2 className="text-center mt-5">{offer.name}</h2>
      <div className="row mt-5">
        <div className="col-12 col-lg-4 mb-5">
          <div className="card h-100 card-offert-deatils  bg-dark">
            <div className="hover_color_bubble"></div>
            <div className="card-body">
              <h3 className="text-center  mb-2">Information</h3>
              <p className="card-text my-3">
                <span className="me-2">Employer: </span>
                {offer.user.name}
              </p>
              <div className="d-flex aling-items-center card-offert_category mb-3">
                <div className="me-2 bg-darkcategory-item">
                  <i className="fa-solid fa-tags me-2 text-muted"></i>
                  {offer.category.category}
                </div>
              </div>

              <div className="d-flex justify-content-between mb-3">
                {" "}
                <div className="card-offert__time">
                  <i className="fa-solid fa-clock text-muted me-1"></i>{" "}
                  {moment(offer.createdAt).fromNow()}
                </div>
                <div className="card-offert__location">
                  <i className="fa-solid fa-location-dot text-muted me-1"></i>
                  {`${offer.country.country}`}
                </div>
              </div>
              <div>
                <i className="fa-solid fa-ranking-star text-muted me-2 mb-3"></i>
                {offer.details.seniority}
              </div>
              <i className="fa-solid fa-money-check-dollar text-muted me-2"></i>
              {offer.details.salary.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8 mb-5">
          <div className="card h-100 card-offert-deatils  bg-dark">
            <div className="hover_color_bubble"></div>
            <div className="card-body">
              <h3 className="text-center mb-2">Details</h3>
              <p className="card-text my-3">
                <span className="me-2">Modality: </span>
                {offer.details.modality}
              </p>
              <p className="card-text">
                <span>Description: </span> <br />
                {offer.details.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center mb-5">
        <div className="col-12 col-lg-3">
          <button className="button" onClick={handleButtonClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>{" "}
            {user.role === "USER"
              ? "Apply"
              : offer.status
              ? "Inactive offer"
              : "Active offert"}
          </button>
        </div>
      </div>
    </>
  );
};
