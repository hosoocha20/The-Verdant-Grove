import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  ScrollRestoration,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
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

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const Layout = () => {

  const [cookies, setCookie, removeCookie] = useCookies();
  const email = cookies.Email || "";
  const authToken = cookies.AuthToken || "";


  const [searchResult, setSearchResult] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  //const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword')?.trim() || '')


  const [loginErrorMsg, setLoginErrorMsg] = useState({ msg: "" });

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
    const response = await fetch(`${import.meta.env.VITE_SERVERURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email.toLowerCase(), pw: user.pw }),
    });
    const data = await response.json();
    if (data.detail) {
      setLoginErrorMsg({ ...loginErrorMsg, msg: data.detail });
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      setOpenLoginDrawer(false);
      window.location.replace('/');
    }
  };

  const logOut = () => {

    removeCookie("Email");
    removeCookie("AuthToken");
    window.location.reload();
  };

  //Cart Requests
  const getUserCart = async () => {
    let response;
    try {
      response = await axios.get(
        `${import.meta.env.VITE_SERVERURL}/cart/${email}`
      );
      const data = await response.data;
      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserCart = async (product: IShoppingCartItem) => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/cart/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product }),
        }
      );
      const data = await response.json();
      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeUserCartItem = async (product: IShoppingCartItem) => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/cart/removeProduct/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product }),
        }
      );
      const data = await response.json();
      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const removeUserSelectedCartItem = async () => {
    let response;
    try {
      response = await fetch(
        `${
          import.meta.env.VITE_SERVERURL
        }/cart/removeSelectedProducts/${email}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const removeShoppingCartItem = (item: IShoppingCartItem) => {
    if (!authToken)
      setShoppingCart((prev) => prev.filter((i) => i.name !== item.name));
    else {
      removeUserCartItem(item);
    }
  };
  const removeSelectedShoppingCartItem = () => {
    if (!authToken)
      setShoppingCart((prev) => prev.filter((i) => i.checked !== true));
    else removeUserSelectedCartItem();
  };

  const addToShoppingCart = (item: IShoppingCartItem) => {
    const isItemInBag = shoppingCart.find((i) => i.name === item.name);
    if (!authToken) {
      if (isItemInBag) {
        setShoppingCart((prev: IShoppingCartItem[]) =>
          prev.map((i) =>
            i.name === item.name
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        );
      } else {
        setShoppingCart((prev: IShoppingCartItem[]) => [...prev, item]);
      }
    } else {
      if (isItemInBag){
        updateCartItemQuantityByExisting(isItemInBag, item.quantity);
      }else{
        updateUserCart(item);
      }
      
    }
    setOpenShoppingBagDrawer(true);
  };
  const updateCartItemsCheckAll = async () => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/cart/updateCheckAll/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: !checkedAll }),
        }
      );
      const data = await response.json();
      console.log(data);
      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckedAllOnChange = () => {
    if (!authToken) {
      setShoppingCart((prev) =>
        prev.map((i) => ({ ...i, checked: !checkedAll }))
      );
    } else {
      updateCartItemsCheckAll();
    }
    setCheckedAll(!checkedAll);
  };
  const updateCartItemsCheckSelect = async (product: IShoppingCartItem) => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/cart/updateCheckSelect/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product }),
        }
      );
      const data = await response.json();

      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckedItemOnChange = (product: IShoppingCartItem) => {
    if (!authToken) {
      const checkedArray = shoppingCart.map((i) =>
        i.name === product.name ? { ...i, checked: !i.checked } : i
      );
      setShoppingCart(checkedArray);
    } else {
      updateCartItemsCheckSelect(product);
    }
  };
  const updateCartItemQuantityByOne = async (
    product: IShoppingCartItem,
    val: number
  ) => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/cart/updateQuantityOne/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product, val }),
        }
      );
      const data = await response.json();
      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleQuantityCounterOnChange = (
    product: IShoppingCartItem,
    val: number
  ) => {
    if (!authToken) {
      //decrement (val = -1), increment (val = 1)
      setShoppingCart((prev) =>
        prev.map((i) =>
          i.name === product.name ? { ...i, quantity: i.quantity + val } : i
        )
      );
    } else {
      updateCartItemQuantityByOne(product, val);
    }
  };
  const updateCartItemQuantityByExisting = async (
    product: IShoppingCartItem,
    val: number
  ) => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/cart/updateQuantityByExisting/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product, val }),
        }
      );
      const data = await response.json();
      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const updateCartItemQuantityByVal = async (
    product: IShoppingCartItem,
    val: number
  ) => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/cart/updateQuantityByVal/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product, val }),
        }
      );
      const data = await response.json();
      setShoppingCart(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleQuantityValOnChange = (
    product: IShoppingCartItem,
    val: number
  ) => {
    setShoppingCart((prev) =>
      prev.map((i) => (i.name === product.name ? { ...i, quantity: val } : i))
    );
    if (authToken)
        updateCartItemQuantityByVal(product, val)
  };

 

  //adding cart products to local storage for users who are not signed in - so their cart is maintained
  useEffect(() => {
    //if user isnt signed on then we add to local storage, else, we will add to user database
    if (!authToken) localStorage.setItem("cart", JSON.stringify(shoppingCart));
    if (shoppingCart.some((i) => !i.checked)) setCheckedAll(false);
    if (shoppingCart.every((i) => i.checked)) setCheckedAll(true);
  }, [shoppingCart]);

  useEffect(() => {
    if (authToken) getUserCart();
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
          searchResult,
          searchParams,
          setSearchParams,
          addToShoppingCart,
          logIn,
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
                    element: <OrderView />
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
            ]
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
