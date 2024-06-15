import React from "react";
import { Link } from "react-router-dom";
import { IShoppingCartItem } from "../interfaces/IShop";

const Checkout = () => {
  const testArray = {
    orderNo: "123",
    firstName: "John",
    lastName: "Doe",
    email: "Johndoe@gmail.com",
    delivery: { address1: "hi", address2: "", city: "Auckland", mobile: "" },
    products: [
      {
        email: "Johndoe@gmail.com",
        name: "BLUEBERRY",
        quantity: 2,
        price: 12,
        imgSrc: "blueberry-main.png",
        checked: true,
      },
      {
        email: "Johndoe@gmail.com",
        name: "RASPBERRY",
        quantity: 2,
        price: 12,
        imgSrc: "raspberry-main.png",
        checked: true,
      },
      {
        email: "Johndoe@gmail.com",
        name: "RASPBERRY",
        quantity: 2,
        price: 12,
        imgSrc: "raspberry-main.png",
        checked: true,
      },
      {
        email: "Johndoe@gmail.com",
        name: "RASPBERRY",
        quantity: 2,
        price: 12,
        imgSrc: "raspberry-main.png",
        checked: true,
      },
    ],
    total: 121.12,
    payment: "paid",
  };
  return (
    <div className="checkout-container">
      <div className="checkout-l-container">
        <div className="checkout-logo-wrapper">
          <Link to={"/"}>Verdant Grove</Link>
        </div>
        <hr></hr>
        <div className="checkout-contact-container">
          <p>1. Contact</p>
          <div className="checkout-contact-name-wrapper">
            <label>
              First Name
              <input type="text" />
            </label>
            <label>
              Last Name
              <input type="text" />
            </label>
          </div>
          <label>
            Email
            <input type="email" />
          </label>
        </div>
        <hr></hr>
        <div className="checkout-delivery-container">
          <p>2. Delivery Info</p>
          <label>
            Address Line 1
            <input type="text" />
          </label>
          <label>
            Address Line 2
            <input type="text" />
          </label>
          <label>
            City
            <input type="text" />
          </label>
          <label>
            Zip/Postal Code
            <input type="text" />
          </label>
          <label>
            Phone (optional)
            <input type="number" />
          </label>
        </div>
        <Link to={'/'}>
            <button className="checkout-cancel-btn">Cancel</button>
        </Link>
        
        <hr></hr>
      </div>
      <div className="checkout-r-container">
        <div className="checkout-r-flex-l-wrapper">
          <h3>Your Cart</h3>
          <hr className="checkout-r-border"></hr>
          <div className="checkout-products-container">
            {testArray.products.map((p: IShoppingCartItem) => {
              return (
                <div className="checkout-product-wrapper">
                  <img src={`${"/src/assets/" + p.imgSrc}`} />
                  <div className="checkout-product-details">
                    <p>{p.name}</p>
                    <p>${Number(p.price).toFixed(2)}</p>
                    <p>Qty: {p.quantity} item(s)</p>
                  </div>
                </div>
              );
            })}
          </div>
          <hr></hr>
          <div className="checkout-subprice-wrapper">
            <p>Subtotal</p>
            <p>$120.12</p>
            <p>Shipping</p>
            <p>$10</p>
          </div>
          <hr></hr>
          <div className="checkout-totalPrice-wrapper">
              <p>Total</p>
              <p><span>NZD</span> $130.12</p>
          </div>
          <button className="checkout-pay-btn">Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
