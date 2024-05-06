import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import all from "../assets/all2.jpg";
import newIn from "../assets/new.jpg";
import collab from "../assets/collab1.png";
import al from "../assets/silver.jpeg";
import { Link } from "react-router-dom";

const Shop = () => {
  const [top, setTop] = useState(true);
  
  interface shopOption {
    title: string;
    imgSrc: string;
  }
  const shopOptionsLinks: shopOption[] = [
    { title: "IN SEASON", imgSrc: "new.jpg" },
    { title: "BINARY x MODIFY", imgSrc: "collab1.png" },
    { title: "ALL", imgSrc: "all2.jpg" },
  ];

  interface ShopItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    imgMainSrc: string[];
  }

  const shopItemArray: ShopItem[] = [
    { productId: '1', name: "RED CHERRY", quantity: 1, price: 40, imgMainSrc: ["cherry-main.png", "cherry-hover.png"], category: "new" },
    { productId: '2', name: "HONEYDEW MELON", quantity: 1, price: 45, imgMainSrc: ["honeydew-main.png", "honeydew-hover.png"], category: "new"  },
    { productId: '3', name: "KIWIFRUIT", quantity: 1, price: 50, imgMainSrc: ["kiwifruit-main.png", "kiwifruit-hover.png"], category: "new"  },
    { productId: '4', name: "LEMON", quantity: 1, price: 50, imgMainSrc: ["lemon-main.png", "lemon-hover.png"], category: "new"  },
    { productId: '5', name: "PEAR", quantity: 1, price: 50, imgMainSrc: ["pear-main.png", "pear-hover.png"] , category: "new" },
    { productId: '6', name: "RASPBERRY", quantity: 1, price: 50, imgMainSrc: ["raspberry-main.png", "raspberry-hover.png"] , category: "new" },
    { productId: '7', name: "STRAWBERRY", quantity: 1, price: 50, imgMainSrc: ["strawberry-main.png", "strawberry-hover.png"] , category: "new" },
    { productId: '8', name: "WATERMELON", quantity: 1, price: 50, imgMainSrc: ["watermelon-main.png", "watermelon-hover.png"] , category: "new" },
    { productId: '9', name: "DRAGONFRUIT", quantity: 1, price: 50, imgMainSrc: ["dragonfruit-main.png", "dragonfruit-hover.png"] , category: "new" },
    { productId: '10', name: "APRICOT", quantity: 1, price: 50, imgMainSrc: ["apricot-main.png", "apricot-hover.png"] , category: "new" },
    { productId: '11', name: "BLUEBERRY", quantity: 1, price: 50, imgMainSrc: ["blueberry-main.png", "blueberry-hover.png"] , category: "new" },
    { productId: '12', name: "PASSIONFRUIT", quantity: 1, price: 50, imgMainSrc: ["passionfruit-main.png", "passionfruit-hover.png"] , category: "new" },
    { productId: '13', name: "FIG", quantity: 1, price: 50, imgMainSrc: ["fig-main.png", "fig-hover.png"] , category: "new" },
    { productId: '14', name: "PEACH", quantity: 1, price: 50, imgMainSrc: ["peach-main.png", "peach-hover.png"] , category: "new" },
    { productId: '15' ,name: "MANGO", quantity: 1, price: 50, imgMainSrc: ["mango-main.png", "mango-hover.png"], category: "new"  },
    { productId: '16', name: "COCONUT", quantity: 1, price: 50, imgMainSrc: ["coconut-main.png", "coconut-hover.png"], category: "new" },
    { productId: '17', name: "AVOCADO", quantity: 1, price: 50, imgMainSrc: ["avocado-main.png", "avocado-hover.png"], category: "all-rounder" },
    { productId: '18', name: "BANANNA", quantity: 1, price: 50, imgMainSrc: ["bananna-main.png", "bananna-hover.png"], category: "all-rounder" },
    { productId: '19', name: "FEIJOA", quantity: 1, price: 50, imgMainSrc: ["feijoa-main.png", "feijoa-hover.png"], category: "nz-grown" },
    { productId: '20', name: "GRAPEFRUIT", quantity: 1, price: 50, imgMainSrc: ["grapefruit-main.png", "grapefruit-hover.png"], category: "all-rounder" },
    { productId: '21', name: "GRANNY SMITH", quantity: 1, price: 50, imgMainSrc: ["greenapple-main.png", "greenapple-hover.png"], category: "nz-grown" },
    { productId: '22', name: "GUAVA", quantity: 1, price: 50, imgMainSrc: ["guava-main.png", "guava-hover.png"], category: "summer" },
    { productId: '23', name: "LYCHEE", quantity: 1, price: 50, imgMainSrc: ["lychee-main.png", "lychee-hover.png"], category: "exotic" },
    { productId: '24', name: "HALLABONG", quantity: 1, price: 50, imgMainSrc: ["hallabong-main.png", "hallabong-hover.png"], category: "luxury" },
    { productId: '25', name: "PINEAPPLE", quantity: 1, price: 50, imgMainSrc: ["pineapple-main.png", "pineapple-hover.png"], category: "exotic" },
    { productId: '26', name: "RED APPLE", quantity: 1, price: 50, imgMainSrc: ["apple-main.png", "apple-hover.png"], category: "nz-grown" },
    { productId: '27', name: "YUZU", quantity: 1, price: 50, imgMainSrc: ["yuzu-main.png", "yuzu-hover.png"], category: "luxury" },
    { productId: '28', name: "BANORANGE", quantity: 1, price: 50, imgMainSrc: ["banorange-main.png", "banorange-hover.png"], category: "collab" },
    { productId: '29', name: "GRAPPLE", quantity: 1, price: 50, imgMainSrc: ["grapple-main.png", "grapple-hover.png"], category: "collab" },
    { productId: '30', name: "GREEN APPLEFRUIT", quantity: 1, price: 50, imgMainSrc: ["green-applefruit-main.png", "green-applefruit-hover.png"], category: "collab" },
    { productId: '31', name: "PINEMANGO", quantity: 1, price: 50, imgMainSrc: ["pinemango-main.png", "pinemango-hover.png"], category: "collab" },
    { productId: '32', name: "PINEKIWI", quantity: 1, price: 50, imgMainSrc: ["pinekiwi-main.png", "pinekiwi-hover.png"], category: "collab" },
    { productId: '33', name: "RASPE", quantity: 1, price: 50, imgMainSrc: ["raspe-main.png", "raspe-hover.png"], category: "collab" },
    { productId: '34', name: "SEEDLESS POMEGRANATE", quantity: 1, price: 50, imgMainSrc: ["pomegranate-main.png", "pomegranate-hover.png"], category: "collab" },
    { productId: '35', name: "SQUARE WATERMELON", quantity: 1, price: 50, imgMainSrc: ["square-watermelon-main.png", "square-watermelon-hover.png"], category: "collab" },
    { productId: '36', name: "STRAWLEMON", quantity: 1, price: 50, imgMainSrc: ["strawlemon-main.png", "strawlemon-hover.png"], category: "collab" }
    
  ];

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [noOfPages] = useState(Math.ceil(shopItemArray.length / itemsPerPage));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);



  return (
    <div className="shop-container">
      
      <div className={`shop-options-btn-container ${!top && "shop-options-btn-container-shadow"}`}>
        {shopOptionsLinks.map((link: shopOption) => {
          return (
            <div className="shop-options-btn-wrapper">
              <div className="shop-optiobs-btn-img-container">
                <div className="shop-options-btn-img-wrapper">
                  <img src={`${"src/assets/" + link.imgSrc}`}  />
                </div>
              </div>
              <p>{link.title}</p>
            </div>
          );
        })}
      </div>
      <div className="shop-product-container">
        <h1><span>SHOP /</span> NEW IN SEASON</h1>

        <Grid container spacing={3} marginTop={"1rem"} paddingBottom={"7rem"}>
          {shopItemArray.slice((page - 1) * itemsPerPage, page * itemsPerPage ).map((item: ShopItem) => (
            
              <Grid item xs={6} sm={4} md={3}>
                <Link to={"product"}>
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

    </div>
  );
};

export default Shop;
