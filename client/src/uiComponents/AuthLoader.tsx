import React from "react";

const AuthLoader = () => {
  return (
    <div className="authLoader-container">
      <div className="authLoader-box">
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
        <p>Logging in...</p>
      </div>
    </div>
  );
};

export default AuthLoader;
