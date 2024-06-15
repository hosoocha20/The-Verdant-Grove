import React from "react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="payment-container">
      <div className="payment-box">
        <div className="payment-box-top-wrapper">
          <div className="payment-icon-wrapper">
            <TiTick />
          </div>
          <p>Thankyou</p>
          <p>Your order has been recieved</p>
        </div>
        <div className="payment-order-details-wrapper">
          <p>Order No.</p>
          <p>123456</p>
          <p>Email</p>
          <p>johndoe@gmail.com</p>
          <p>Mobile</p>
          <p>027123456</p>
          <p>Date</p>
          <p>16 June, 2024</p>
          <p>Amount paid</p>
          <p>NZD $127.12</p>
        </div>
        <Link to={'/payment'}>
          <button>CLOSE</button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
