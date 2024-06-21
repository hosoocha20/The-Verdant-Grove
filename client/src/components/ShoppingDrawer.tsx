import React, { useEffect, useState } from "react";
import { IShoppingCartItem } from "../interfaces/IShop";
import CounterButton from "./CounterButton";
import { IoIosArrowBack } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface ShoppingDrawerProps {
  authToken: string;
  checkedAll : boolean;
  handleCheckedAllOnChange : ()=> Promise<void>;
  handleCheckedItemOnChange: (product: IShoppingCartItem) => Promise<void>;
  clickedOutsideShoppingRef: React.RefObject<HTMLDivElement>;
  openShoppingBagDrawer: boolean;
  setOpenShoppingBagDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  shoppingCart: IShoppingCartItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<IShoppingCartItem[]>>;
  removeShoppingCartItem: (item: IShoppingCartItem) => void;
  removeSelectedShoppingCartItem: () => void;
}
const ShoppingDrawer = (props: ShoppingDrawerProps) => {
  
  const navigate = useNavigate();

  const min = 1;
  const max = 99;

  // const handleCheckedAllOnChange = () => {
  //   //props.shoppingCart.forEach((i)=>{i.checked = !checkedAll;})
  //   props.setShoppingCart((prev) =>
  //     prev.map((i) => ({ ...i, checked: !checkedAll }))
  //   );
  //   setCheckedAll(!checkedAll);
  // };
  const getSubtotal = (): number => {
    const checkedArrayTotal = props.shoppingCart.filter(
      (i) => i.checked === true
    );
    return checkedArrayTotal.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    );
  };
  const [subtotal, setSubtotal] = useState(getSubtotal());
  // const handleCheckedItemOnChange = (item: IShoppingCartItem) => {
  //   const checkedArray = props.shoppingCart.map((i) =>
  //     i.name === item.name ? { ...i, checked: !i.checked } : i
  //   );
  //   props.setShoppingCart(checkedArray);
  //   if (checkedArray.some((i) => !i.checked))
  //       setCheckedAll(false);
  //   if (checkedArray.every((i) => i.checked))
  //       setCheckedAll(true)
  //   const checkedArrayTotal = props.shoppingCart.filter(
  //     (i) => i.checked === true
  //   );
  //   setSubtotal(
  //     checkedArrayTotal.reduce(
  //       (accumulator, currentValue) =>
  //         accumulator + currentValue.price * currentValue.quantity,
  //       0
  //     )
  //   );
  // };


  const decrement = (item: IShoppingCartItem) => {
    if (item.quantity > min) {
      props.setShoppingCart((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  };
  const increment = (item: IShoppingCartItem) => {
    if (item.quantity < max) {
      props.setShoppingCart((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    }
  };

  const handleQuantityOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: IShoppingCartItem
  ) => {
    props.setShoppingCart((prev) =>
      prev.map((i) =>
        i.name === item.name ? { ...i, quantity: e.target.valueAsNumber } : i
      )
    );
  };
  const handleQuantityOnBlur = (item: IShoppingCartItem) => {
    if (item.quantity < min || isNaN(item.quantity)) {
      props.setShoppingCart((prev) =>
        prev.map((i) => (i.name === item.name ? { ...i, quantity: min } : i))
      );
    }

    if (item.quantity > max) {
      props.setShoppingCart((prev) =>
        prev.map((i) => (i.name === item.name ? { ...i, quantity: max } : i))
      );
    }
  };

  const selectedItemLength = (): number => {
    const checkedArray = props.shoppingCart.filter((i) => i.checked === true);
    return checkedArray.length;
  };

  const checkoutOnClick = () =>{
    props.setOpenShoppingBagDrawer(false)
    if (props.authToken)
      navigate('/checkout')
    else 
      navigate('/login')
  }

  useEffect(() => {
    const checkedArrayTotal = props.shoppingCart.filter(
      (i) => i.checked === true
    );
    setSubtotal(
      checkedArrayTotal.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      )
    );
  }, [props.shoppingCart]);

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
                checked={props.checkedAll}
                onChange={props.handleCheckedAllOnChange}
              />
              <label htmlFor="selectBagCheckbox">Select All</label>
            </div>
            <div className="shopping-drawer-remove-selected-wrapper">
              <button onClick={props.removeSelectedShoppingCartItem}>
                Remove Selected:
              </button>
              <p>{selectedItemLength()} item(s)</p>
            </div>
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
                    onChange={() => props.handleCheckedItemOnChange(item)}
                  />
                  <img
                    src={`${"/src/assets/" + item.imgSrc[0]}`}
                    id="shopping-item-img"
                  />
                  <div className="shopping-drawer-item-info">
                    <p>{item.name}</p>
                    <div className="counter-button-wrapper">
                      <button onClick={() => decrement(item)}>
                        <HiMinus />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        max={max}
                        onChange={(e) => handleQuantityOnChange(e, item)}
                        onBlur={() => handleQuantityOnBlur(item)}
                      />
                      <button onClick={() => increment(item)}>
                        <HiPlus />
                      </button>
                    </div>
                    <p>${Number(item.price).toFixed(2)}</p>
                    <button onClick={() => props.removeShoppingCartItem(item)}>
                      Remove
                    </button>
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
              <p>Subtotal ({selectedItemLength()} items)</p>
              <p>${Number(subtotal).toFixed(2)}</p>
              <p>Shipping Fee</p>
              <p>$10.00</p>
            </div>
            <div className="shopping-drawer-total-wrapper">
              <p>Total</p>
              <p>
                $
                {subtotal
                  ? Number(subtotal + 10).toFixed(2)
                  : Number(0).toFixed(2)}
              </p>
            </div>
              <button className="shopping-drawer-checkout-button" onClick={checkoutOnClick}>
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
