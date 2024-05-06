import React from 'react'
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

const Layout = () => {
  return(
    <div className='App'>
      <Navbar />
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
<<<<<<< HEAD
          path: '/shop/product',
=======
          path: '/product',
>>>>>>> 0f7bc2f21d9f50f36b51402945248dd27d4473de
          element: <Product />
        },
        {
          path: '/account/register',
          element: <Signup />
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
