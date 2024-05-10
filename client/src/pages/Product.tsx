import React,  {useState} from "react";
import { IoIosArrowDown } from "react-icons/io";
import CounterButton from "../components/CounterButton";

const Product = () => {
  const productItem = [
    {
      name: "RASPBERRY",
      quantity: 1,
      price: "30.00",
      imagesSrc: [
        "raspberry.jpg",
        "raspberry2.jpg",
        "raspberry3.jpg",
        "raspberry4.jpg",
        "raspberry5.jpg",
      ],
    },
  ];
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div className="product-container">
      <div className="product-l-container">
        {productItem[0].imagesSrc.map((src: string) => (
          <img src={`${"/src/assets/" + src}`} alt={src}/>
        ))}
      </div>
      <div className="product-r-container">
        <h1>{productItem[0].name}</h1>
        <p>${productItem[0].price}</p>
        <p className="product-r-description">
          Red Raspberry grown organically from Malbourough, New Zealand.
          Enriched with juicy and sweet tanginess.
        </p>

        <button className="product-r-details-button-wrapper" onClick={()=>setOpenDetails(!openDetails)}>
          <p>PRODUCT DETAIL</p>
          <IoIosArrowDown className={` product-r-details-button-icon ${openDetails && "product-r-details-button-icon-close"}`}/>
        </button>
        <div className={`product-r-details-span-container ${openDetails && "product-r-details-span-open"}`}>
            <p>Size: 5Kg</p>
            <p>Taste Notes: Sweet, tangy, juicy</p>
            <p>Origin of Country: Grown and handpicked in New Zealand</p>
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
