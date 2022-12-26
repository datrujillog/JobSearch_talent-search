import React, { useContext, useEffect, useState } from "react";
import AlertComponent from "../../components/ui/AlertComponent";
import axios from "axios";
import { AuthContext } from "../../context/auth/authContext";
import { createErrorMessage } from "../../helpers/responseErrorMessage";
import { errormesage, successMessage } from "../../helpers/alertMessages";
import moment from "moment";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

export const ApplicationScreen = () => {
  const { user } = useContext(AuthContext);
  const options = { headers: { Authorization: `Bearer ${user.token}` } };
  const [loading, setloading] = useState(true);
  const [applications, setApplications] = useState([]);

  const getApplication = async () => {
    debugger
    try {
      const { data: response } = await axios.get(`/application`, options);
      setApplications(response.data);
      setloading(false);
    } catch (error) {
      console.error(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
      setloading(false);
    }
  };
  const handleClick = async (id) => {
    setloading(true);
    try {
      const { data: response } = await axios.delete(
        `/application/${id}`,
        options
      );
      setloading(false);
      successMessage(response.message);
      getApplication();
    } catch (error) {
      console.error(error);
      const responseError = createErrorMessage(error);
      errormesage(responseError);
      setloading(false);
    }
  };
  useEffect(() => {
    debugger
    setloading(true);
    getApplication();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      {applications.length === 0 && !loading ? (
        <div className="my-application mt-5">
          <AlertComponent
            message={
              user.role === "USER"
                ? "At this time you do not have applications for offers, please go to offers and apply for the one that suits your profile and city."
                : "No users have applied to your offers yet"
            }
          />
        </div>
      ) : (
        <h1 className="text-center mt-5">
          {user.role === "EMPLOYER" ? "Applications" : "My applications"}
        </h1>
      )}
      <section className="mt-3 row applications">
        {applications.map((application) => (
          <div
            key={application._id}
            className="card text-center bg-dark mb-3 p-3 "
          >
            <div className="card-header">
              {" "}
              {user.role === "EMPLOYER" ? (
                <p className="card-text my-3">
                  <span>Applicant: </span>
                  {application.user.name}
                </p>
              ) : (
                <p className="card-text my-3">
                  <span>Employer: </span>
                  {application.employer.name}
                </p>
              )}
            </div>
            <div className="card-body">
              <h5 className="card-title">{application.offer.name}</h5>
              <p className="card-text text-muted application-description">
                {application.offer.details.description}
              </p>
              <div className="d-flex w-100 flex-wrap justify-content-center">
                <div className="me-2 bg-darkcategory-item mb-2">
                  <i className="fa-solid fa-tags me-2 text-muted"></i>
                  {application.offer.category.category}
                </div>
                <div className="card-offert__location me-2 mb-2">
                  <i className="fa-solid fa-location-dot text-muted me-1"></i>
                  {`${application.offer.country.country}`}
                </div>
                <div className="me-2 mb-2">
                  <i className="fa-solid fa-ranking-star text-muted me-2"></i>
                  {application.offer.details.seniority}
                </div>
                <div className="me-2 mb-2">
                  <i className="fa-solid fa-money-check-dollar text-muted me-2"></i>
                  {application.offer.details.salary.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </div>

              {user.role === "USER" && (
                <button
                  className="btn btn-outline-danger p-2 pe-3"
                  onClick={() => {
                    handleClick(application._id);
                  }}
                >
                  <i className="fa-solid fa-trash-can m-2"></i> Unapply
                </button>
              )}
            </div>
            <div className="card-footer text-muted">
              {moment(applications.createdAt).fromNow()}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
