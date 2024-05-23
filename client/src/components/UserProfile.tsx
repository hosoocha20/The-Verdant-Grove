import React, { useState } from 'react'

const UserProfile = () => {
    const [buttonValue, setButtonValue] = useState<string>('Edit')
    const [inputsDisabled, setInputDisabled] = useState(true);
    const buttonOnClick = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        if (e.currentTarget.value === 'Edit'){
            setButtonValue('Save')
            window.scrollTo(0, 0);
        }
            
        else
            setButtonValue('Edit')
        setInputDisabled(!inputsDisabled)
    }
  return (
    <div className='userProfile-container'>
        <h2>My Profile</h2>
        <hr></hr>
        <form className='userProfile-form'>
            <div className='userProfile-form__name-wrapper'>
                <label>
                    First Name*
                    <input type='text' value={"John"} required disabled={inputsDisabled}/>
                </label>
                <label>
                    Last Name*
                    <input type='text' value={"Doe"} required disabled={inputsDisabled}/>
                </label>
            </div>
            <label>
                Email*
                <input type='text' value={"johndoe@gmail.com"} disabled={inputsDisabled}/>
            </label>
            <label>
                Address 1
                <input type='text' disabled={inputsDisabled}/>
            </label>
            <label>
                Address 2
                <input type='text' disabled={inputsDisabled}/>
            </label>
            <label>
                City
                <input type='text' disabled={inputsDisabled}/>
            </label>
            <label>
                Country
                <input type='text' disabled={inputsDisabled}/>
            </label>
            <label>
                Province
                <input type='text' disabled={inputsDisabled}/>
            </label>
            <label>
                Postal/Zip code
                <input type='text' disabled={inputsDisabled}/>
            </label>
            <hr></hr>
            <div className='userProfile-form__button-wrapper'>
                <button className={`${buttonValue === 'Edit' ? "userProfile-form-edit-btn" : "userProfile-form-save-btn"}`} value={buttonValue} onClick={buttonOnClick}>{buttonValue}</button>
                {buttonValue === "Save" && (
                    <button className='userProfile-form-edit-btn'>Cancel</button>
                )}
            </div>
        </form>

        

    </div>
  )
}

export default UserProfile