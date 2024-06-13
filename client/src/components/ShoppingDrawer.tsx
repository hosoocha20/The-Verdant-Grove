import React, { useState } from "react";
import { IShoppingCartItem } from "../interfaces/IShop";
import CounterButton from "./CounterButton";
import { IoIosArrowBack } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { HiPlus, HiMinus } from "react-icons/hi";

interface ShoppingDrawerProps {
  clickedOutsideShoppingRef: React.RefObject<HTMLDivElement>;
  openShoppingBagDrawer: boolean;
  setOpenShoppingBagDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  shoppingCart: IShoppingCartItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<IShoppingCartItem[]>>;
  updateShoppingCartQuantity: () => void;
}
const ShoppingDrawer = (props: ShoppingDrawerProps) => {
  const [checkedAll, setCheckedAll] = useState(true);
  const min = 1;
  const max = 99;

  const handleCheckedAllOnChange = () => {
    //props.shoppingCart.forEach((i)=>{i.checked = !checkedAll;})
    props.setShoppingCart((prev) =>
      prev.map((i) => ({ ...i, checked: !checkedAll }))
    );
    setCheckedAll(!checkedAll);
  };
  const handleCheckedItemOnChange = (item: IShoppingCartItem) => {
    props.setShoppingCart((prev) =>
      prev.map((i) =>
        i.name === item.name ? { ...i, checked: !i.checked } : i
      )
    );
  };

  const decrement = (item: IShoppingCartItem) =>{
    if (item.quantity > min){
      props.setShoppingCart((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  }
  const increment = (item: IShoppingCartItem) =>{
    if (item.quantity < max){
      props.setShoppingCart((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    }
  }

  const handleQuantityOnChange = (e:React.ChangeEvent<HTMLInputElement>, item: IShoppingCartItem) => {
    props.setShoppingCart((prev) =>
      prev.map((i) =>
        i.name === item.name ? { ...i, quantity: e.target.valueAsNumber } : i
      )
    );
  }
  const handleQuantityOnBlur = (item: IShoppingCartItem) =>{
    if (item.quantity < min || isNaN(item.quantity)){
      props.setShoppingCart((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: min} : i
        )
      );
    }
    
    if (item.quantity > max){
      props.setShoppingCart((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: max } : i
        )
      );
    }
      
  }

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
      {props.shoppingCart?.length > 0 ? (
        <>
          <div className="shopping-drawer-select-container">
            <div className="shopping-drawer-select-checkbox-wrapper">
              <input
                type="checkbox"
                id="selectBagCheckbox"
                className="ui-checkbox"
                checked={checkedAll}
                onChange={handleCheckedAllOnChange}
              />
              <label htmlFor="selectBagCheckbox">Select All</label>
            </div>
            <p>
              Remove Selected: <span>3 item(s)</span>
            </p>
          </div>
          <div className="shopping-drawer-items-container">
            {props.shoppingCart.map((item: IShoppingCartItem) => {
              return (
                <div className="shopping-drawer-item-wrapper">
                  <input
                    type="checkbox"
                    id="itemBagCheckbox"
                    className="ui-checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckedItemOnChange(item)}
                  />
                  <img
                    src={`${"/src/assets/" + item.imgSrc[0]}`}
                    id="shopping-item-img"
                  />
                  <div className="shopping-drawer-item-info">
                    <p>{item.name}</p>
                    <div className="counter-button-wrapper">
                      <button onClick={()=>decrement(item)}>
                        <HiMinus />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        max={max}
                        onChange={(e) => handleQuantityOnChange(e, item)}
                        onBlur={()=>handleQuantityOnBlur(item)}
                      />
                      <button onClick={()=>increment(item)}>
                        <HiPlus />
                      </button>
                    </div>
                    <p>${item.price}</p>
                    <button>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="nav-r-shopping-drawer-empty">Your cart is empty.</div>
      )}

      <div className="shopping-drawer-checkout-container">
        {props.shoppingCart?.length > 0 ? (
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
  );
};

export default ShoppingDrawer;
