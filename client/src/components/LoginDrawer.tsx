import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";

interface LoginDrawerProps{
    clickedOutsideUserRef: React.RefObject<HTMLDivElement>;
    openLoginDrawer: boolean;
    setOpenLoginDrawer: React.Dispatch<React.SetStateAction<boolean>>;

}
const LoginDrawer = (props: LoginDrawerProps) => {
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
    <form className="login-drawer-form">
      <div className="login-drawer-email-wrapper">
        <input type="email" id="email-login" placeholder="EMAIL" />
        <p>EMAIL</p>
      </div>
      <div className="login-drawer-pw-wrapper">
        <input type="password" id="pw-login" placeholder="PASSWORD" />
        <p>PASSWORD</p>
      </div>
      <button className="login-drawer-login-button">LOG IN</button>
      <div className="login-drawer-signup-wrapper">
        <p>Are you not a member yet?</p>
        <button className="login-drawer-signup-button">SIGN UP</button>
      </div>
    </form>
  </div>
  )
}

export default LoginDrawer