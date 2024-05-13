import React, { useState } from "react";
import { PiUserLight, PiHeart } from "react-icons/pi";
import { TfiSearch, TfiClose } from "react-icons/tfi";
import { HiPlus, HiMinus } from "react-icons/hi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoIosArrowBack } from "react-icons/io";
import lemon from "../assets/lemon.png";
import kiwifruit from "../assets/kiwifruit.png";
import honeydew from "../assets/honeydew.png";
import CounterButton from "./CounterButton";
import { useDisableBodyScroll } from "../hooks/useDisableBodyScroll";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const [openShopOptions, setOpenShopOptions] = useState(false);
  const [openShoppingBagDrawer, setOpenShoppingBagDrawer] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openLoginDrawer, setOpenLoginDrawer] = useState(false);
  const navMenuLinks_t = ["Home", "Seasonal", "Shop", "Search"];
  const navMenuLinks_b = ["About", "Account"];
  const shopMenuLinks = ["New in", "Binary x Modify", "All"];

  useDisableBodyScroll(openShoppingBagDrawer);

  interface ShoppingCartItem {
    name: string;
    quantity: number;
    price: number;
    imgSrc: string;
  }

  const shoppingCartArray: ShoppingCartItem[] = [
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

  return (
    <nav className="nav-container">
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
          <Link to="/shop">SHOP</Link>
          <Link to="/about">ABOUT</Link>
        </div>
      </div>

      <div className="nav-name-container">
        <Link to="/">The Verdant Grove</Link>
      </div>
      <div className="nav-r-icons-container">

        <TfiSearch className="nav-r-search-icon" onClick={()=>setOpenSearchBar(true)}/>

        <PiUserLight
          className="nav-r-icon"
          onClick={() => setOpenLoginDrawer(true)}
        />
        <LiaShoppingBagSolid
          className="nav-r-icon"
          onClick={() => setOpenShoppingBagDrawer(true)}
        />
      </div>

      <div
        className={`nav-l-menu-drawer ${
          openNavMenu ? "" : "nav-l-menu-drawer-close"
        }`}
      >
        <div className="nav-l-menu-links-t-container">
          {navMenuLinks_t.map((link: string) => {
            return (
              <>
                <div
                  className="nav-l-menu-links-t-span-text"
                  onClick={() => openShopMenu_Link(link)}
                >
                  {link === "Home" ? (
                    <Link to={`/`} className="nav-l-menu-drawer-link-t">
                      {link}
                    </Link>
                  ) : (
                    <Link
                      to={`/${link[0].toLowerCase() + link.slice(1)}`}
                      className="nav-l-menu-drawer-link-t"
                    >
                      {link}
                    </Link>
                  )}

                  <HiPlus
                    color={"#969696"}
                    className={`${
                      !openShopOptions && link === "Shop" ? "" : "display-none"
                    }`}
                  />
                  <HiMinus
                    color={"#969696"}
                    className={`${
                      openShopOptions && link === "Shop" ? "" : "display-none"
                    }`}
                  />
                </div>
                <div
                  className={`nav-l-menu-links-shop-span ${
                    openShopOptions && link === "Shop" ? "" : "display-none"
                  }`}
                >
                  {shopMenuLinks.map((shopLink: string) => {
                    return <p>{shopLink}</p>;
                  })}
                </div>
              </>
            );
          })}
        </div>
        <div className="nav-l-menu-links-b-container">
          {navMenuLinks_b.map((link: string) => {
            return (
              <Link
                to={`/register`}
                className="nav-l-menu-drawer-link-b"
                onClick={() => openShopMenu_Link(link)}
              >
                {link}
              </Link>
            );
          })}
        </div>
      </div>

      <div
        className={`nav-r-shopping-drawer-bg-overlay ${
          openShoppingBagDrawer || openLoginDrawer 
            ? ""
            : "nav-r-shopping-drawer-bg-close"
        }`}
      ></div>
            <div
        className={`nav-r-searchbar-bg-overlay ${
           openSearchBar
            ? ""
            : "nav-r-shopping-drawer-bg-close"
        }`}
        onClick={()=>setOpenSearchBar(false)}
      ></div>
      <div className={` ${openSearchBar ? "nav-searchbar-container" : "nav-searchbar-close"}`}>
        <TfiSearch />
        <form className="nav-searchbar-form">
          <input type="text" placeholder="SEARCH FOR SOMETHING..."/>
          <button>SEARCH</button>
        </form>
      </div>

      <div
        className={`nav-r-login-drawer ${
          openLoginDrawer ? "" : "nav-r-login-drawer-close"
        }`}
      >
        <div className="shopping-drawer-top">
          <div
            className="shopping-drawer-top-back"
            onClick={() => setOpenLoginDrawer(false)}
          >
            <IoIosArrowBack className="shopping-drawer-back-icon" />
            <p>BACK TO STORE</p>
          </div>
          <TfiClose
            className="shopping-drawer-close-icon"
            onClick={() => setOpenLoginDrawer(false)}
          />
        </div>
        <h1>Log in</h1>
        <form className="login-drawer-form">
          <div className="login-drawer-email-wrapper">
            <input
              type="email"
              id="email-login"
              placeholder="EMAIL"
            />
            <p>EMAIL</p>
          </div>
          <div className="login-drawer-pw-wrapper">
            <input type="password" id="pw-login" placeholder="PASSWORD"/>
            <p>PASSWORD</p>
          </div>
          <button className="login-drawer-login-button">LOG IN</button>
          <div className="login-drawer-signup-wrapper">
            <p>Are you not a member yet?</p>
            <button className="login-drawer-signup-button">SIGN UP</button>
          </div>
        </form>
      </div>

      <div
        className={`nav-r-shopping-drawer ${
          openShoppingBagDrawer ? "" : "nav-r-shopping-drawer-close"
        }`}
      >
        <div className="shopping-drawer-top">
          <div
            className="shopping-drawer-top-back"
            onClick={() => setOpenShoppingBagDrawer(false)}
          >
            <IoIosArrowBack className="shopping-drawer-back-icon" />
            <p>BACK TO STORE</p>
          </div>
          <TfiClose
            className="shopping-drawer-close-icon"
            onClick={() => setOpenShoppingBagDrawer(false)}
          />
        </div>
        <h1>Shopping Bag</h1>
        {shoppingCartArray?.length > 0 ? (
          <>
            <div className="shopping-drawer-select-container">
              <div className="shopping-drawer-select-checkbox-wrapper">
                <input type="checkbox" id="selectBagCheckbox" checked />
                <label htmlFor="selectBagCheckbox">Select All</label>
              </div>
              <p>
                Remove Selected: <span>3 item(s)</span>
              </p>
            </div>
            <div className="shopping-drawer-items-container">
              {shoppingCartArray.map((item: ShoppingCartItem) => {
                return (
                  <div className="shopping-drawer-item-wrapper">
                    <input type="checkbox" id="itemBagCheckbox" checked />
                    <img
                      src={`${"src/assets/" + item.imgSrc}`}
                      id="shopping-item-img"
                    />
                    <div className="shopping-drawer-item-info">
                      <p>{item.name}</p>
                      <CounterButton quantity={item.quantity} />
                      <p>${item.price}</p>
                      <button>Remove</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="nav-r-shopping-drawer-empty">Your cart is empty</div>
        )}

        <div className="shopping-drawer-checkout-container">
          {shoppingCartArray?.length > 0 ? (
            <>
              <div className="shopping-drawer-subtotal-wrapper">
                <p>Subtotal (3 items)</p>
                <p>$100</p>
                <p>Shipping Fee</p>
                <p>$5</p>
              </div>
              <div className="shopping-drawer-total-wrapper">
                <p>Total</p>
                <p>$105</p>
                <p>Includes GST of</p>
                <p>$5.42</p>
              </div>
              <button className="shopping-drawer-checkout-button">
                CHECK OUT
              </button>
            </>
          ) : (
            <button
              className="shopping-drawer-empty-button"
              onClick={() => setOpenShoppingBagDrawer(false)}
            >
              CONTIUE SHOPPING
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
