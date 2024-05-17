import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { TfiSearch } from "react-icons/tfi";

const SearchResults = () => {
    const [top, setTop] = useState(true)
    const [searchResultItems, setSearchResultItems] = useState(false);


  
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
        { productId: '27', name: "YUZU", quantity: 1, price: 50, imgMainSrc: ["yuzu-main.png", "yuzu-hover.png"], category: "luxury" }
      ];
    
      const [itemsPerPage, setItemsPerPage] = useState(12);
      const [page, setPage] = useState(1);
      const [noOfPages] = useState(Math.ceil(shopItemArray.length / itemsPerPage));
    
      const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };
  return (
    <div className="searchResults-container">
      <div
        className="searchResults-searchbar-container"
      >
        <TfiSearch />
        <form
          className="searchResults-searchbar-form"
        >
          <input type="text" placeholder="SEARCH FOR SOMETHING..." />
          <button>Search</button>
        </form>
      </div>
      <div className="searchResults-results-container">
        {searchResultItems ? (
            <p>10 results</p>
        )
    :
    (
        <p>No results were found</p>
    )}
        
      </div>
      {searchResultItems && (
        <div className={`searchResults-product-container`}>


        <Grid container spacing={3} marginTop={"1rem"} paddingBottom={"7rem"}>
            {shopItemArray.slice((page - 1) * itemsPerPage, page * itemsPerPage ).map((item: ShopItem) => (
            
                <Grid item xs={6} sm={4} md={3}>
                <Link to={`/product`}>
                <div className="searchResults-product-item-container">
                    <div className="searchResults-product-item-img-wrapper">
                    <img className= "searchResults-product-img-hover" loading="lazy" src={`${"/src/assets/" + item.imgMainSrc[1]}`}  alt={item.name} width="auto" height="auto"/>
                    <img className= "searchResults-product-img-main" loading="lazy" src={`${"/src/assets/" + item.imgMainSrc[0]}`}  alt={item.name + " hover"} width="auto" height="auto"/>
                    </div>
                    <p className="searchResults-product-item-name">{item.name}</p>
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
      )}

    </div>
  );
};

export default SearchResults;
