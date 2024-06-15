import React, { useState } from "react";
import { Outlet, Link, NavLink, useOutletContext } from "react-router-dom";
import { IUser } from "../interfaces/IUser";

const Account = () => {
  const {users, logOut, authedUser, updateUserProfile,authedEmail} : {users:IUser[],logOut: ()=> void, authedUser: IUser, updateUserProfile : (e: React.MouseEvent<HTMLButtonElement>, update: IUser)=>void, authedEmail: string} = useOutletContext();
  return (
    <div className="account-container">
      <h1>My Account</h1>
      <hr></hr>
      <div className="account-flex-wrap">
        <div className="account-flex-wrap-l">
          <NavLink to={"."} className={({ isActive }) => (isActive ? 'account-navLink-active' : 'account-navLink-inactive')} end>Orders</NavLink>
          <NavLink to={"profile"} className={({ isActive }) => (isActive ? 'account-navLink-active' : 'account-navLink-inactive')} end>My Profile</NavLink>
          <Link to={"../"} className="account-link" onClick={logOut}>Logout</Link>
        </div>
        <div className="account-flex-wrap-r">
          <Outlet context={{users ,authedUser, updateUserProfile, authedEmail}}/>
        </div>
      </div>
    </div>
  );
};

export default Account;
