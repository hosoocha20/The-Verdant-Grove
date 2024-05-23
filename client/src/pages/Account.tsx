import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Account = () => {
  return (
    <div className="account-container">
      <h1>My Account</h1>
      <hr></hr>
      <div className="account-flex-wrap">
        <div className="account-flex-wrap-l">
          <Link to={"orders"}>Orders</Link>
          <Link to={"profile"}>My Profile</Link>
          <p>Logout</p>
        </div>
        <div className="account-flex-wrap-r">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
