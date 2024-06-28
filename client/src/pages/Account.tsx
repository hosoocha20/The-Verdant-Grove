import React from "react";
import { Outlet, Link, NavLink, useOutletContext } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";

const Account = () => {
  const {
    logOut,
    email,
    authToken,
    removeCookieInvalidToken,
  }: {
    logOut: () => Promise<void>;
    email: string;
    authToken: string;
    removeCookieInvalidToken: () => Promise<void>;
  } = useOutletContext();
  return (
    <div className="account-container">
      <h1>My Account</h1>
      <hr></hr>
      <div className="account-flex-wrap">
        <div className="account-flex-wrap-l">
          <div>
            <NavLink
              to={"."}
              className={({ isActive }) =>
                isActive ? "account-navLink-active" : "account-navLink-inactive"
              }
              end
            >
              Orders
            </NavLink>
            <SlArrowRight className="account-flex-wrap-l-icon-display" />
          </div>
          <div>
            <NavLink
              to={"profile"}
              className={({ isActive }) =>
                isActive ? "account-navLink-active" : "account-navLink-inactive"
              }
              end
            >
              My Profile
            </NavLink>
            <SlArrowRight className="account-flex-wrap-l-icon-display" />
          </div>
          <div>
            <Link to={"../"} className="account-link" onClick={logOut}>
              Logout
            </Link>
            <SlArrowRight className="account-flex-wrap-l-icon-display" />
          </div>
        </div>
        <div className="account-flex-wrap-r">
          <Outlet
            context={{ email, authToken, removeCookieInvalidToken, logOut }}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
