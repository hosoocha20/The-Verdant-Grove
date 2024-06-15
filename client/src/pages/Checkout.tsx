import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { IShoppingCartItem } from "../interfaces/IShop";
import { IUser } from "../interfaces/IUser";
import { IOrderDetail } from "../interfaces/IOrder";

const Checkout = () => {
  const { authedUser, shoppingCart }: { authedUser: IUser, shoppingCart: IShoppingCartItem[] } = useOutletContext();

  const [orderDetail, setOrderDetail] = useState<IOrderDetail>({orderNo: '12345', firstName: authedUser.firstName, lastName:authedUser.lastName, email: authedUser.email, delivery: {address1: "", address2: "", city: "", zip: "", mobile: ""}, 
    products: [], subtotal: 0, total : 0, shipping: 10, payment: "unpaid"})




  const getCheckoutItems = async() =>{
    try{
        const data = await shoppingCart.filter((i) => i.checked === true);
        //setCheckoutCart(data);
        const subtotal = data.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.price * currentValue.quantity,
            0
          );
        const total = subtotal + orderDetail.shipping;
        setOrderDetail({...orderDetail, products: data, subtotal: subtotal, total: total})

    }catch(err){
        console.log(err)
    }
    
  }



  useEffect(()=>{
    getCheckoutItems();
    setOrderDetail({ ...orderDetail, firstName: authedUser.firstName, lastName: authedUser.lastName, email: authedUser.email})
  },[])
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
              <input type="text" value={orderDetail.firstName} onChange={(e)=>setOrderDetail({...orderDetail, firstName: e.target.value})}/>
            </label>
            <label>
              Last Name
              <input type="text" value={orderDetail.lastName} onChange={(e)=>setOrderDetail({...orderDetail, lastName: e.target.value})}/>
            </label>
          </div>
          <label>
            Email
            <input type="email" value={orderDetail.email} onChange={(e)=>setOrderDetail({...orderDetail, email: e.target.value})}/>
          </label>
        </div>
        <hr></hr>
        <div className="checkout-delivery-container">
          <p>2. Delivery Info</p>
          <label>
            Address Line 1
            <input type="text" value={orderDetail.delivery.address1} onChange={(e)=>setOrderDetail({...orderDetail, delivery: {...orderDetail.delivery, address1 : e.target.value} })}/>
          </label>
          <label>
            Address Line 2
            <input type="text" value={orderDetail.delivery.address2} onChange={(e)=>setOrderDetail({...orderDetail, delivery: {...orderDetail.delivery, address2 : e.target.value} })}/>
          </label>
          <label>
            City
            <input type="text" value={orderDetail.delivery.city} onChange={(e)=>setOrderDetail({...orderDetail, delivery: {...orderDetail.delivery, city : e.target.value} })}/>
          </label>
          <label>
            Zip/Postal Code
            <input type="text" value={orderDetail.delivery.zip} onChange={(e)=>setOrderDetail({...orderDetail, delivery: {...orderDetail.delivery, zip : e.target.value} })}/>
          </label>
          <label>
            Phone (optional)
            <input type="text" value={orderDetail.delivery.mobile} onChange={(e)=>setOrderDetail({...orderDetail, delivery: {...orderDetail.delivery, mobile : e.target.value} })}/>
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
          <button className="checkout-pay-btn">Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
