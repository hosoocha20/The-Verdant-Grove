import React, { useEffect, useState} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { IUser } from "../interfaces/IUser";
import { IShoppingCartItem } from "../interfaces/IShop";
import { useOutletContext } from "react-router-dom";

interface IUserSignup{
  firstName: string,
  lastName: string,
  email: string,
  pw: string,
  cart: IShoppingCartItem[]
}
const Signup = () => {
  const [user, setUser] = useState<IUserSignup>({firstName: '', lastName: '', email: '', pw: '', cart: []});
  const [signupErrorMsg, setSignupErrorMsg] = useState({msg: ''});
  const [cookies, setCookie, removeCookie] = useCookies();
  const {shoppingCart, setShoppingCart} : {shoppingCart: IShoppingCartItem[], setShoppingCart: React.Dispatch<React.SetStateAction<IShoppingCartItem[]>>} = useOutletContext();
  
 // const  addUser : AddUser    = useOutletContext();
 // const  authedUser: IUser = useOutletContext();

 const signUp = async (e: React.FormEvent) => {
  e.preventDefault();
  const emailRe = /^\S+@\S+\.\S+$/;
  const isValid = emailRe.test(user.email)

  if (!isValid){
    setSignupErrorMsg({...signupErrorMsg, msg: "Invalid email"})
    return
  }
  try{
    const response = await fetch(`${import.meta.env.VITE_SERVERURL}/register`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName: user.firstName, lastName: user.lastName, email: user.email.toLowerCase(), pw: user.pw, cart: user.cart,})
    })
    const data = await response.json();
    console.log(data)
    if (data.detail) {
      setSignupErrorMsg({...signupErrorMsg, msg: data.detail})
    }else{
    setCookie('Email', data.email);
    setCookie('AuthToken', data.token);
    setShoppingCart([]);  //reset shopping cart
    window.location.reload()
    }
  }catch(err){
    console.log(err);
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

  }, [signupErrorMsg])

  useEffect(() =>{
    setSignupErrorMsg({msg: ""})
  },[])


  return (
    <div className="signup-container">
      <div>
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={(e) => signUp(e)}>
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
          {signupErrorMsg && (
            <p className="signup-error-msg" id="signUp-error">{signupErrorMsg.msg}</p>
          )}
          <button>SIGN UP</button>
        </form>
        
      </div>
    </div>
  );
};

export default Signup;
