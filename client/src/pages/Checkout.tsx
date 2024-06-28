import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { IShoppingCartItem } from "../interfaces/IShop";
import { IOrderDetail } from "../interfaces/IOrder";
import axios from "axios";
import { axiosJWT } from "../middlewares/refreshInterceptor";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    email,
    authToken,
    removeCookieInvalidToken,
  }: {
    email: string;
    authToken: string;
    removeCookieInvalidToken: () => Promise<void>;
  } = useOutletContext();

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
      response = await axiosJWT.get(
        `${import.meta.env.VITE_SERVERURL}/checkout/orderForm/${email}`,
        {
          headers: { authorization: "Bearer " + authToken },
        }
      );
      const data = response.data;
      if (!data) return navigate("/");

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
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        //console.log(err.response.status)
        removeCookieInvalidToken();
      }
    }
  };

  const removeCheckedOutItemsFromCart = async () => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/checkout/proceedToPay/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
        }
      );
      if (response.status === 200) {
        navigate("/payment", {
          state: {
            orderNo: orderDetail.orderNo,
            email: orderDetail.email,
            mobile: orderDetail.delivery.mobile,
            date: orderDetail.date,
            total: orderDetail.total,
          },
        });
      } else {
        console.log(response.status);
      }
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        //console.log(err.response.status)
        removeCookieInvalidToken();
      }
    }
  };

  const proceedToPay = async () => {
    let response;
    try {
      response = await axiosJWT(
        `${import.meta.env.VITE_SERVERURL}/checkout/proceedToPay/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authToken,
          },
          data: JSON.stringify({ orderDetail }),
        }
      );
      if (response.status === 200) {
        //remove checkedout items from cart
        removeCheckedOutItemsFromCart();
      } else {
        console.log(response.status);
      }
    } catch (err: any) {
      if (err.response.status === 403 || err.response.status === 401) {
        //console.log(err.response.status)
        removeCookieInvalidToken();
      }
    }
  };
  const payOnSubmit = () => {
    if (
      orderDetail.firstName &&
      orderDetail.lastName &&
      orderDetail.email &&
      orderDetail.delivery.address1 &&
      orderDetail.delivery.city &&
      orderDetail.delivery.zip
    )
      setOrderDetail({
        ...orderDetail,
        orderNo: genRanHex(8),
        date: new Date(),
        payment: "paid",
      });

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
      <div className="checkout-logo-wrapper-tablet">
        <Link to={"/"}>Verdant Grove</Link>
      </div>
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
                className={`${
                  !orderDetail.firstName ? "checkout-invalid" : ""
                }`}
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
                className={`${!orderDetail.lastName ? "checkout-invalid" : ""}`}
                value={orderDetail.lastName}
                onChange={(e) =>
                  setOrderDetail({ ...orderDetail, lastName: e.target.value })
                }
              />
            </label>
            {!orderDetail.firstName && <p>Enter a first name</p>}
            {!orderDetail.lastName && <p>Enter a last name</p>}
          </div>
          <label>
            Email
            <input
              type="email"
              className={`${!orderDetail.email ? "checkout-invalid" : ""}`}
              value={orderDetail.email}
              required
              onChange={(e) =>
                setOrderDetail({ ...orderDetail, email: e.target.value })
              }
            />
            {!orderDetail.email && <p>Enter an email</p>}
          </label>
        </div>
        <hr></hr>
        <div className="checkout-delivery-container">
          <p>2. Delivery Info</p>
          <label>
            Address Line 1
            <input
              type="text"
              className={`${
                !orderDetail.delivery.address1 ? "checkout-invalid" : ""
              }`}
              value={orderDetail.delivery.address1}
              required
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
            {!orderDetail.delivery.address1 && <p>Enter an address</p>}
          </label>
          <label>
            Address Line 2 (optional)
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
              className={`${
                !orderDetail.delivery.city ? "checkout-invalid" : ""
              }`}
              value={orderDetail.delivery.city}
              required
              onChange={(e) =>
                setOrderDetail({
                  ...orderDetail,
                  delivery: { ...orderDetail.delivery, city: e.target.value },
                })
              }
            />
            {!orderDetail.delivery.city && <p>Enter a city</p>}
          </label>
          <label>
            Zip/Postal Code
            <input
              type="text"
              className={`${
                !orderDetail.delivery.zip ? "checkout-invalid" : ""
              }`}
              value={orderDetail.delivery.zip}
              required
              onChange={(e) =>
                setOrderDetail({
                  ...orderDetail,
                  delivery: { ...orderDetail.delivery, zip: e.target.value },
                })
              }
            />
            {!orderDetail.delivery.zip && <p>Enter a zip code</p>}
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
          <h3>Your Order Summary</h3>
          <hr className="checkout-r-border"></hr>
          <div className="checkout-products-container">
            {orderDetail.products.map((p: IShoppingCartItem) => {
              return (
                <div className="checkout-product-wrapper" key={p.name}>
                  <img src={`${"./assets/" + p.imgSrc[0]}`} />
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
          <Link to={"/"} className="checkout-cancel-display">
            <button className="checkout-cancel-display-btn">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
