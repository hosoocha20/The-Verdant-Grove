import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
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
import UserProfile from './components/userProfile.tsx'
import Orders from './components/Orders.tsx'

const Layout = () => {
  const [isSignedOn, setIsSignedOn] = useState(true);
  return(
    <div className='App'>
      <Navbar isSignedOn={isSignedOn}/>
      <Outlet />
      <Footer />
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
          path: '/shop',
          element: <Shop />
        },
        {
          path: '/seasonal',
          element: <Seasonal />
        },
        {
          path: '/product',
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
