import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {Outlet, RouterProvider, createBrowserRouter, ScrollRestoration, useNavigate, useSearchParams} from 'react-router-dom'
import axios from "axios";
import  { useCookies } from 'react-cookie';
import './index.css'
import './styles/App.scss';
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import About from './pages/About.tsx'
import Home from './pages/Home.tsx'
import Shop from './pages/Shop.tsx'
import Product from './pages/Product.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Signup from './pages/Signup.tsx'
import Seasonal from './pages/Seasonal.tsx'
import SearchResults from './pages/SearchResults.tsx'
import Account from './pages/Account.tsx'
import UserProfile from './components/UserProfile.tsx'
import Orders from './components/Orders.tsx'
import { ILoginUser, IUser } from './interfaces/IUser.ts'

import { IShoppingCartItem } from './interfaces/IShop.ts'
import Login from './pages/Login.tsx'
import Checkout from './pages/Checkout.tsx'
import Payment from './pages/Payment.tsx'
import { IOrderDetail } from './interfaces/IOrder.ts'
import ProtectedRoutes from './routes/ProtectedRoutes.tsx';


const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || '[]');

const Layout = () => {
  const navigate = useNavigate();
  const emptyOrderDetail = (): IOrderDetail => ({
    orderNo: "",
    firstName: "",
    lastName: "",
    email: "",
    delivery: {address1: "", address2: "", city: "", zip:"", mobile: ""},
    products: [],
    subtotal: 0,
    total: 0,
    shipping: 10,
    payment: "unpaid",
    mobile: "",
    date: new Date(),
});
  const [cookies, setCookie, removeCookie] = useCookies();
  const userEmail = cookies.Email || '';
  const authToken = cookies.AuthToken || '';
  const [isSignedOn, setIsSignedOn] = useState(false);
  const [authedUser, setAuthedUser] = useState<IUser>({firstName: '', lastName: '', email: '', pw: '', cart: [], orders: [], address: {city: "", address1: "", address2: "", zip: ""} });
  const [authedEmail, setAuthedEmail] = useState('');

  const [searchResult, setSearchResult] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  //const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword')?.trim() || '')
  
  
  const [users, setUsers] = useState<IUser[]>([]);
  const [loginErrorMsg, setLoginErrorMsg] = useState({msg: ''})
  const [shoppingCart, setShoppingCart] = useState<IShoppingCartItem[]>(cartFromLocalStorage);
  //const [shoppingCart, setShoppingCart] = useLocalStorage<IShoppingCartItem[]>("cart", []);
  const [openShoppingBagDrawer, setOpenShoppingBagDrawer] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);



  const logIn = async (e: React.FormEvent, user: ILoginUser) =>{
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_SERVERURL}/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: user.email, pw: user.pw})
    })
    const data = await response.json();
    if (data.detail){
      setLoginErrorMsg({...loginErrorMsg, msg: data.detail})
    }else{
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      setOpenLoginDrawer(false);
      window.location.reload();
    }
  }

  const logOut = () => {
    setAuthedUser({firstName: '', lastName: '', email: '', pw: '', cart: [], orders: [], address: {city: "", address1: "", address2: "", zip: ""}});
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload();
  }
  // const updateShoppingCartQuantity = () =>{

  // }

  const addToShoppingCart = (item: IShoppingCartItem) =>{
    const isItemInBag = shoppingCart.find((i) => i.name === item.name)
    if (isItemInBag){
      setShoppingCart((prev: IShoppingCartItem[]) => prev.map((i) => (i.name === item.name ? {...i, quantity: (i.quantity + item.quantity)} : i)))
    }else{
      setShoppingCart((prev : IShoppingCartItem[]) => [...prev, item])
    }
    // if (isSignedOn){
    //   const findUser = users.find((u) => u.email === item.email)
    //   const isItemInBag = findUser?.cart.find((i) => i.name === item.name)
    //   if (isItemInBag)
    //     setUsers((prev) => prev.map((u) => (u.email === item.email ? {...u, cart: (u.cart.map((i) => (i.name === item.name ? {...i, quantity : (i.quantity + item.quantity)} : i)))} : u)))
    //   else
    //     setUsers((prev) => prev.map((u) => (u.email === item.email ? {...u, cart: [...u.cart, item]} : u)))
    // }else{

    // }
    setOpenShoppingBagDrawer(true);
  }

  const removeShoppingCartItem = (item: IShoppingCartItem) => {
    setShoppingCart((prev) => prev.filter((i) => i.name !== item.name));
  };
  const removeSelectedShoppingCartItem = () => {
    setShoppingCart((prev) => prev.filter((i) => i.checked !== true));
  }

  /*Checkout*/
  const proceedToPay = (order: IOrderDetail) => {
    setUsers((prev) => prev.map((u) => (u.email === order.email ? {...u, orders: [...u.orders, order]} : u)))
  }



  
    //adding cart products to local storage for users who are not signed in - so their cart is maintained
  useEffect(() =>{
    //if user isnt signed on then we add to local storage, else, we will add to user database
    if (!authToken)
      localStorage.setItem("cart", JSON.stringify(shoppingCart))
  },[shoppingCart])


  return(
    <div className='App'>
      <Navbar openShoppingBagDrawer={openShoppingBagDrawer} setOpenShoppingBagDrawer={setOpenShoppingBagDrawer} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} authToken={authToken} logIn={logIn} loginErrorMsg={loginErrorMsg} setLoginErrorMsg={setLoginErrorMsg} searchResult={searchResult} setSearchResult={setSearchResult}  removeShoppingCartItem={removeShoppingCartItem } removeSelectedShoppingCartItem={removeSelectedShoppingCartItem} openLoginDrawer={openLoginDrawer} setOpenLoginDrawer={setOpenLoginDrawer}/>
      <Outlet context={{authToken, users,setIsSignedOn, authedEmail, authedUser, setAuthedUser, searchResult,   searchParams, setSearchParams, addToShoppingCart, logIn, logOut,loginErrorMsg, setLoginErrorMsg, shoppingCart, setShoppingCart, proceedToPay}}/>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children : [
    {
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/shop/:shopOption',
          /*loader: productLoader,*/
          element: <Shop  />,
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
          path: '/seasonal',
          element: <Seasonal />
        },
        {
          path: '/shop/product/detail/:productName',
          element: <Product />
        },
        {
        path: '/product/search',
        element: <SearchResults />
        },
        {
          path: '/register',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          element: <ProtectedRoutes />,
          children : [
            {
              path: '/account',
              element: <Account />,
              children : [
                {
                  index: true,
                  element: <Orders />
                },
                {
                  path:'/account/profile',
                  element: <UserProfile />
                }
              ]
            },
            {
              path: '/checkout',
              element: <Checkout/>
            },
            {
              path: '/payment',
              element: <Payment />
            },
          ]
        },
        {
          path: '*',
          element: <ErrorPage />
        },
        {
          path: 'errorPage',
          element: <ErrorPage />
        }
      ],
    },

  ]
}])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
