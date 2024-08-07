import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  ScrollRestoration,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import "./index.css";
import "./styles/App.scss";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import Shop from "./pages/Shop.tsx";
import Product from "./pages/Product.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Signup from "./pages/Signup.tsx";
import Seasonal from "./pages/Seasonal.tsx";
import SearchResults from "./pages/SearchResults.tsx";
import Account from "./pages/Account.tsx";
import UserProfile from "./components/UserProfile.tsx";
import Orders from "./components/Orders.tsx";
import { ILoginUser } from "./interfaces/IUser.ts";

import { IShoppingCartItem } from "./interfaces/IShop.ts";
import Login from "./pages/Login.tsx";
import Checkout from "./pages/Checkout.tsx";
import Payment from "./pages/Payment.tsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import OrderView from "./components/OrderView.tsx";
import RestrictedRoutes from "./routes/RestrictedRoutes.tsx";
import { axiosJWT } from "./middlewares/refreshInterceptor.ts";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const Layout = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  let email = cookies.Email || "";
  let authToken = cookies.AuthToken || "";
  let refreshToken = cookies.RefreshToken || "";
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  //const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword')?.trim() || '')

  const [loginErrorMsg, setLoginErrorMsg] = useState({ msg: "" });
  const [loggingIn, setLoggingIn] = useState(false);

  const [shoppingCart, setShoppingCart] =
    useState<IShoppingCartItem[]>(cartFromLocalStorage);
  //ShoppingDrawer Hooks
  const [checkedAll, setCheckedAll] = useState(true);
  const [openShoppingBagDrawer, setOpenShoppingBagDrawer] = useState(false);
  //LoginDrawer Hooks
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);

  //Auth Requests
  const logIn = async (e: React.FormEvent, user: ILoginUser) => {
    e.preventDefault();
    setLoggingIn(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVERURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email.toLowerCase(), pw: user.pw }),
      });
      const data = await response.json();
      if (data.detail) {
        setLoginErrorMsg({ ...loginErrorMsg, msg: data.detail });
      } else {
        setCookie("Email", data.email, {
          path: "/",
        });
        setCookie("AuthToken", data.token, {
          path: "/",
        });
        setCookie("RefreshToken", data.refreshToken, {
          path: "/",
        });
        setOpenLoginDrawer(false);
        if (shoppingCart.length > 0) {
          addPrevCartToUserCart(shoppingCart, data.email);
        } else window.location.reload();
        //navigate('/', {replace: true});
        //window.location.replace("/");
      }
    } catch (err) {
      console.log(err)
      window.alert("Something went wrong. Please try again");
    } finally {
      setLoggingIn(false);
    }
  };

  // const postRefreshToken = async() =>{
  //   let response;

  //   try{
  //     response = await axios(`${import.meta.env.VITE_SERVERURL}/refreshToken/${email}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       data: JSON.stringify({ refreshToken: refreshToken}),
  //     });
  //     const data = await response.data;
  //     setCookie("AuthToken", data.token);
  //     console.log("Refreshed Token")
  //     return data;
  //   }catch(err){
  //     console.log(err)
  //   }

  // }

  // axiosJWT.interceptors.request.use(
  //   async (config) =>{

  //     let currentDate = new Date();
  //     const decodedToken = jwtDecode(authToken) ;
  //     console.log("token exp "+ (decodedToken.exp))
  //     console.log("time exp "+currentDate.getTime())
  //     console.log("authToken "+ authToken)
  //     if (decodedToken.exp && (new Date().getTime()/1000) >= (decodedToken.exp)){
  //       console.log(new Date(decodedToken.exp * 1000).toLocaleString())
  //       const data = await postRefreshToken();
  //       config.headers["authorization"] = "Bearer " + data.token;
  //     }
  //     return config;
  //   }, (err) => {
  //     return Promise.reject(err)
  //   }
  // )

  const logOut = async () => {
    const options: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      data: { refreshToken: refreshToken },
    };
    try {
      await axios.delete(`${import.meta.env.VITE_SERVERURL}/logout`, options);
      setShoppingCart([]);
      removeCookie("Email", {
        path: "/",
      });
      removeCookie("RefreshToken", {
        path: "/",
      });
      removeCookie("AuthToken", {
        path: "/",
      });
      email = "";
      authToken = "";
      refreshToken = "";
    } catch (err) {
      console.log(err);
    } finally {
      window.location.replace("/");
    }
  };

  //Cart Requests
  const getUserCart = async () => {
    let response;
    try {
      response = await axiosJWT.get(
        `${import.meta.env.VITE_SERVERURL}/cart/${email}`,
        {
          headers: { authorization: "Bearer " + authToken },
        }
      );
      const data = await response.data;
      setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };

  const updateUserCart = async (product: IShoppingCartItem) => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/cart/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + cookies.AuthToken,
          },
          data: JSON.stringify({ product }),
        }
      );
      //const data = await response.data;
      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };

  const removeUserCartItem = async (product: IShoppingCartItem) => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/cart/removeProduct/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
          data: JSON.stringify({ product }),
        }
      );
      //const data = await response.data;
      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };
  const removeUserSelectedCartItem = async () => {
    let response;
    try {
      response = await axiosJWT(
        `${
          import.meta.env.VITE_SERVERURL
        }/cart/removeSelectedProducts/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
        }
      );
      //const data = await response.data;

      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };
  const removeShoppingCartItem = (item: IShoppingCartItem) => {
    setShoppingCart((prev) => prev.filter((i) => i.name !== item.name));
    if (cookies.AuthToken) removeUserCartItem(item);
  };
  const removeSelectedShoppingCartItem = () => {
    setShoppingCart((prev) => prev.filter((i) => i.checked !== true));
    if (cookies.AuthToken) removeUserSelectedCartItem();
  };

  const addPrevCartToUserCart = async (
    items: IShoppingCartItem[],
    email: string
  ) => {
    try {
      await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/cart/existingCart/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ items }),
        }
      );
      //const data = await response.data;
      //setShoppingCart(data);
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (err: any) {
      console.log(err);
    } finally {
      window.location.reload();
      setLoggingIn(false);
    }
  };
  const addToShoppingCart = (item: IShoppingCartItem) => {
    const isItemInBag = shoppingCart.find((i) => i.name === item.name);

    if (isItemInBag) {
      setShoppingCart((prev: IShoppingCartItem[]) =>
        prev.map((i) =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      );
      if (cookies.AuthToken)
        updateCartItemQuantityByExisting(isItemInBag, item.quantity);
    } else {
      setShoppingCart((prev: IShoppingCartItem[]) => [...prev, item]);
      if (cookies.AuthToken) updateUserCart(item);
    }
    setOpenShoppingBagDrawer(true);
  };
  const updateCartItemsCheckAll = async () => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/cart/updateCheckAll/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
          data: JSON.stringify({ state: !checkedAll }),
        }
      );
      //const data = await response.data;
      //console.log(data);
      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };
  const handleCheckedAllOnChange = () => {
    setShoppingCart((prev) =>
      prev.map((i) => ({ ...i, checked: !checkedAll }))
    );
    if (authToken) updateCartItemsCheckAll();

    setCheckedAll(!checkedAll);
  };
  const updateCartItemsCheckSelect = async (product: IShoppingCartItem) => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/cart/updateCheckSelect/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
          data: JSON.stringify({ product }),
        }
      );
      //const data = await response.data;

      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };
  const handleCheckedItemOnChange = (product: IShoppingCartItem) => {
    const checkedArray = shoppingCart.map((i) =>
      i.name === product.name ? { ...i, checked: !i.checked } : i
    );
    setShoppingCart(checkedArray);
    if (authToken) updateCartItemsCheckSelect(product);
  };
  const updateCartItemQuantityByOne = async (
    product: IShoppingCartItem,
    val: number
  ) => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/cart/updateQuantityOne/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
          data: JSON.stringify({ product, val }),
        }
      );
      //const data = await response.data;
      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };
  const handleQuantityCounterOnChange = (
    product: IShoppingCartItem,
    val: number
  ) => {
    //decrement (val = -1), increment (val = 1)
    setShoppingCart((prev) =>
      prev.map((i) =>
        i.name === product.name ? { ...i, quantity: i.quantity + val } : i
      )
    );
    if (authToken) updateCartItemQuantityByOne(product, val);
  };
  const updateCartItemQuantityByExisting = async (
    product: IShoppingCartItem,
    val: number
  ) => {
    let response;
    try {
      response = await axiosJWT(
        `${
          import.meta.env.VITE_SERVERURL
        }/cart/updateQuantityByExisting/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
          data: JSON.stringify({ product, val }),
        }
      );
      //const data = await response.data;
      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };
  const updateCartItemQuantityByVal = async (
    product: IShoppingCartItem,
    val: number
  ) => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/cart/updateQuantityByVal/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
          data: JSON.stringify({ product, val }),
        }
      );
      //const data = await response.data;
      //setShoppingCart(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        removeCookieInvalidToken();
      }
    }
  };
  const handleQuantityValOnChange = (
    product: IShoppingCartItem,
    val: number
  ) => {
    setShoppingCart((prev) =>
      prev.map((i) => (i.name === product.name ? { ...i, quantity: val } : i))
    );
    if (authToken) updateCartItemQuantityByVal(product, val);
  };

  //invalid token
  const removeCookieInvalidToken = async () => {
    const options: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      data: { refreshToken: refreshToken },
    };
    try {
      await axios.delete(`${import.meta.env.VITE_SERVERURL}/logout`, options);
      setShoppingCart([]);
      removeCookie("Email", {
        path: "/",
      });
      removeCookie("RefreshToken", {
        path: "/",
      });
      removeCookie("AuthToken", {
        path: "/",
      });
      window.alert("Session ended, please log in again");
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  //on Back button, close drawer
  window.addEventListener("popstate", () => {
    if (openLoginDrawer) setOpenLoginDrawer(false);
    if (openShoppingBagDrawer) setOpenShoppingBagDrawer(false);
  });

  //adding cart products to local storage for users who are not signed in - so their cart is maintained
  useEffect(() => {
    //if user isnt signed on then we add to local storage, else, we will add to user database
    if (!authToken) localStorage.setItem("cart", JSON.stringify(shoppingCart));
    if (shoppingCart.some((i) => !i.checked)) setCheckedAll(false);
    if (shoppingCart.every((i) => i.checked)) setCheckedAll(true);
  }, [shoppingCart]);

  useEffect(() => {
    if (cookies.AuthToken) getUserCart();
  }, []);

  return (
    <div className="App">
      <Navbar
        openShoppingBagDrawer={openShoppingBagDrawer}
        setOpenShoppingBagDrawer={setOpenShoppingBagDrawer}
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        checkedAll={checkedAll}
        handleCheckedAllOnChange={handleCheckedAllOnChange}
        handleCheckedItemOnChange={handleCheckedItemOnChange}
        handleQuantityCounterOnChange={handleQuantityCounterOnChange}
        handleQuantityValOnChange={handleQuantityValOnChange}
        authToken={authToken}
        logIn={logIn}
        loggingIn={loggingIn}
        loginErrorMsg={loginErrorMsg}
        setLoginErrorMsg={setLoginErrorMsg}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        removeShoppingCartItem={removeShoppingCartItem}
        removeSelectedShoppingCartItem={removeSelectedShoppingCartItem}
        openLoginDrawer={openLoginDrawer}
        setOpenLoginDrawer={setOpenLoginDrawer}
      />
      <Outlet
        context={{
          authToken,
          email,
          removeCookieInvalidToken,
          getUserCart,
          searchResult,
          searchParams,
          setSearchParams,
          addToShoppingCart,
          logIn,
          loggingIn,
          logOut,
          loginErrorMsg,
          setLoginErrorMsg,
          shoppingCart,
          setShoppingCart,
        }}
      />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/shop/:shopOption",
            /*loader: productLoader,*/
            element: <Shop />,
            // children: [
            //   {
            //     index: true,
            //     element: <ShopAll />,
            //   },
            //   {
            //     path: '/shop/:list',
            //     element: <ShopAll />
            //   }
            // ]
          },
          {
            path: "/seasonal",
            element: <Seasonal />,
          },
          {
            path: "/shop/product/detail/:productName",
            element: <Product />,
          },
          {
            path: "/product/search",
            element: <SearchResults />,
          },
          {
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/account",
                element: <Account />,
                children: [
                  {
                    index: true,
                    element: <Orders />,
                  },
                  {
                    path: "/account/orders/:orderID",
                    element: <OrderView />,
                  },
                  {
                    path: "/account/profile",
                    element: <UserProfile />,
                  },
                ],
              },
              {
                path: "/checkout",
                element: <Checkout />,
              },
              {
                path: "/payment",
                element: <Payment />,
              },
            ],
          },
          {
            element: <RestrictedRoutes />,
            children: [
              {
                path: "/register",
                element: <Signup />,
              },
              {
                path: "/login",
                element: <Login />,
              },
            ],
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
          {
            path: "errorPage",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>
);
