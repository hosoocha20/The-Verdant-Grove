import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import CounterButton from "../components/CounterButton";
import { IProduct , IShoppingCartItem} from "../interfaces/IShop";
import { useLocation, useOutletContext } from "react-router-dom";
import { HiPlus, HiMinus } from "react-icons/hi";
import { IUser } from "../interfaces/IUser";

const Product = () => {
  const location = useLocation();
  const { productItem } = location.state;
  const { addToShoppingCart, authedUser } : {addToShoppingCart: (item: IShoppingCartItem) => void, authedUser: IUser} = useOutletContext();
  const min = 1;
  const max = 99;
  const [quantity, setQuantity] = useState(min);
  const [thisItem, setThisItem] = useState<IShoppingCartItem>({email: authedUser.email, name: productItem.name, quantity: 1, price: productItem.price, imgSrc: productItem.imgMainSrc, checked: true})


  //console.log(productItem)

  const [openDetails, setOpenDetails] = useState(false);

  const decrement = () =>{
    if (thisItem.quantity > min){
      setThisItem(prev => ({...prev, quantity: prev.quantity-1 }))
      
    }
  }
  const increment = () =>{
    if (thisItem.quantity < max){
      setThisItem(prev => ({...prev, quantity: prev.quantity+1 }))
      
    }
  }

  const handleQuantityOnBlur = () =>{
    if (quantity < min || isNaN(quantity))
      setThisItem(prev => ({...prev, quantity: min}))
    if (quantity > max)
      setThisItem(prev => ({...prev, quantity: max}))
  }

  const addToBag = () =>{

    addToShoppingCart(thisItem)
  }

  
  return (
    <div className="product-container">
      <div className="product-l-container">
        {productItem.imgsSrc.map((src: string) => (
          <img src={`${"/src/assets/" + src}`} alt={src} />
        ))}
      </div>
      <div className="product-r-container">
        <h1>{productItem.name}</h1>
        <p>${Number(productItem.price).toFixed(2)}</p>
        <p className="product-r-description">{productItem.description}</p>

        <button
          className="product-r-details-button-wrapper"
          onClick={() => setOpenDetails(!openDetails)}
        >
          <p>PRODUCT DETAIL</p>
          <IoIosArrowDown
            className={` product-r-details-button-icon ${
              openDetails && "product-r-details-button-icon-close"
            }`}
          />
        </button>
        <div
          className={`product-r-details-span-container ${
            openDetails && "product-r-details-span-open"
          }`}
        >
          <p>Size: {productItem.productDetail.size}</p>
          <p>
            Origin of Country: Product of{" "}
            {productItem.productDetail.countrySrc}
          </p>
        </div>

        <div className="product-r-quantity">
          <p>QUANTITY</p>
          <div className="counter-button-wrapper">
            <button onClick={decrement}>
              <HiMinus />
            </button>
            <input type="number" value={thisItem.quantity} max={max} onChange={(e)=> setThisItem(prev => ({...prev, quantity: e.target.valueAsNumber }))} onBlur={handleQuantityOnBlur} />
            <button onClick={increment}>
              <HiPlus />
            </button>
          </div>
        </div>
        <button className="product-r-bag-button" onClick={addToBag}>ADD TO BAG</button>
      </div>
    </div>
  );
};

export default Product;
