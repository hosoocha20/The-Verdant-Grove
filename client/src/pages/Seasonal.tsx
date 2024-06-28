import React from "react";
import Grid from "@mui/material/Grid";
import summer2024bg from "../assets/summer2024.jpg";

const Seasonal = () => {
  interface ShopItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    imgMainSrc: string[];
  }
  const shopItemArray: ShopItem[] = [
    {
      productId: "1",
      name: "RED CHERRY",
      quantity: 1,
      price: 40,
      imgMainSrc: ["cherry3.jpg"],
      category: "new",
    },
    {
      productId: "2",
      name: "HONEYDEW MELON",
      quantity: 1,
      price: 45,
      imgMainSrc: ["honeydew4.jpg"],
      category: "new",
    },
    {
      productId: "3",
      name: "KIWIFRUIT",
      quantity: 1,
      price: 50,
      imgMainSrc: ["kiwifruit3.jpg"],
      category: "new",
    },
    {
      productId: "4",
      name: "LEMON",
      quantity: 1,
      price: 50,
      imgMainSrc: ["lemon4.jpg"],
      category: "new",
    },
    {
      productId: "7",
      name: "STRAWBERRY",
      quantity: 1,
      price: 50,
      imgMainSrc: ["strawberry4.jpg"],
      category: "new",
    },
    {
      productId: "8",
      name: "WATERMELON",
      quantity: 1,
      price: 50,
      imgMainSrc: ["watermelon5.jpg"],
      category: "new",
    },
    {
      productId: "10",
      name: "APRICOT",
      quantity: 1,
      price: 50,
      imgMainSrc: ["apricot4.jpg"],
      category: "new",
    },
    {
      productId: "11",
      name: "BLUEBERRY",
      quantity: 1,
      price: 50,
      imgMainSrc: ["blueberry4.jpg"],
      category: "new",
    },
    {
      productId: "14",
      name: "PEACH",
      quantity: 1,
      price: 50,
      imgMainSrc: ["peach3.jpg"],
      category: "new",
    },
    {
      productId: "33",
      name: "RASPE",
      quantity: 1,
      price: 50,
      imgMainSrc: ["raspe5.jpg"],
      category: "collab",
    },
    {
      productId: "36",
      name: "STRAWLEMON",
      quantity: 1,
      price: 50,
      imgMainSrc: ["strawlemon4.jpg"],
      category: "collab",
    },
  ];

  return (
    <div className="seasonal-container">
      <div className="seasonal-header-text">
        <h1>2024 SUMMER</h1>
        <h2>&#8216;SUNSHINE IS ON ITS WAY&#8217;</h2>
        <p>
          Savor the anticipation of summer's vibrant embrace. The Verdant Grove
          awaits, brimming with nature's sweetest treasures bathed in the warm
          glow of the approaching sun. Explore our harvest, crafted by nature's
          hand, and create memories that linger long after the last rays of
          summer fade.
        </p>
      </div>
      <img id="summerbg" src={summer2024bg} alt="2024 Summer Season" />
      <Grid
        container
        className="seasonal-img-grid-container"
        spacing={3}
        marginTop={"1rem"}
        paddingBottom={"7rem"}
      >
        {shopItemArray.map((item: ShopItem, i: number) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <img
              className="seasonal-gallery-img"
              loading="lazy"
              src={`${"/assets/" + item.imgMainSrc}`}
              alt={item.name}
              width="auto"
              height="auto"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Seasonal;
