import React, { useState } from "react";
import { PiUserLight, PiHeart } from "react-icons/pi";
import { TfiSearch, TfiClose } from "react-icons/tfi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoIosArrowBack } from "react-icons/io";

import CounterButton from "./CounterButton";
import { useDisableBodyScroll } from "../hooks/useDisableBodyScroll";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/IUser";
import Sidebar from "./Sidebar";
import { IShoppingCartItem } from "../interfaces/IShop";
import ShoppingDrawer from "./ShoppingDrawer";
import LoginDrawer from "./LoginDrawer";

interface NavbarProps {
  isSignedOn: boolean;
}
const Navbar = (props: NavbarProps) => {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const [openShopOptions, setOpenShopOptions] = useState(false);
  const [openShoppingBagDrawer, setOpenShoppingBagDrawer] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const navMenuLinks_t = ["Home", "Seasonal", "Shop"];
  const navMenuLinks_b = ["About", "Account"];

  const navigate = useNavigate();
  useDisableBodyScroll(openShoppingBagDrawer);



  const shoppingCartArray: IShoppingCartItem[] = [
    { name: "LEMON", quantity: 1, price: 40, imgSrc: "lemon-main.png" },
    { name: "KIWIFRUIT", quantity: 1, price: 45, imgSrc: "kiwifruit-main.png" },
    { name: "HONEYDEW", quantity: 1, price: 50, imgSrc: "honeydew-main.png" },
    { name: "HONEYDEW", quantity: 1, price: 50, imgSrc: "honeydew-main.png" },
    { name: "HONEYDEW", quantity: 1, price: 50, imgSrc: "honeydew-main.png" },
  ];

  const openShopMenu_Link = (link: string) => {
    if (link === "Shop") {
      setOpenShopOptions(!openShopOptions);
      return;
    }
    setOpenNavMenu(false);
  };

  const clickedOutsideSearchRef = useOutsideClick(() => {
    if (openSearchBar) {
      setOpenSearchBar(false);
    }
  });
  const clickedOutsideUserRef = useOutsideClick(() => {
    if (openLoginDrawer) {
      setOpenLoginDrawer(false);
    }
  });
  const clickedOutsideShoppingRef = useOutsideClick(() => {
    if (openShoppingBagDrawer) {
      setOpenShoppingBagDrawer(false);
    }
  });

  const clickedOutsideSidebarRef = useOutsideClick(() => {
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
          <Link to="/shop/all" onClick={() => setOpenNavMenu(false)}>SHOP</Link>
          <Link to="/about" onClick={() => setOpenNavMenu(false)}>ABOUT</Link>
        </div>
      </div>

      <div className="nav-name-container">
        <Link to="/" onClick={() => setOpenNavMenu(false)}>The Verdant Grove</Link>
      </div>
      <div className="nav-r-icons-container">
        <TfiSearch
          className="nav-r-search-icon"
          onClick={() => setOpenSearchBar(true)}
        />

        <PiUserLight
          className="nav-r-icon"
          onClick={() => setOpenLoginDrawer(true)}
        />
        <LiaShoppingBagSolid
          className="nav-r-icon"
          onClick={() => setOpenShoppingBagDrawer(true)}
        />
      </div>

      <Sidebar openNavMenu={openNavMenu} isSignedOn={props.isSignedOn} openShopOptions={openShopOptions} openShopMenu_Link={openShopMenu_Link} />



      <div
        className={`nav-r-shopping-drawer-bg-overlay ${
          openShoppingBagDrawer || openLoginDrawer
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
          onSubmit={() => navigate("/product/search")}
        >
          <input type="text" placeholder="SEARCH FOR SOMETHING..." />
          <button>SEARCH</button>
        </form>
      </div>

      <LoginDrawer clickedOutsideUserRef={clickedOutsideUserRef} openLoginDrawer={openLoginDrawer} setOpenLoginDrawer={setOpenLoginDrawer}/>

      <ShoppingDrawer clickedOutsideShoppingRef={clickedOutsideShoppingRef} openShoppingBagDrawer={openShoppingBagDrawer} setOpenShoppingBagDrawer={setOpenShoppingBagDrawer} shoppingCartArray={shoppingCartArray}/>

    </nav>
  );
};

export default Navbar;
