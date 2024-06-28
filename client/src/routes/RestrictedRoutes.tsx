import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { IShoppingCartItem } from "../interfaces/IShop";
import { ILoginUser } from "../interfaces/IUser";

const RestrictedRoutes = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const authToken = cookies.AuthToken;

  const {
    setShoppingCart,
    logIn,
    loginErrorMsg,
    setLoginErrorMsg,
  }: {
    setShoppingCart: React.Dispatch<React.SetStateAction<IShoppingCartItem[]>>;
    logIn: (e: React.FormEvent, user: ILoginUser) => void;
    loginErrorMsg: { msg: string };
    setLoginErrorMsg: React.Dispatch<React.SetStateAction<{ msg: string }>>;
  } = useOutletContext();
  return authToken ? (
    <Navigate to={"/"} />
  ) : (
    <Outlet
      context={{ setShoppingCart, logIn, loginErrorMsg, setLoginErrorMsg }}
    />
  );
};

export default RestrictedRoutes;
