import React from "react";

const Signup = () => {
  return (
    <div className="signup-container">
      <div>
        <h1>Sign Up</h1>
        <form className="signup-form">
          <label>
            First Name
            <input type="text" name="firstName_signUp" required/>
          </label>
          <label>
            Last Name
            <input type="text" name="lastName_signUp" required/>
          </label>
          <label>
            Email
            <input type="email" name="email_signUp" required/>
          </label>
          <label>
            Password
            <input type="password" name="pw_signUp" required/>
          </label>
          <button>SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
