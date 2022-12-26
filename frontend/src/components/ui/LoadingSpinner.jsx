import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner ">
      <div className="loading-img ">
        <img src="/assets/images/spinner.gif" alt="" />
        <p>loading data please wait......</p>
      </div>
    </div>
  );
};
