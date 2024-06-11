import React,  {useState} from "react";
import { IoIosArrowDown } from "react-icons/io";
import CounterButton from "../components/CounterButton";
import { IShopItem } from "../interfaces/IShop";
import { useLocation } from "react-router-dom";

const Product = () => {
  const location = useLocation();
  const { productItem } = location.state;
  //console.log(productItem)

  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div className="product-container">
      <div className="product-l-container">
        {productItem.imgsSrc.map((src: string) => (
          <img src={`${"/src/assets/" + src}`} alt={src}/>
        ))}
      </div>
      <div className="product-r-container">
        <h1>{productItem.name}</h1>
        <p>${productItem.price}</p>
        <p className="product-r-description">
          {productItem.description}
        </p>

        <button className="product-r-details-button-wrapper" onClick={()=>setOpenDetails(!openDetails)}>
          <p>PRODUCT DETAIL</p>
          <IoIosArrowDown className={` product-r-details-button-icon ${openDetails && "product-r-details-button-icon-close"}`}/>
        </button>
        <div className={`product-r-details-span-container ${openDetails && "product-r-details-span-open"}`}>
            <p>Size: {productItem.productDetail[0].size}</p>
            <p>Origin of Country: Product of {productItem.productDetail[0].countrySrc}</p>
        </div>

        <div className="product-r-quantity">
            <p>QUANTITY</p>
            <CounterButton quantity={1}/>
        </div>
        <button className="product-r-bag-button">ADD TO BAG</button>
      </div>
    </div>
  );
};

export default Product;
