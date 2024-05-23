import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

interface ShopItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    imgMainSrc: string[];
  }

interface MyButtonProps {
    /** The text to display inside the button */
    shopItemArray: ShopItem[];
    /** Whether the button can be interacted with */
  }

 const ShopAll = ({shopItemArray} : MyButtonProps) => {
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [page, setPage] = useState(1);
    const [noOfPages] = useState(Math.ceil(shopItemArray.length / itemsPerPage));
  
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    };
  return (
    <div className="shop-product-container">
    <h1><span>SHOP /</span> NEW IN SEASON</h1>

    <Grid container spacing={3} marginTop={"1rem"} paddingBottom={"7rem"}>
      {shopItemArray.slice((page - 1) * itemsPerPage, page * itemsPerPage ).map((item: ShopItem) => (
      
          <Grid item xs={6} sm={4} md={3}>
            <Link to={`/product`}>
            <div className="shop-product-item-container">
              <div className="shop-product-item-img-wrapper">
                <img className= "shop-product-img-hover" loading="lazy" src={`${"src/assets/" + item.imgMainSrc[1]}`}  alt={item.name} width="auto" height="auto"/>
                <img className= "shop-product-img-main" loading="lazy" src={`${"src/assets/" + item.imgMainSrc[0]}`}  alt={item.name + " hover"} width="auto" height="auto"/>
              </div>
              <p className="shop-product-item-name">{item.name}</p>
              <p>${item.price}</p>
            </div>
            </Link>
          </Grid>
        
      ))}
    </Grid>
    <Pagination
      count={noOfPages}
      page={page}
      onChange={handleChange}
      defaultPage={1}
    ></Pagination>

  </div>
  )
}
export default ShopAll