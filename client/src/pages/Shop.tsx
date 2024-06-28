import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import { IProduct } from "../interfaces/IShop";

const Shop = () => {
  const navigate = useNavigate();
  const [top, setTop] = useState(true);
  const { shopOption }  = useParams();

  const [shopItemArray, setShopItemArray] = useState<IProduct[]>([]);

  interface ShopOption {
    title: string;
    imgSrc: string;
    link: string;
  }
  const shopOptionsLinks: ShopOption[] = [
    { title: "ALL", imgSrc: "all2.jpg", link: "all" },
    { title: "NEW IN", imgSrc: "new.jpg", link: "new" },
    { title: "GMO", imgSrc: "collab1.png", link: "gmo" },
  ];

  const getProductsByCategory = async () => {
    let response;
    if (shopOption !== "all") {
      try {
        response = await axios.get(
          `${import.meta.env.VITE_SERVERURL}/products/${shopOption}`
        );
        const json = await response.data;
        setShopItemArray(json);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        response = await axios.get(
          `${import.meta.env.VITE_SERVERURL}/products`
        );
        const json = await response.data;
        //console.log(json);

        setShopItemArray(json);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const shopItemArrayAll: IShopItem[] = [
  //   { productId: '1', name: "RED CHERRY", quantity: 1, price: 27, imgMainSrc: ["cherry-main.png", "cherry-hover.png"], imgsSrc:["cherry.jpg", "cherry2.jpg", "cherry3.jpg", "cherry4.jpg", "cherry5.jpg"], description: "Deep red, plump cherries grown and handpicked in Central Otago, New Zealand, bursting with sweet and slightly tart flavor. These Central Otago cherries are renowned for their intense flavor and sunshine-ripened sweetness, thanks to the region's warm days and cool nights.", category: "new", productDetail: [{size: "1 Kg", countrySrc: "New Zealand"}] },
  //   { productId: '2', name: "HONEYDEW MELON", quantity: 1, price: 35, imgMainSrc: ["honeydew-main.png", "honeydew-hover.png"], imgsSrc:["honeydew.jpg", "honeydew2.jpg", "honeydew3.jpg", "honeydew4.jpg", "honeydew5.jpg"], description: "Pale green, smooth-skinned honeydew melon grown in Japan, with a refreshingly sweet and mild flavor. Japanese honeydew melons are known for their exceptional quality, cultivated using traditional methods that emphasize perfect ripeness and delicate sweetness.", category: "new", productDetail: [{size: "2 Kg", countrySrc: "Japan"}] },
  //   { productId: '3', name: "KIWIFRUIT", quantity: 1, price: 7, imgMainSrc: ["kiwifruit-main.png", "kiwifruit-hover.png"], imgsSrc:["kiwifruit.jpg", "kiwifruit2.jpg", "kiwifruit3.jpg", "kiwifruit4.jpg"], description: "Fuzzy brown on the outside, vibrant emerald green on the inside, with a tangy-sweet flavor and a burst of tiny black seeds. Grown in sunny orchards across New Zealand, these kiwifruit are bursting with flavor and freshness.", category: "new", productDetail: [{size: "700 g", countrySrc: "New Zealand"}]  },
  //   { productId: '4', name: "LEMON", quantity: 1, price: 10, imgMainSrc: ["lemon-main.png", "lemon-hover.png"], imgsSrc:["lemon.jpg", "lemon2.jpg", "lemon3.jpg", "lemon4.jpg"], description: " Bright yellow citrus fruit grown under the sunny skies of Mexico, with a vibrant, tart flavor and a juicy center.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "Mexico"}]  },
  //   { productId: '5', name: "PEAR", quantity: 1, price: 7, imgMainSrc: ["pear-main.png", "pear-hover.png"] , imgsSrc:["pear.jpg", "pear2.jpg", "pear3.jpg", "pear4.jpg", "pear5.jpg", "pear6.jpg"], description: "Sweet and juicy pear with a smooth, creamy texture, grown in the verdant orchards of New Zealand. ", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "New Zealand"}] },
  //   { productId: '6', name: "RASPBERRY", quantity: 1, price: 12.50, imgMainSrc: ["raspberry-main.png", "raspberry-hover.png"] , imgsSrc:["raspberry.jpg", "raspberry2.jpg", "raspberry3.jpg", "raspberry4.jpg", "raspberry5.jpg"], description: "Red Raspberry grown organically from Malbourough, New Zealand. Enriched with juicy and sweet tanginess.", category: "new", productDetail: [{size: "125 g", countrySrc: "New Zealand"}] },
  //   { productId: '7', name: "STRAWBERRY", quantity: 1, price: 19.40, imgMainSrc: ["strawberry-main.png", "strawberry-hover.png"] , imgsSrc:["strawberry.jpg", "strawberry2.jpg", "strawberry3.jpg", "strawberry4.jpg", "strawberry5.jpg", "strawberry6.jpg"], description: "Bright red, heart-shaped berries grown in sunny South Korea, with a sweet, slightly tart flavor and a juicy, tender flesh.", category: "new", productDetail: [{size: "250 g", countrySrc: "South Korea"}] },
  //   { productId: '8', name: "WATERMELON", quantity: 1, price: 22, imgMainSrc: ["watermelon-main.png", "watermelon-hover.png"] , imgsSrc:["watermelon.jpg", "watermelon2.jpg", "watermelon3.jpg", "watermelon4.jpg", "watermelon5.jpg"], description: "Refreshingly sweet and juicy summer fruit with a vibrant red interior and a dark green rind, grown in USA", category: "new" , productDetail: [{size: "5 Kg", countrySrc: "USA"}]},
  //   { productId: '9', name: "DRAGONFRUIT", quantity: 1, price: 8.45, imgMainSrc: ["dragonfruit-main.png", "dragonfruit-hover.png"] , imgsSrc:["dragonfruit.jpg", "dragonfruit2.jpg", "dragonfruit3.jpg", "dragonfruit4.jpg", "dragonfruit5.jpg"], description: "This exotic dragonfruit offers a mildly sweet and slightly floral flavor, sourced directly from Vietnam.", category: "new", productDetail: [{size: "350 g", countrySrc: "Vietnam"}] },
  //   { productId: '10', name: "APRICOT", quantity: 1, price: 12, imgMainSrc: ["apricot-main.png", "apricot-hover.png"] , imgsSrc:["apricot.jpg", "apricot2.jpg", "apricot3.jpg", "apricot4.jpg", "apricot5.jpg"], description: "Sun-kissed apricots, grown and handpicked in Central Otago, New Zealand, boast velvety skin and a sweet, slightly tart flavor. ", category: "new", productDetail: [{size: "1 Kg", countrySrc: "New Zealand"}] },
  //   { productId: '11', name: "BLUEBERRY", quantity: 1, price: 9.99, imgMainSrc: ["blueberry-main.png", "blueberry-hover.png"] , imgsSrc:["blueberry.jpg", "blueberry2.jpg", "blueberry3.jpg", "blueberry4.jpg"], description: "Bursting with sweet and tart flavor, these plump blueberries are grown in the pristine fields of New Zealand.", category: "new", productDetail: [{size: "125 g", countrySrc: "New Zealand"}] },
  //   { productId: '12', name: "PASSIONFRUIT", quantity: 1, price: 25.99, imgMainSrc: ["passionfruit-main.png", "passionfruit-hover.png"] , imgsSrc:["passionfruit.jpg", "passionfruit2.jpg", "passionfruit3.jpg", "passionfruit4.jpg", "passionfruit5.jpg"], description: "Hailing from the tropical paradise of Brazil, these vibrantly purple passionfruit offer a unique taste experience.", category: "new", productDetail: [{size: "500 g", countrySrc: "Brazil"}] },
  //   { productId: '13', name: "FIG", quantity: 1, price: 10, imgMainSrc: ["fig-main.png", "fig-hover.png"] , imgsSrc:["fig.jpg", "fig2.jpg", "fig3.jpg", "fig4.jpg"], description: "Sun-ripened and bursting with flavor, these New Zealand figs boast a deep purple skin and a sweet, slightly nutty flesh.  Grown under ideal conditions, these New Zealand figs offer a touch of honeyed sweetness alongside their rich flavor. ", category: "new", productDetail: [{size: "Pack of 4", countrySrc: "New Zealand"}] },
  //   { productId: '14', name: "PEACH", quantity: 1, price: 14.99, imgMainSrc: ["peach-main.png", "peach-hover.png"] , imgsSrc:["peach.jpg", "peach2.jpg", "peach3.jpg", "peach4.jpg"], description: "Australian sunshine captured in every bite! These peaches, grown and hand-picked in the warm embrace of Australian orchards.", category: "new", productDetail: [{size: "1 Kg", countrySrc: "Australia"}] },
  //   { productId: '15' ,name: "MANGO", quantity: 1, price: 6, imgMainSrc: ["mango-main.png", "mango-hover.png"], imgsSrc:["mango.jpg", "mango2.jpg", "mango3.jpg", "mango4.jpg", "mango5.jpg"], description: "Indulge in the king of fruits with our mangoes sourced directly from Cebu, Philippines! These Cebu mangoes are renowned for their intense sweetness, vibrant golden flesh, and smooth, edible skin.", category: "new", productDetail: [{size: "Each", countrySrc: "Philippines"}]  },
  //   { productId: '16', name: "COCONUT", quantity: 1, price: 45, imgMainSrc: ["coconut-main.png", "coconut-hover.png"], imgsSrc:["coconut.jpg", "coconut2.jpg", "coconut3.jpg", "coconut4.jpg", "coconut5.jpg", "coconut6.jpg"], description: "Cultivated on the lush islands of Indonesia, these coconuts are known for their exceptional quality and unmatched freshness.", category: "new", productDetail: [{size: "Pack of 6", countrySrc: "Indonesia"}] },
  //   { productId: '17', name: "AVOCADO", quantity: 1, price: 10, imgMainSrc: ["avocado-main.png", "avocado-hover.png"], imgsSrc:["avocado.jpg", "avocado2.jpg", "avocado3.jpg", "avocado4.jpg", "avocado5.jpg"], description: "Grown and hand-harvested under sunny Australian skies, boast a deep green, pear-shaped form and a luxuriously creamy, buttery flesh.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "Australia"}] },
  //   { productId: '18', name: "BANANNA", quantity: 1, price: 15, imgMainSrc: ["bananna-main.png", "bananna-hover.png"], imgsSrc:["bananna.jpg", "bananna2.jpg", "bananna3.jpg", "bananna4.jpg"], description: "Sourced directly from Jalgaon, India, a region renowned for its GI-certified bananas, these beauties boast a bright yellow exterior and a soft, creamy flesh.  Jalgaon bananas are known for their exceptional sweetness, a result of the ideal growing conditions and the region's rich agricultural heritage.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "India"}] },
  //   { productId: '19', name: "FEIJOA", quantity: 1, price: 8.99, imgMainSrc: ["feijoa-main.png", "feijoa-hover.png"], imgsSrc:["feijoa.jpg", "feijoa2.jpg", "feijoa3.jpg", "feijoa4.jpg", "feijoa5.jpg"], description: "These feijoas, also known as pineapple guavas, are grown under the warm sunshine of New Zealand's Northland region.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "New Zealand"}]},
  //   { productId: '20', name: "GRAPEFRUIT", quantity: 1, price: 7.99, imgMainSrc: ["grapefruit-main.png", "grapefruit-hover.png"], imgsSrc:["grapefruit.jpg", "grapefruit2.jpg", "grapefruit3.jpg", "grapefruit4.jpg", "grapefruit5.jpg"], description: "Our grapefruits are sourced directly from the lush groves of Mexico, the world's fourth-largest producer of this citrus fruit. Mexican grapefruits boast a thick rind and a tangy, bittersweet flavor, perfect for those who enjoy a refreshing and vibrant taste.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "Mexico"}] },
  //   { productId: '21', name: "GRANNY SMITH", quantity: 1, price: 5.40, imgMainSrc: ["greenapple-main.png", "greenapple-hover.png"], imgsSrc:["greenapple.jpg", "greenapple2.jpg", "greenapple3.jpg", "greenapple4.jpg", "greenapple5.jpg"], description: "Popular New Zealand green apple varieties include Granny Smith, known for its bright green skin and intense tartness, and Braeburn, celebrated for its crisp texture and juicy, tangy flavor.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "New Zealand"}]},
  //   { productId: '22', name: "GUAVA", quantity: 1, price: 30, imgMainSrc: ["guava-main.png", "guava-hover.png"], imgsSrc:["guava.jpg", "guava2.jpg", "guava3.jpg", "guava4.jpg"], description: "Our guavas are sourced from the land where they reign supreme, India - the world's leading producer of this delicious fruit.", category: "new", productDetail: [{size: "1 Kg", countrySrc: "India"}] },
  //   { productId: '23', name: "LYCHEE", quantity: 1, price: 45.99, imgMainSrc: ["lychee-main.png", "lychee-hover.png"], imgsSrc:["lychee.jpg", "lychee2.jpg", "lychee3.jpg", "lychee4.jpg", "lychee5.jpg"], description: "Our lychee come directly from China, the birthplace of this unique fruit and the world's largest producer. Cultivated for over 2,000 years, Chinese lychee boast a rough, red outer shell that protects a sweet, floral-scented white flesh.", category: "all-rounder", productDetail: [{size: "300 g", countrySrc: "China"}] },
  //   { productId: '24', name: "HALLABONG", quantity: 1, price: 20, imgMainSrc: ["hallabong-main.png", "hallabong-hover.png"], imgsSrc:["hallabong.jpg", "hallabong2.jpg", "hallabong3.jpg", "hallabong4.jpg", "hallabong5.jpg"], description: "A seedless citrus fruit with a bright orange rind and a juicy, sweet flesh. This Korean hybrid offers a refreshing and slightly tangy taste, perfect for snacking or adding to salads.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "South Korea"}] },
  //   { productId: '25', name: "PINEAPPLE", quantity: 1, price: 8.49, imgMainSrc: ["pineapple-main.png", "pineapple-hover.png"], imgsSrc:["pineapple.jpg", "pineapple2.jpg", "pineapple3.jpg", "pineapple4.jpg", "pineapple5.jpg"], description: "Grown under ideal conditions with a focus on sustainable agriculture, these Costa Rican pineapples are bursting with flavor and juicy goodness.", category: "all-rounder", productDetail: [{size: "Each", countrySrc: "Costa Rica"}] },
  //   { productId: '26', name: "RED APPLE", quantity: 1, price: 6.50, imgMainSrc: ["apple-main.png", "apple-hover.png"], imgsSrc:["apple.jpg", "apple2.jpg", "apple3.jpg", "apple4.jpg", "apple5.jpg"], description: "These vibrant red apples, grown in the crisp air and sunshine of New Zealand orchards.", category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "New Zealand"}]},
  //   { productId: '27', name: "YUZU", quantity: 1, price: 28.20, imgMainSrc: ["yuzu-main.png", "yuzu-hover.png"], imgsSrc:["yuzu.jpg", "yuzu2.jpg", "yuzu3.jpg", "yuzu4.jpg"], description: "Yuzu, a unique fruit native to East Asia, is grown and cherished in Japan.",category: "all-rounder", productDetail: [{size: "1 Kg", countrySrc: "Japan"}] },
  //   { productId: '28', name: "BANORANGE", quantity: 1, price: 30, imgMainSrc: ["banorange-main.png", "banorange-hover.png"], imgsSrc:["banorange.jpg", "banorange2.jpg", "banorange3.jpg", "banorange4.jpg", "banorange5.jpg"], description: "Introducing the Banorange! This exciting new citrus fruit is a unique cross between a banana and an orange.  Boasting a bright orange peel that's easier to peel than a traditional orange, the Banorange reveals a creamy yellow flesh with a subtly sweet and tangy flavor.", category: "gmo", productDetail: [{size: "1 Kg", countrySrc: "New Zealand Lab"}]  },
  //   { productId: '29', name: "GRAPPLE", quantity: 1, price: 20.49, imgMainSrc: ["grapple-main.png", "grapple-hover.png"], imgsSrc:["grapple.jpg", "grapple2.jpg", "grapple3.jpg", "grapple4.jpg", "grapple5.jpg"], description: "Ever wished your apple had a grapey twist? Look no further than the Grapple! This innovative fruit combines the crisp bite of an apple with the juicy sweetness of a grape.", category: "gmo", productDetail: [{size: "1 Kg", countrySrc: "New Zealand Lab"}]  },
  //   { productId: '30', name: "GREEN APPLEFRUIT", quantity: 1, price: 25.90, imgMainSrc: ["green-applefruit-main.png", "green-applefruit-hover.png"], imgsSrc:["green-applefruit.jpg", "green-applefruit2.jpg", "green-applefruit3.jpg", "green-applefruit4.jpg"], description: "Crisp, tart flesh of a green apple balanced by the tangy, slightly bitter notes of a grapefruit.", category: "gmo", productDetail: [{size: "1 Kg", countrySrc: "New Zealand Lab"}] },
  //   { productId: '31', name: "PINEMANGO", quantity: 1, price: 19.50, imgMainSrc: ["pinemango-main.png", "pinemango-hover.png"], imgsSrc:["pinemango.jpg", "pinemango2.jpg", "pinemango3.jpg", "pinemango4.jpg"], description: "The Pinemango is a unique fruit that combines the best of two worlds: pineapple and mango. This exotic hybrid boasts a golden yellow exterior, similar to a pineapple, with a tough, spiky crown. But crack it open, and you'll be surprised! Inside, the Pinemango reveals a vibrant orange flesh, reminiscent of a mango, with a smooth, buttery texture.", category: "gmo", productDetail: [{size: "Each", countrySrc: "New Zealand Lab"}] },
  //   { productId: '32', name: "PINEKIWI", quantity: 1, price: 21.49, imgMainSrc: ["pinekiwi-main.png", "pinekiwi-hover.png"], imgsSrc:["pinekiwi.jpg", "pinekiwi2.jpg", "pinekiwi3.jpg", "pinekiwi4.jpg", "pinekiwi5.jpg", "pinekiwi6.jpg"], description: "The Pinekiwi is an intriguing fruit that merges the sunshine sweetness of pineapple with the vibrant tang of kiwifruit.  This eye-catching fruit boasts a golden yellow exterior similar to a pineapple, complete with a tough, spiky crown. But cut into it, and you'll discover a surprise! Inside, the Pinekiwi hides a vibrant emerald green flesh, speckled with tiny black seeds, much like a kiwifruit.", category: "gmo", productDetail: [{size: "Each", countrySrc: "New Zealand Lab"}] },
  //   { productId: '33', name: "RASPE", quantity: 1, price: 24.50, imgMainSrc: ["raspe-main.png", "raspe-hover.png"], imgsSrc:["raspe.jpg", "raspe2.jpg", "raspe3.jpg", "raspe4.jpg", "raspe5.jpg"], description: "This innovative fruit combines the sweetness and delicate texture of a raspberry with the juicy abundance of a grape. Imagine a cluster of small, round fruits with a vibrant reddish-purple color, similar to a raspberry, but with a slightly plumper form hinting at its grape heritage.", category: "gmo", productDetail: [{size: "500 g", countrySrc: "New Zealand Lab"}] },
  //   { productId: '34', name: "SEEDLESS POMEGRANATE", quantity: 1, price: 15, imgMainSrc: ["pomegranate-main.png", "pomegranate-hover.png"], imgsSrc:["pomegranate.jpg", "pomegranate2.jpg", "pomegranate3.jpg", "pomegranate4.jpg", "pomegranate5.jpg"], description: "Turkish pomegranates are renowned for their exceptional quality, cultivated under ideal sunshine and nurtured by generations of expertise.", category: "gmo", productDetail: [{size: "Each", countrySrc: "New Zealand Lab"}] },
  //   { productId: '35', name: "SQUARE WATERMELON", quantity: 1, price: 40, imgMainSrc: ["square-watermelon-main.png", "square-watermelon-hover.png"], imgsSrc:["square-watermelon.jpg", "square-watermelon2.jpg", "square-watermelon3.jpg", "square-watermelon4.jpg", "square-watermelon5.jpg", "square-watermelon6.jpg"], description: "While the inside boasts the same familiar deep red flesh and sweet, refreshing flavor of a traditional watermelon, the exterior is a delightful surprise.", category: "gmo", productDetail: [{size: "Each", countrySrc: "New Zealand Lab"}] },
  //   { productId: '36', name: "STRAWLEMON", quantity: 1, price: 25, imgMainSrc: ["strawlemon-main.png", "strawlemon-hover.png"], imgsSrc:["strawlemon.jpg", "strawlemon2.jpg", "strawlemon3.jpg", "strawlemon4.jpg", "strawlemon5.jpg"], description: "Sunshine and citrus collide in the Strawlemon! This intriguing hybrid fruit combines the sweetness and juicy texture of a strawberry with the zest and tang of a lemon.", category: "gmo", productDetail: [{size: "1 Kg", countrySrc: "New Zealand Lab"}] }

  // ];

  //const  shopItemArray   = useLoaderData() as IShopItem[];

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(shopItemArray.length / itemsPerPage)
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  useEffect(() => {
    if (shopOption !== "all" && shopOption !== "gmo" && shopOption !== "new") {
      navigate("/shop/all", { replace: true });
    }
    getProductsByCategory();
  }, []);
  useEffect(() => {
    if (shopOption !== "all" && shopOption !== "gmo" && shopOption !== "new") {
      navigate("/shop/all", { replace: true });
    }
    getProductsByCategory();
    setPage(1);
  }, [shopOption]);

  useEffect(() => {
    setNoOfPages(Math.ceil(shopItemArray.length / itemsPerPage));
  }, [shopItemArray]);

  return (
    <div className="shop-container">
      <div
        className={`shop-options-btn-container ${
          !top && "shop-options-btn-container-shadow"
        }`}
      >
        {shopOptionsLinks.map((link: ShopOption, i: number) => {
          return (
            <Link to={`/shop/${link.link}`} key={i}>
              <div className="shop-options-btn-wrapper">
                <div
                  className={`shop-options-btn-img-container ${
                    shopOption === link.link
                      ? "shop-options-btn-img-active"
                      : ""
                  }`}
                >
                  <div className="shop-options-btn-img-wrapper">
                    <img src={`${"/assets/" + link.imgSrc}`} />
                  </div>
                </div>
                <p>{link.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {/* <Outlet context={{shopItemArray} satisfies ShopType}/> */}
      <div className="shop-product-container">
        <h1>
          <span>SHOP /</span> {shopOption?.toUpperCase()}
        </h1>

        <Grid container spacing={3} marginTop={"1rem"} paddingBottom={"7rem"}>
          {shopItemArray
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((item: IProduct) => (
              <Grid item xs={6} sm={4} md={3} key={item.name}>
                <Link
                  to={`/shop/product/detail/${item.name.toLowerCase()}`}
                  state={{ productItem: item }}
                >
                  <div className="shop-product-item-container">
                    <div className="shop-product-item-img-wrapper">
                      <img
                        className="shop-product-img-hover"
                        loading="lazy"
                        src={`${"/assets/" + item.imgMainSrc[1]}`}
                        alt={item.name}
                        width="auto"
                        height="auto"
                      />
                      <img
                        className="shop-product-img-main"
                        loading="lazy"
                        src={`${"/assets/" + item.imgMainSrc[0]}`}
                        alt={item.name + " hover"}
                        width="auto"
                        height="auto"
                      />
                    </div>
                    <p className="shop-product-item-name">{item.name}</p>
                    <p>${Number(item.price).toFixed(2)}</p>
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
