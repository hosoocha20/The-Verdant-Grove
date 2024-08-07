import React from "react";
import { TiTick } from "react-icons/ti";
import { Link, Navigate, useLocation, useOutletContext } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  if (!location.state) return <Navigate to={"/"} />;
  const {
    orderNo,
    email,
    mobile,
    date,
    total,
  }: {
    orderNo: string;
    email: string;
    mobile: string;
    date: Date;
    total: number;
  } = location.state;
  const {getUserCart} : {getUserCart: ()=> Promise<void>} = useOutletContext();

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
          <p>#{orderNo.toUpperCase()}</p>
          <p>Email</p>
          <p>{email}</p>
          {mobile && (
            <>
              <p>Mobile</p>
              <p>{mobile}</p>
            </>
          )}
          <p>Date</p>
          <p>
            {date.toLocaleString("en-NZ", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>Amount paid</p>
          <p>NZD ${total.toFixed(2)}</p>
        </div>
        <Link to={"/"} replace onClick={getUserCart}>
          <button>CLOSE</button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
