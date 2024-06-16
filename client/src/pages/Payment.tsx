import React, { useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { orderNo, email, mobile, date, total } : {orderNo: string, email: string, mobile: string, date: Date, total : number} = location.state;
  //console.log(location.state.orderNo)
  //console.log(orderDetail.orderNo)
  
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
          <p>{orderNo}</p>
          <p>Email</p>
          <p>{email}</p>
          {mobile && (
            <>
              <p>Mobile</p>
              <p>{mobile}</p>
            </>
          )}
          <p>Date</p>
          <p>{date.toISOString()}</p>
          <p>Amount paid</p>
          <p>NZD ${total}</p>
        </div>
        <Link to={"/"}>
          <button>CLOSE</button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
