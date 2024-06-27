import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, Outlet, useOutletContext} from 'react-router-dom'

const ProtectedRoutes = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const authToken = cookies.AuthToken;
    const email = cookies.Email;
    const {removeCookieInvalidToken} : {removeCookieInvalidToken: ()=> Promise<void>} = useOutletContext();
    const logOut = () => {
        removeCookie('Email');
        removeCookie('AuthToken');
        window.location.replace('/');
      }

  return (
    authToken ? 
        <Outlet context={{logOut,  email, authToken, removeCookieInvalidToken}}/>
        :
        <Navigate to={'/'} />
    
)
}

export default ProtectedRoutes