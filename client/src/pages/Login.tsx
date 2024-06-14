import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { IUser, ILoginUser } from "../interfaces/IUser";

const Login = () => {
    const [loginUser, setLoginUser] =  useState<ILoginUser>({email: "", pw: ""})
  const {
    logIn
  }: {
    logIn: (e: React.FormEvent, user: ILoginUser) => void;
  } = useOutletContext();


  return (
    <div className="login-container">
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
          <button >LOG IN</button>
        </form>
        <div className="login-signup-wrapper">
          <p>Are you not a member yet?</p>
          <Link to={'/register'}>
            <button className="login-signup-button">SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
