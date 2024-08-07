import React, { useState } from "react";
import { PiUserLight, PiHeart } from "react-icons/pi";
import { TfiSearch, TfiClose } from "react-icons/tfi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useDisableBodyScroll } from "../hooks/useDisableBodyScroll";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { IUser, ILoginUser } from "../interfaces/IUser";
import Sidebar from "./Sidebar";
import { IShoppingCartItem } from "../interfaces/IShop";
import ShoppingDrawer from "./ShoppingDrawer";
import LoginDrawer from "./LoginDrawer";
import AuthLoader from "../uiComponents/AuthLoader"


interface NavbarProps {
  authToken: string;
  checkedAll: boolean;
  handleCheckedAllOnChange: () => void;
  handleCheckedItemOnChange: (product: IShoppingCartItem) => void;
  handleQuantityCounterOnChange: (
    product: IShoppingCartItem,
    val: number
  ) => void;
  handleQuantityValOnChange: (product: IShoppingCartItem, val: number) => void;
  openLoginDrawer: boolean;
  setOpenLoginDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  logIn: (e: React.FormEvent, user: ILoginUser) => void;
  loggingIn: boolean;
  loginErrorMsg: { msg: string };
  setLoginErrorMsg: React.Dispatch<React.SetStateAction<{ msg: string }>>;
  searchResult: string;
  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  shoppingCart: IShoppingCartItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<IShoppingCartItem[]>>;
  openShoppingBagDrawer: boolean;
  setOpenShoppingBagDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  removeShoppingCartItem: (item: IShoppingCartItem) => void;
  removeSelectedShoppingCartItem: () => void;
}
const Navbar = (props: NavbarProps) => {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const [openShopOptions, setOpenShopOptions] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
 

  const navigate = useNavigate();
  useDisableBodyScroll(props.openShoppingBagDrawer);


  const openShopMenu_Link = (link: string) => {
    if (link === "Shop") {
      setOpenShopOptions(!openShopOptions);
      return;
    }
    setOpenNavMenu(false);
  };

  const openSearchBarOnClick = () => {
    setOpenSearchBar(true);
    props.setSearchResult("");
  };

  const clickedOutsideSearchRef = useOutsideClick(() => {
    if (openSearchBar) {
      setOpenSearchBar(false);
    }
  });
  const clickedOutsideUserRef = useOutsideClick(() => {
    if (props.openLoginDrawer) {
      props.setOpenLoginDrawer(false);
    }
  });
  const clickedOutsideShoppingRef = useOutsideClick(() => {
    if (props.openShoppingBagDrawer) {
      props.setOpenShoppingBagDrawer(false);
    }
  });

  const clickedOutsideSidebarRef = useOutsideClick(() => {
    if (openNavMenu) setOpenNavMenu(false);
  });

  const searchFormOnSubmit = (e: React.FormEvent) => {
    setOpenNavMenu(false);
    setOpenSearchBar(false);
    e.preventDefault();
    const params = { keyword: props.searchResult.trim() };
    navigate({
      pathname: `/product/search`,
      search: `?${createSearchParams(params)}`,
    });
  };

  const userOnClick = () => {
    if (props.authToken) {
      navigate("/account");
    } else {
      props.setOpenLoginDrawer(true);
    }
  };

  //on Back button, close drawer
  window.addEventListener("popstate", () => {
    if (openNavMenu) setOpenNavMenu(false);
  });

  return (
    <nav ref={clickedOutsideSidebarRef} className="nav-container">
      <div className="nav-l-container">
        <div
          className={`nav-hamburger ${
            openNavMenu ? "nav-hamburger-active" : ""
          }`}
          onClick={() => setOpenNavMenu(!openNavMenu)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="nav-l-links">
          <Link to="/shop/all" onClick={() => setOpenNavMenu(false)}>
            SHOP
          </Link>
          <Link to="/about" onClick={() => setOpenNavMenu(false)}>
            ABOUT
          </Link>
        </div>
      </div>

      <div className="nav-name-container">
        <Link to="/" onClick={() => setOpenNavMenu(false)}>
          The Verdant Grove
        </Link>
      </div>
      <div className="nav-r-icons-container">
        <TfiSearch
          className="nav-r-search-icon"
          onClick={openSearchBarOnClick}
        />

        <PiUserLight className="nav-r-icon" onClick={userOnClick} />
        <LiaShoppingBagSolid
          className="nav-r-icon"
          onClick={() => props.setOpenShoppingBagDrawer(true)}
        />
      </div>

      <Sidebar
        openNavMenu={openNavMenu}
        authToken={props.authToken}
        openShopOptions={openShopOptions}
        openShopMenu_Link={openShopMenu_Link}
      />

      {/*Background overlays for drawers*/}
      <div
        className={`nav-r-shopping-drawer-bg-overlay ${
          props.openShoppingBagDrawer || props.openLoginDrawer
            ? ""
            : "nav-r-shopping-drawer-bg-close"
        }`}
      ></div>
      <div
        className={`nav-r-searchbar-bg-overlay ${
          openSearchBar ? "" : "nav-r-shopping-drawer-bg-close"
        }`}
      ></div>

      {/*Search Bar*/}
      <div
        ref={clickedOutsideSearchRef}
        className={` ${
          openSearchBar ? "nav-searchbar-container" : "nav-searchbar-close"
        }`}
      >
        <TfiSearch />
        <form
          className="nav-searchbar-form"
          onSubmit={(e) => searchFormOnSubmit(e)}
        >
          <input
            type="text"
            placeholder="SEARCH FOR SOMETHING..."
            value={props.searchResult}
            onChange={(e) => props.setSearchResult(e.target.value)}
          />
          <button>SEARCH</button>
        </form>
      </div>

      {props.loggingIn && <AuthLoader />}
      
      <LoginDrawer
        clickedOutsideUserRef={clickedOutsideUserRef}
        openLoginDrawer={props.openLoginDrawer}
        setOpenLoginDrawer={props.setOpenLoginDrawer}
        logIn={props.logIn}
        loginErrorMsg={props.loginErrorMsg}
        setLoginErrorMsg={props.setLoginErrorMsg}
      />
      

      <ShoppingDrawer
        authToken={props.authToken}
        checkedAll={props.checkedAll}
        handleCheckedAllOnChange={props.handleCheckedAllOnChange}
        handleCheckedItemOnChange={props.handleCheckedItemOnChange}
        handleQuantityCounterOnChange={props.handleQuantityCounterOnChange}
        handleQuantityValOnChange={props.handleQuantityValOnChange}
        clickedOutsideShoppingRef={clickedOutsideShoppingRef}
        openShoppingBagDrawer={props.openShoppingBagDrawer}
        setOpenShoppingBagDrawer={props.setOpenShoppingBagDrawer}
        shoppingCart={props.shoppingCart}
        removeShoppingCartItem={props.removeShoppingCartItem}
        removeSelectedShoppingCartItem={props.removeSelectedShoppingCartItem}
      />
    </nav>
  );
};

export default Navbar;
