import React, { useState } from "react";
import { Outlet, Link, NavLink, useOutletContext } from "react-router-dom";

const Account = () => {
  const {setIsSignedOn} : {setIsSignedOn: React.Dispatch<React.SetStateAction<boolean>>} = useOutletContext();
  return (
    <div className="account-container">
      <h1>My Account</h1>
      <hr></hr>
      <div className="account-flex-wrap">
        <div className="account-flex-wrap-l">
          <NavLink to={"."} className={({ isActive }) => (isActive ? 'account-navLink-active' : 'account-navLink-inactive')} end>Orders</NavLink>
          <NavLink to={"profile"} className={({ isActive }) => (isActive ? 'account-navLink-active' : 'account-navLink-inactive')} end>My Profile</NavLink>
          <Link to={"../"} className="account-link" onClick={()=>setIsSignedOn(false)}>Logout</Link>
        </div>
        <div className="account-flex-wrap-r">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
