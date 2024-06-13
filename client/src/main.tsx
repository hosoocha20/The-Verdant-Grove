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
import { IUser } from './interfaces/IUser.ts'
import { shopItemArrayAll } from './data/ShopData.ts'
import { IShoppingCartItem } from './interfaces/IShop.ts'



const Layout = () => {
  const navigate = useNavigate();
  const [isSignedOn, setIsSignedOn] = useState(false);
  const [authedUser, setAuthedUser] = useState<IUser>({firstName: '', lastName: '', email: '', pw: ''})

  const [searchResult, setSearchResult] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  //const [searchQuery, setSearchQuery] = useState(searchParams.get('keyword')?.trim() || '')
  
  
  const [users, setUsers] = useState<IUser[]>([]);
  const [authErrorMsg, setAuthErrorMsg] = useState('')
  const [shoppingCart, setShoppingCart] = useState<IShoppingCartItem[]>([]);
  const [openShoppingBagDrawer, setOpenShoppingBagDrawer] = useState(false);



  const signUp = (e: React.FormEvent) =>{
    e.preventDefault();
    if (users.some(u=> u.email === authedUser.email)){
      setAuthErrorMsg("An account with this email already exists.")
      return
    }
    setUsers((prev) => [...prev, authedUser])
    setIsSignedOn(true);
    //setAuthedUser((user) => ({ ...user, firstName: e.target.value }))
    navigate("/")
  }

  const updateShoppingCartQuantity = () =>{

  }
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


  return(
    <div className='App'>
      <Navbar openShoppingBagDrawer={openShoppingBagDrawer} setOpenShoppingBagDrawer={setOpenShoppingBagDrawer} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} isSignedOn={isSignedOn} searchResult={searchResult} setSearchResult={setSearchResult} updateShoppingCartQuantity={updateShoppingCartQuantity} removeShoppingCartItem={removeShoppingCartItem } removeSelectedShoppingCartItem={removeSelectedShoppingCartItem}/>
      <Outlet context={{ setIsSignedOn, authedUser, setAuthedUser, signUp, searchResult,   searchParams, setSearchParams, addToShoppingCart}}/>
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
