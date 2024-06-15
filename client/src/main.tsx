import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {Outlet, RouterProvider, createBrowserRouter, ScrollRestoration, useNavigate, useSearchParams} from 'react-router-dom'
import App from './App.tsx'
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
import { shopItemArrayAll } from './data/ShopData.ts'
import { IShoppingCartItem } from './interfaces/IShop.ts'
import Login from './pages/Login.tsx'
import Checkout from './pages/Checkout.tsx'



const Layout = () => {
  const navigate = useNavigate();
  const [isSignedOn, setIsSignedOn] = useState(false);
  const [authedUser, setAuthedUser] = useState<IUser>({firstName: '', lastName: '', email: '', pw: ''});
  const [authedEmail, setAuthedEmail] = useState('');

  const [searchResult, setSearchResult] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  //const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword')?.trim() || '')
  
  
  const [users, setUsers] = useState<IUser[]>([]);
  const [authErrorMsg, setAuthErrorMsg] = useState({msg: ''})
  const [shoppingCart, setShoppingCart] = useState<IShoppingCartItem[]>([]);
  const [openShoppingBagDrawer, setOpenShoppingBagDrawer] = useState(false);



  const signUp = (e: React.FormEvent, signupUser: IUser) =>{
    e.preventDefault();
    if (users.some(u=> u.email === signupUser.email)){
      setAuthErrorMsg({...authErrorMsg, msg: "An account with this email already exists."})
      return
    }
    setUsers((prev) => [...prev, signupUser])
    setAuthedUser(signupUser)
    setIsSignedOn(true);
    setAuthErrorMsg({msg: ''});
    //setAuthedUser((user) => ({ ...user, firstName: e.target.value }))
    navigate("/")
  }

  const logIn = (e: React.FormEvent, user: ILoginUser) =>{
    e.preventDefault();
    if (users.some(u=> (u.email === user.email && u.pw === user.pw))){
      setIsSignedOn(true);
      setAuthedEmail(user.email)
      const findUser = users.find(u => (u.email === user.email));
      if (findUser)
        setAuthedUser(findUser);
      navigate("/")
    }else{
      setAuthErrorMsg({...authErrorMsg, msg: "Your email or password is incorrect. Please try again."})
    }
  }

  const logOut = () => {
    setAuthedUser({firstName: '', lastName: '', email: '', pw: ''});
    setIsSignedOn(false)
  }
  // const updateShoppingCartQuantity = () =>{

  // }

  const addToShoppingCart = (item: IShoppingCartItem) =>{
    const isItemInBag = shoppingCart.find((i) => i.name === item.name)
    if (isItemInBag){
      setShoppingCart((prev) => prev.map((i) => (i.name === item.name ? {...i, quantity: (i.quantity + item.quantity)} : i)))
    }else{
      setShoppingCart((prev) => [...prev, item])
    }
    setOpenShoppingBagDrawer(true);
  }

  const removeShoppingCartItem = (item: IShoppingCartItem) => {
    setShoppingCart((prev) => prev.filter((i) => i.name !== item.name));
  };
  const removeSelectedShoppingCartItem = () => {
    setShoppingCart((prev) => prev.filter((i) => i.checked !== true));
  }

  /*Account*/ 
  const updateUserProfile = (e: React.MouseEvent<HTMLButtonElement>, update: IUser) =>{
    e.preventDefault();
    setUsers((prev) => prev.map((u) => (u.email === update.email ? {...u, firstName: update.firstName, lastName: update.lastName} : u)));
    setAuthedUser(update);
  }


  return(
    <div className='App'>
      <Navbar openShoppingBagDrawer={openShoppingBagDrawer} setOpenShoppingBagDrawer={setOpenShoppingBagDrawer} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} isSignedOn={isSignedOn} logIn={logIn} searchResult={searchResult} setSearchResult={setSearchResult}  removeShoppingCartItem={removeShoppingCartItem } removeSelectedShoppingCartItem={removeSelectedShoppingCartItem}/>
      <Outlet context={{ setIsSignedOn, authedEmail, authedUser, setAuthedUser, signUp, searchResult,   searchParams, setSearchParams, addToShoppingCart, logIn, logOut, authErrorMsg, setAuthErrorMsg, updateUserProfile, shoppingCart}}/>
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
