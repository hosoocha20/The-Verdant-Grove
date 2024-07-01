import React from "react";

const FetchingLoader = () => {
  return (
    <div className="fetchingLoader-loading-overlay">
      <div className="fetchingLoader-loading-box">
        <div className="spinner">
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
        </div>
        <p>In the process of recieving your information.</p>
        <p>Please wait a moment.</p>
      </div>
    </div>
  );
};

export default FetchingLoader;
