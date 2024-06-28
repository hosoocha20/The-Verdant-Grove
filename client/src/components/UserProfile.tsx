import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { IUserProfile } from "../interfaces/IUser";
import { axiosJWT } from "../middlewares/refreshInterceptor";

const UserProfile = () => {
  const [buttonValue, setButtonValue] = useState<string>("Edit");
  const [inputsDisabled, setInputDisabled] = useState(true);
  const {
    email,
    authToken,
    removeCookieInvalidToken,
  }: {
    email: string;
    authToken: string;
    removeCookieInvalidToken: () => Promise<void>;
  } = useOutletContext();
  const [updateUser, setUpdateUser] = useState<IUserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    address: { city: "", address1: "", address2: "", zip: "" },
  });
  const buttonOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.value === "Edit") {
      setButtonValue("Save");
      window.scrollTo(0, 0);
    } else {
      updateUserProfile();
      setButtonValue("Edit");
    }
    setInputDisabled(!inputsDisabled);
  };

  const cancelUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputDisabled(true);
    setButtonValue("Edit");
    getUserProfile();
  };
  const updateUserProfile = async () => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/account/profile/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: updateUser.firstName,
            lastName: updateUser.lastName,
            address: updateUser.address,
          }),
        }
      );
      const data = await response.json();
      //console.log(data);
      setUpdateUser(data);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        //console.log(err.response.status)
        removeCookieInvalidToken();
      }
    }
  };
  const getUserProfile = async () => {
    let response;
    try {
      response = await axiosJWT.get(
        `${import.meta.env.VITE_SERVERURL}/account/profile/${email}`,
        {
          headers: { authorization: "Bearer " + authToken },
        }
      );
      const json = response.data;
      setUpdateUser(json[0]);
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        //console.log(err.response.status)
        removeCookieInvalidToken();
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="userProfile-container">
      <h2>My Profile</h2>
      <hr></hr>
      <form className="userProfile-form">
        <div className="userProfile-form__name-wrapper">
          <label>
            First Name*
            <input
              type="text"
              name="fname"
              value={updateUser.firstName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, firstName: e.target.value })
              }
              required
              disabled={inputsDisabled}
            />
          </label>
          <label>
            Last Name*
            <input
              type="text"
              name="lname"
              value={updateUser.lastName}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, lastName: e.target.value })
              }
              required
              disabled={inputsDisabled}
            />
          </label>
        </div>
        <label>
          Email*
          <input type="text" name="email" value={updateUser.email} disabled={true} />
        </label>
        <label>
          Address 1
          <input
            type="text"
            name="address1"
            value={updateUser.address.address1}
            onChange={(e) =>
              setUpdateUser({
                ...updateUser,
                address: { ...updateUser.address, address1: e.target.value },
              })
            }
            disabled={inputsDisabled}
          />
        </label>
        <label>
          Address 2
          <input
            type="text"
            name="address2"
            value={updateUser.address.address2}
            onChange={(e) =>
              setUpdateUser({
                ...updateUser,
                address: { ...updateUser.address, address2: e.target.value },
              })
            }
            disabled={inputsDisabled}
          />
        </label>
        <label>
          City
          <input
            type="text"
            name="city"
            value={updateUser.address.city}
            onChange={(e) =>
              setUpdateUser({
                ...updateUser,
                address: { ...updateUser.address, city: e.target.value },
              })
            }
            disabled={inputsDisabled}
          />
        </label>
        <label>
          Postal/Zip code
          <input
            type="text"
            name="zip"
            value={updateUser.address.zip}
            onChange={(e) =>
              setUpdateUser({
                ...updateUser,
                address: { ...updateUser.address, zip: e.target.value },
              })
            }
            disabled={inputsDisabled}
          />
        </label>
        <hr></hr>
        <div className="userProfile-form__button-wrapper">
          <button
            className={`${
              buttonValue === "Edit"
                ? "userProfile-form-edit-btn"
                : "userProfile-form-save-btn"
            }`}
            value={buttonValue}
            onClick={buttonOnClick}
          >
            {buttonValue}
          </button>
          {buttonValue === "Save" && (
            <button
              className="userProfile-form-edit-btn"
              value={"cancel"}
              onClick={cancelUpdate}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
