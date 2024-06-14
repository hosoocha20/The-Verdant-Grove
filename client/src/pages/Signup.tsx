import React, {SetStateAction, useEffect, useState} from "react";
import { IUser } from "../interfaces/IUser";
import { useOutletContext } from "react-router-dom";
//setUser:  React.Dispatch<React.SetStateAction<IUser>>;
const Signup = () => {
  const [user, setUser] = useState<IUser>({firstName: '', lastName: '', email: '', pw: ''});
  //type AddUser = (e: React.FormEvent, user: IUser) => void;
  const {  signUp, authErrorMsg, setAuthErrorMsg} : {  signUp : (e : React.FormEvent, user: IUser) => void, authErrorMsg : {msg : string}, setAuthErrorMsg: React.Dispatch<React.SetStateAction<{msg: string}>>} = useOutletContext();
 // const  addUser : AddUser    = useOutletContext();
 // const  authedUser: IUser = useOutletContext();

  const signUpOnSubmit = (e: React.FormEvent, user: IUser) =>{
    e.preventDefault();
    const emailRe = /^\S+@\S+\.\S+$/;
    const isValid = emailRe.test(user.email)
    if (isValid){
      signUp(e, user);
    }else{
      setAuthErrorMsg({...authErrorMsg, msg: "Invalid email"})
    }
      

  }

  useEffect(() =>{
    //setUser({firstName: '', lastName: '', email: '', pw: ''})
    let obj = document.getElementById("signUp-error")
    if (obj) {
      obj.style.animation = 'none';
      window.requestAnimationFrame(function(){
        obj.style.animation = 'horizontal-shaking 0.35s';
      });
    }

  }, [authErrorMsg])


  return (
    <div className="signup-container">
      <div>
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={(e) => signUpOnSubmit(e, user)}>
          <label>
            First Name
            <input type="text" name="firstName_signUp" value={user.firstName} onChange={ (e) => setUser({ ...user, firstName: e.target.value })} required/>
          </label>
          <label>
            Last Name
            <input type="text" name="lastName_signUp" value={user.lastName} onChange={ (e) => setUser({ ...user, lastName: e.target.value })} required/>
          </label>
          <label>
            Email
            <input type="email" name="email_signUp" value={user.email} onChange={ (e) => setUser({ ...user, email: e.target.value })} required/>
          </label>
          <label>
            Password
            <input type="password" name="pw_signUp" value={user.pw} onChange={ (e) => setUser({ ...user, pw: e.target.value })}  required/>
          </label>
          {authErrorMsg && (
            <p className="signup-error-msg" id="signUp-error">{authErrorMsg.msg}</p>
          )}
          <button>SIGN UP</button>
        </form>
        
      </div>
    </div>
  );
};

export default Signup;
