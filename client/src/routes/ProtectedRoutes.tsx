import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

const ProtectedRoutes = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const authToken = cookies.AuthToken;
  const email = cookies.Email;
  const {
    removeCookieInvalidToken,
    logOut,
  }: {
    removeCookieInvalidToken: () => Promise<void>;
    logOut: () => Promise<void>;
  } = useOutletContext();

  return authToken ? (
    <Outlet context={{ logOut, email, authToken, removeCookieInvalidToken }} />
  ) : (
    <Navigate to={"/"} />
  );
};

export default ProtectedRoutes;
