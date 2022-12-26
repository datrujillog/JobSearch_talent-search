import React from "react";

const AlertComponent = ({ message ,title="Oops......"}) => {
  return (
    <>
      <div className="alert alert-secondary bg-dark text-light p-4" role="alert">
        <div className="w-100 d-flex">
          <h4 className="alert-heading"> <i className="fa-solid fa-triangle-exclamation me-4" style={{color:"red"}}></i>{title}</h4>
        </div>
        <p className="mt-3">{message}.</p>
      </div>
    </>
  );
};

export default AlertComponent;
