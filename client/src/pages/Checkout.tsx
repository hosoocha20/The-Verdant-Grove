import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { IShoppingCartItem } from "../interfaces/IShop";
import { IOrderDetail } from "../interfaces/IOrder";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { email }: { email: string } = useOutletContext();

  const [orderDetail, setOrderDetail] = useState<IOrderDetail>({
    orderNo: "",
    firstName: "",
    lastName: "",
    email: email,
    delivery: { address1: "", address2: "", city: "", zip: "", mobile: "" },
    products: [],
    subtotal: 0,
    total: 0,
    shipping: 10,
    payment: "unpaid",
    date: new Date(),
  });

  const genRanHex = (size: number) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  const getSubTotal = (cart: IShoppingCartItem[]): number => {
    try {
      const data = cart.filter((i) => i.checked === true);
      const subtotal = data.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.price * currentValue.quantity,
        0
      );
      return subtotal;
    } catch (err) {
      console.log(err);
    }
    return 0;
  };

  const getUserOrderDetails = async () => {
    let response;
    try {
      response = await axios.get(
        `${import.meta.env.VITE_SERVERURL}/checkout/orderForm/${email}`
      );
      const data = response.data;
      setOrderDetail({
        orderNo: "",
        firstName: data.firstName,
        lastName: data.lastName,
        email: email,
        delivery: {
          address1: data.address?.address1 || "",
          address2: data.address?.address2 || "",
          city: data.address?.city || "",
          zip: data.address?.zip || "",
          mobile: "",
        },
        products: data.cart,
        subtotal: getSubTotal(data.cart),
        total: getSubTotal(data.cart) + 10,
        shipping: 10,
        payment: "unpaid",
        date: new Date(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCheckedOutItemsFromCart = async () => {
    let response;
    try{
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/checkout/proceedToPay/${email}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
      if (response.status === 200){
        navigate('/payment', {state: {orderNo: orderDetail.orderNo, email: orderDetail.email, mobile: orderDetail.delivery.mobile, date: orderDetail.date, total: orderDetail.total}})
      }else{
        console.log(response.status)
      }
    }catch(err){
      console.log(err)
    }
  }

  const proceedToPay = async () => {
    let response;
    try {
      response = await fetch(
        `${import.meta.env.VITE_SERVERURL}/checkout/proceedToPay/${email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderDetail }),
        }
      );
      if (response.status === 200) {
        //remove checkedout items from cart
        removeCheckedOutItemsFromCart();
      }else{
        console.log(response.status)
      }
    } catch (err) {
      console.log(err);
    }
  };
  const payOnSubmit =  () => {
    setOrderDetail({ ...orderDetail, orderNo: genRanHex(8), date: new Date(), payment: "paid" });

    //proceedToPay(orderDetail);
  };

  useEffect(() => {
    if (orderDetail.payment === "paid") {
      proceedToPay();
    }
  }, [orderDetail.payment]);

  useEffect(() => {
    getUserOrderDetails();
    //getCheckoutItems();
  }, []);
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
              <input
                type="text"
                value={orderDetail.firstName}
                onChange={(e) =>
                  setOrderDetail({ ...orderDetail, firstName: e.target.value })
                }
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                value={orderDetail.lastName}
                onChange={(e) =>
                  setOrderDetail({ ...orderDetail, lastName: e.target.value })
                }
              />
            </label>
          </div>
          <label>
            Email
            <input
              type="email"
              value={orderDetail.email}
              onChange={(e) =>
                setOrderDetail({ ...orderDetail, email: e.target.value })
              }
            />
          </label>
        </div>
        <hr></hr>
        <div className="checkout-delivery-container">
          <p>2. Delivery Info</p>
          <label>
            Address Line 1
            <input
              type="text"
              value={orderDetail.delivery.address1}
              onChange={(e) =>
                setOrderDetail({
                  ...orderDetail,
                  delivery: {
                    ...orderDetail.delivery,
                    address1: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            Address Line 2
            <input
              type="text"
              value={orderDetail.delivery.address2}
              onChange={(e) =>
                setOrderDetail({
                  ...orderDetail,
                  delivery: {
                    ...orderDetail.delivery,
                    address2: e.target.value,
                  },
                })
              }
            />
          </label>
          <label>
            City
            <input
              type="text"
              value={orderDetail.delivery.city}
              onChange={(e) =>
                setOrderDetail({
                  ...orderDetail,
                  delivery: { ...orderDetail.delivery, city: e.target.value },
                })
              }
            />
          </label>
          <label>
            Zip/Postal Code
            <input
              type="text"
              value={orderDetail.delivery.zip}
              onChange={(e) =>
                setOrderDetail({
                  ...orderDetail,
                  delivery: { ...orderDetail.delivery, zip: e.target.value },
                })
              }
            />
          </label>
          <label>
            Phone (optional)
            <input
              type="text"
              value={orderDetail.delivery.mobile}
              onChange={(e) =>
                setOrderDetail({
                  ...orderDetail,
                  delivery: { ...orderDetail.delivery, mobile: e.target.value },
                })
              }
            />
          </label>
        </div>
        <Link to={"/"}>
          <button className="checkout-cancel-btn">Cancel</button>
        </Link>

        <hr></hr>
      </div>
      <div className="checkout-r-container">
        <div className="checkout-r-flex-l-wrapper">
          <h3>Your Cart</h3>
          <hr className="checkout-r-border"></hr>
          <div className="checkout-products-container">
            {orderDetail.products.map((p: IShoppingCartItem) => {
              return (
                <div className="checkout-product-wrapper">
                  <img src={`${"/src/assets/" + p.imgSrc[0]}`} />
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
            <p>${Number(orderDetail.subtotal).toFixed(2)}</p>
            <p>Shipping</p>
            <p>${Number(orderDetail.shipping).toFixed(2)}</p>
          </div>
          <hr></hr>
          <div className="checkout-totalPrice-wrapper">
            <p>Total</p>
            <p>
              <span>NZD</span> ${Number(orderDetail.total).toFixed(2)}
            </p>
          </div>
          <button className="checkout-pay-btn" onClick={payOnSubmit}>
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
