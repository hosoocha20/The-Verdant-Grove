import React from 'react'
import { IShoppingCartItem } from '../interfaces/IShop';
import CounterButton from './CounterButton';
import { IoIosArrowBack } from "react-icons/io";
import {TfiClose } from "react-icons/tfi";


interface ShoppingDrawerProps {
    clickedOutsideShoppingRef: React.RefObject<HTMLDivElement>;
    openShoppingBagDrawer: boolean;
    setOpenShoppingBagDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    shoppingCartArray: IShoppingCartItem[];


}
const ShoppingDrawer = (props: ShoppingDrawerProps) => {
  return (
    <div
    ref={props.clickedOutsideShoppingRef}
    className={`nav-r-shopping-drawer ${
      props.openShoppingBagDrawer ? "" : "nav-r-shopping-drawer-close"
    }`}
  >
    <div className="shopping-drawer-top">
      <div
        className="shopping-drawer-top-back"
        onClick={() => props.setOpenShoppingBagDrawer(false)}
      >
        <IoIosArrowBack className="shopping-drawer-back-icon" />
        <p>BACK TO STORE</p>
      </div>
      <TfiClose
        className="shopping-drawer-close-icon"
        onClick={() => props.setOpenShoppingBagDrawer(false)}
      />
    </div>
    <h1>Shopping Bag</h1>
    {props.shoppingCartArray?.length > 0 ? (
      <>
        <div className="shopping-drawer-select-container">
          <div className="shopping-drawer-select-checkbox-wrapper">
            <input type="checkbox" id="selectBagCheckbox" checked />
            <label htmlFor="selectBagCheckbox">Select All</label>
          </div>
          <p>
            Remove Selected: <span>3 item(s)</span>
          </p>
        </div>
        <div className="shopping-drawer-items-container">
          {props.shoppingCartArray.map((item: IShoppingCartItem) => {
            return (
              <div className="shopping-drawer-item-wrapper">
                <input type="checkbox" id="itemBagCheckbox" checked />
                <img
                  src={`${"/src/assets/" + item.imgSrc}`}
                  id="shopping-item-img"
                />
                <div className="shopping-drawer-item-info">
                  <p>{item.name}</p>
                  <CounterButton quantity={item.quantity} />
                  <p>${item.price}</p>
                  <button>Remove</button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    ) : (
      <div className="nav-r-shopping-drawer-empty">Your cart is empty</div>
    )}

    <div className="shopping-drawer-checkout-container">
      {props.shoppingCartArray?.length > 0 ? (
        <>
          <div className="shopping-drawer-subtotal-wrapper">
            <p>Subtotal (3 items)</p>
            <p>$100</p>
            <p>Shipping Fee</p>
            <p>$5</p>
          </div>
          <div className="shopping-drawer-total-wrapper">
            <p>Total</p>
            <p>$105</p>
            <p>Includes GST of</p>
            <p>$5.42</p>
          </div>
          <button className="shopping-drawer-checkout-button">
            CHECK OUT
          </button>
        </>
      ) : (
        <button
          className="shopping-drawer-empty-button"
          onClick={() => props.setOpenShoppingBagDrawer(false)}
        >
          CONTIUE SHOPPING
        </button>
      )}
    </div>
  </div>
  )
}

export default ShoppingDrawer