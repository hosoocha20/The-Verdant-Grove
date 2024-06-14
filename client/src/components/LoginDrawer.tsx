import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { Link } from 'react-router-dom';
import { ILoginUser } from '../interfaces/IUser';

interface LoginDrawerProps{
    clickedOutsideUserRef: React.RefObject<HTMLDivElement>;
    openLoginDrawer: boolean;
    logIn : (e: React.FormEvent, user: ILoginUser) => void;
    setOpenLoginDrawer: React.Dispatch<React.SetStateAction<boolean>>;

}
const LoginDrawer = (props: LoginDrawerProps) => {
  const [loginUser, setLoginUser] = useState<ILoginUser>({email:"", pw: ""})
  return (
    <div
    ref={props.clickedOutsideUserRef}
    className={`nav-r-login-drawer ${
      props.openLoginDrawer ? "" : "nav-r-login-drawer-close"
    }`}
  >
    <div className="shopping-drawer-top">
      <div
        className="shopping-drawer-top-back"
        onClick={() => props.setOpenLoginDrawer(false)}
      >
        <IoIosArrowBack className="shopping-drawer-back-icon" />
        <p>BACK TO STORE</p>
      </div>
      <TfiClose
        className="shopping-drawer-close-icon"
        onClick={() => props.setOpenLoginDrawer(false)}
      />
    </div>
    <h1>Log in</h1>
    <form className="login-drawer-form" onSubmit={(e) => props.logIn(e, loginUser)}>
      <div className="login-drawer-email-wrapper">
        <input type="email" id="email-login" placeholder="EMAIL" value={loginUser.email} onChange={(e)=>setLoginUser({ ...loginUser, email: e.target.value })}/>
        <p>EMAIL</p>
      </div>
      <div className="login-drawer-pw-wrapper">
        <input type="password" id="pw-login" placeholder="PASSWORD" value={loginUser.pw} onChange={(e)=>setLoginUser({ ...loginUser, pw: e.target.value })}/>
        <p>PASSWORD</p>
      </div>
      <button className="login-drawer-login-button" onClick={() => props.setOpenLoginDrawer(false)}>LOG IN</button>
      <div className="login-drawer-signup-wrapper">
        <p>Are you not a member yet?</p>
        <Link to={'/register'} onClick={() => props.setOpenLoginDrawer(false)}>
          <button className="login-drawer-signup-button">SIGN UP</button>
        </Link>
      </div>
    </form>
  </div>
  )
}

export default LoginDrawer