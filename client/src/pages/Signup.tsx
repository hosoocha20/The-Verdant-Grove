import React, {useState} from "react";
import { IUser } from "../interfaces/IUser";
import { useOutletContext } from "react-router-dom";
//setUser:  React.Dispatch<React.SetStateAction<IUser>>;
const Signup = () => {
  const [user, setUser] = useState<IUser>({firstName: '', lastName: '', email: '', pw: ''});
  //type AddUser = (e: React.FormEvent, user: IUser) => void;
  const { authedUser, setAuthedUser, signUp} : { authedUser: IUser, setAuthedUser: React.Dispatch<React.SetStateAction<IUser>>, signUp : (e : React.FormEvent) => void} = useOutletContext();
 // const  addUser : AddUser    = useOutletContext();
 // const  authedUser: IUser = useOutletContext();


  return (
    <div className="signup-container">
      <div>
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={(e) => signUp(e)}>
          <label>
            First Name
            <input type="text" name="firstName_signUp" value={authedUser.firstName} onChange={ (e) => setAuthedUser({ ...authedUser, firstName: e.target.value })} required/>
          </label>
          <label>
            Last Name
            <input type="text" name="lastName_signUp" value={authedUser.lastName} onChange={ (e) => setAuthedUser({ ...authedUser, lastName: e.target.value })} required/>
          </label>
          <label>
            Email
            <input type="email" name="email_signUp" value={authedUser.email} onChange={ (e) => setAuthedUser({ ...authedUser, email: e.target.value })} required/>
          </label>
          <label>
            Password
            <input type="password" name="pw_signUp" value={authedUser.pw} onChange={ (e) => setAuthedUser({ ...authedUser, pw: e.target.value })}  required/>
          </label>
          <button>SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
