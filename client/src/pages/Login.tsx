import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { ILoginUser } from "../interfaces/IUser";
import AuthLoader from "../uiComponents/AuthLoader";

const Login = () => {
  const [loginUser, setLoginUser] = useState<ILoginUser>({ email: "", pw: "" });
  const {
    logIn,
    loggingIn,
    loginErrorMsg,
    setLoginErrorMsg,
  }: {
    logIn: (e: React.FormEvent, user: ILoginUser) => void;
    loggingIn: boolean;
    loginErrorMsg: { msg: string };
    setLoginErrorMsg: React.Dispatch<React.SetStateAction<{ msg: string }>>;
  } = useOutletContext();

  useEffect(() => {
    //setUser({firstName: '', lastName: '', email: '', pw: ''})
    let obj = document.getElementById("login-error");
    if (obj) {
      obj.style.animation = "none";
      window.requestAnimationFrame(function () {
        obj.style.animation = "horizontal-shaking 0.35s";
      });
    }
  }, [loginErrorMsg]);

  useEffect(() => {
    setLoginErrorMsg({ msg: "" });
  }, []);

  return (
    <div className="login-container">
      {loggingIn && <AuthLoader />}
      
      <div>
        <h1>Log in</h1>
        <form className="login-form" onSubmit={(e) => logIn(e, loginUser)}>
          <label>
            Email
            <input
              type="email"
              name="email_login"
              value={loginUser.email}
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="pw_login"
              value={loginUser.pw}
              onChange={(e) =>
                setLoginUser({ ...loginUser, pw: e.target.value })
              }
              required
            />
          </label>
          <p className="login-error-msg" id="login-error">
            {loginErrorMsg.msg || " "}
          </p>
          <button>LOG IN</button>
        </form>
        <div className="login-signup-wrapper">
          <p>Are you not a member yet?</p>
          <Link to={"/register"}>
            <button className="login-signup-button">SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
