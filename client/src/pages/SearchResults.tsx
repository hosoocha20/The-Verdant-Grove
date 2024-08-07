import React, { useEffect, useState } from "react";
import { Link, SetURLSearchParams, useOutletContext } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { TfiSearch } from "react-icons/tfi";

import { IProduct } from "../interfaces/IShop";

const SearchResults = () => {
  const {
    searchResult,
    searchParams,
    setSearchParams,
  }: {
    searchResult: string;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
  } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("keyword")?.trim() || ""
  );
  const [thisSearchResult, setThisSearchResult] = useState(searchResult || "");
  const [shopItemArray, setShopItemArray] = useState<IProduct[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(
    Math.ceil(shopItemArray.length / itemsPerPage)
  );

  const [fetching, setFetching] = useState(true);

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

  const searchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ keyword: thisSearchResult.trim() });
  };

  const getSearchedProducts = async () => {
    let response;
    setFetching(true);
    setShopItemArray([]);

    try {
      response = await axios.get(
        `${import.meta.env.VITE_SERVERURL}/products/search/${searchParams
          .get("keyword")
          ?.trim()}`
      );
      const json = await response.data;
      //console.log(json);
      setShopItemArray(json);
      setNoOfPages(Math.ceil(json.length / itemsPerPage));
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    setSearchQuery(searchParams.get("keyword")?.trim() || "");
    setThisSearchResult(searchParams.get("keyword")?.trim() || "");
    getSearchedProducts();
    setPage(1);
  }, [searchParams]);
  useEffect(() => {
    getSearchedProducts();

    setPage(1);
  }, [searchQuery]);

  useEffect(() => {
    getSearchedProducts();
  }, []);

  return (
    <div className="searchResults-container">
      <div className="searchResults-searchbar-container">
        <TfiSearch />
        <form
          className="searchResults-searchbar-form"
          onSubmit={(e) => searchFormSubmit(e)}
        >
          <input
            type="text"
            placeholder="SEARCH FOR SOMETHING..."
            value={thisSearchResult}
            onChange={(e) => setThisSearchResult(e.target.value)}
          />
          <button>Search</button>
        </form>
      </div>
      <div className="searchResults-results-container">
        {!fetching ? (
          <p>
            {shopItemArray.length
              ? `Results: ${shopItemArray.length} items`
              : "No results were found."}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {shopItemArray.length !== 0 && (
        <div className={`searchResults-product-container`}>
          <Grid container spacing={3} marginTop={"1rem"} paddingBottom={"7rem"}>
            {shopItemArray
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((item: IProduct) => (
                <Grid item xs={6} sm={4} md={3} key={item.name}>
                  <Link
                    to={`/shop/product/detail/${item.name.toLowerCase()}`}
                    state={{ productItem: item }}
                  >
                    <div className="searchResults-product-item-container">
                      <div className="searchResults-product-item-img-wrapper">
                        <img
                          className="searchResults-product-img-main"
                          loading="lazy"
                          src={`${"/assets/" + item.imgMainSrc[0]}`}
                          alt={item.name + " hover"}
                          width="auto"
                          height="auto"
                        />
                        <img
                          className="searchResults-product-img-hover"
                          loading="lazy"
                          src={`${"/assets/" + item.imgMainSrc[1]}`}
                          alt={item.name}
                          width="auto"
                          height="auto"
                        />
                      </div>
                      <p className="searchResults-product-item-name">
                        {item.name}
                      </p>
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

      {fetching && (
        <div className={`searchResults-product-container`}>
          <Grid container spacing={3} marginTop={"1rem"} paddingBottom={"7rem"}>
            {[...Array(4).keys()].map((key) => (
              <Grid item xs={6} sm={4} md={3} key={key}>
                <div className="searchResults-product-item-container searchResults-product-item-placeholder pulsate">
                  <div className="searchResults-product-item-img-wrapper "></div>
                  <p className="searchResults-product-item-name"></p>
                  <p></p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
