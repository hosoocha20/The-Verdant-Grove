import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet} from 'react-router-dom'

const ProtectedRoutes = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const authToken = cookies.AuthToken;
    const email = cookies.Email;
    const logOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.reload();
      }

  return (
    authToken ? 
        <Outlet context={{logOut,  email}}/>
        :
        <Navigate to={'/'} />
    
)
}

export default ProtectedRoutes