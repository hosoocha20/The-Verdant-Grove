import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import { IUser } from '../interfaces/IUser';

const UserProfile = () => {
    const [buttonValue, setButtonValue] = useState<string>('Edit')
    const [inputsDisabled, setInputDisabled] = useState(true);
    const {authedUser, updateUserProfile, authedEmail} : {authedUser: IUser, updateUserProfile : (e: React.MouseEvent<HTMLButtonElement>, update: IUser)=>void, authedEmail: string} = useOutletContext();
    const [updateUser, setUpdateUser] = useState<IUser>(authedUser);
    const buttonOnClick = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        if (e.currentTarget.value === 'Edit'){
            setButtonValue('Save')
            window.scrollTo(0, 0);
        }   
        else{
            updateUserProfile(e, updateUser);
            setButtonValue('Edit')
        }
        setInputDisabled(!inputsDisabled)
    }
    const cancelUpdate = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setUpdateUser(authedUser);
        setInputDisabled(true)
        setButtonValue('Edit')
    }
    useEffect(()=>{
        setUpdateUser(authedUser);
    },[authedUser])

  return (
    <div className='userProfile-container'>
        <h2>My Profile</h2>
        <hr></hr>
        <form className='userProfile-form'>
            <div className='userProfile-form__name-wrapper'>
                <label>
                    First Name*
                    <input type='text' value={updateUser.firstName} onChange={(e)=>setUpdateUser({...updateUser, firstName:e.target.value})} required disabled={inputsDisabled}/>
                </label>
                <label>
                    Last Name*
                    <input type='text' value={updateUser.lastName} onChange={(e)=>setUpdateUser({...updateUser, firstName:e.target.value})}  required disabled={inputsDisabled}/>
                </label>
            </div>
            <label>
                Email*
                <input type='text' value={updateUser.email} disabled={true}/>
            </label>
            <label>
                Address 1
                <input type='text' value={updateUser.address.address1} onChange={(e)=>setUpdateUser({...updateUser, address: {...updateUser.address, address1: e.target.value}})} disabled={inputsDisabled}/>
            </label>
            <label>
                Address 2
                <input type='text' value={updateUser.address.address2} onChange={(e)=>setUpdateUser({...updateUser, address: {...updateUser.address, address2: e.target.value}})} disabled={inputsDisabled}/>
            </label>
            <label>
                City
                <input type='text' value={updateUser.address.city} onChange={(e)=>setUpdateUser({...updateUser, address: {...updateUser.address, city: e.target.value}})} disabled={inputsDisabled}/>
            </label>
            <label>
                Postal/Zip code
                <input type='text' value={updateUser.address.zip} onChange={(e)=>setUpdateUser({...updateUser, address: {...updateUser.address, zip: e.target.value}})} disabled={inputsDisabled}/>
            </label>
            <hr></hr>
            <div className='userProfile-form__button-wrapper'>
                <button className={`${buttonValue === 'Edit' ? "userProfile-form-edit-btn" : "userProfile-form-save-btn"}`} value={buttonValue} onClick={buttonOnClick}>{buttonValue}</button>
                {buttonValue === "Save" && (
                    <button className='userProfile-form-edit-btn' value={"cancel"} onClick={cancelUpdate}>Cancel</button>
                )}
            </div>
        </form>

        

    </div>
  )
}

export default UserProfile