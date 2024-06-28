import React, { useEffect, useState } from "react";
import { IShoppingCartItem } from "../interfaces/IShop";
import { IoIosArrowBack } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { HiPlus, HiMinus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface ShoppingDrawerProps {
  authToken: string;
  checkedAll: boolean;
  handleCheckedAllOnChange: () => void;
  handleCheckedItemOnChange: (product: IShoppingCartItem) => void;
  handleQuantityCounterOnChange: (
    product: IShoppingCartItem,
    val: number
  ) => void;
  handleQuantityValOnChange: (product: IShoppingCartItem, val: number) => void;
  clickedOutsideShoppingRef: React.RefObject<HTMLDivElement>;
  openShoppingBagDrawer: boolean;
  setOpenShoppingBagDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  shoppingCart: IShoppingCartItem[];
  removeShoppingCartItem: (item: IShoppingCartItem) => void;
  removeSelectedShoppingCartItem: () => void;
}
const ShoppingDrawer = (props: ShoppingDrawerProps) => {
  const navigate = useNavigate();

  const min = 1;
  const max = 99;

  const getSubtotal = (): number => {
    const checkedArrayTotal = props.shoppingCart.filter(
      (i) => i.checked === true
    );
    return checkedArrayTotal.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.price *
          (isNaN(currentValue.quantity) ? 1 : currentValue.quantity),
      0
    );
  };
  const [subtotal, setSubtotal] = useState(getSubtotal());

  const decrement = (item: IShoppingCartItem) => {
    if (item.quantity > min) {
      props.handleQuantityCounterOnChange(item, -1);
    }
  };
  const increment = (item: IShoppingCartItem) => {
    if (item.quantity < max) {
      props.handleQuantityCounterOnChange(item, 1);
    }
  };

  const handleQuantityOnBlur = (item: IShoppingCartItem) => {
    if (item.quantity < min || isNaN(item.quantity))
      props.handleQuantityValOnChange(item, min);

    if (item.quantity > max) props.handleQuantityValOnChange(item, max);
  };

  const selectedItemLength = (): number => {
    const checkedArray = props.shoppingCart.filter((i) => i.checked === true);
    return checkedArray.length;
  };

  const checkoutOnClick = () => {
    props.setOpenShoppingBagDrawer(false);
    if (props.authToken) navigate("/checkout");
    else navigate("/login");
  };

  useEffect(() => {
    const checkedArrayTotal = props.shoppingCart.filter(
      (i) => i.checked === true
    );
    setSubtotal(
      checkedArrayTotal.reduce(
        (accumulator, currentValue) =>
          accumulator +
          currentValue.price *
            (Number.isNaN(currentValue.quantity) ? 1 : currentValue.quantity),
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
                <div className="shopping-drawer-item-wrapper" key={item.name}>
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
                        onChange={(e) =>
                          props.handleQuantityValOnChange(
                            item,
                            e.target.valueAsNumber
                          )
                        }
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
            <button
              className="shopping-drawer-checkout-button"
              onClick={checkoutOnClick}
            >
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
