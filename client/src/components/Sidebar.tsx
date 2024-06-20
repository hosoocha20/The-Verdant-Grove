import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { HiPlus, HiMinus } from "react-icons/hi";

interface SidebarProps{
    authToken : string;
    openNavMenu: boolean;
    openShopOptions: boolean;
    openShopMenu_Link: (link: string) => void;

}

const Sidebar = (props: SidebarProps) => {
    const navigate = useNavigate();
    interface ShopMenuLinks {
        name: string;
        link: string;
      }
    const shopMenuLinks: ShopMenuLinks[] = [
        { name: "New in", link: "new" },
        { name: "GMO", link: "gmo" },
        { name: "All", link: "all" },
      ];
  return (

    <div
    
    className={`nav-l-menu-drawer ${
      props.openNavMenu ? "" : "nav-l-menu-drawer-close"
    }`}
  >
    <div className="nav-l-menu-links-t-container">
      <div
        className="nav-l-menu-links-t-span-text"
        onClick={() => props.openShopMenu_Link("Home")}
      >
        <Link to={`/`} className="nav-l-menu-drawer-link-t">
          Home
        </Link>
      </div>
      <div
        className="nav-l-menu-links-t-span-text"
        onClick={() => props.openShopMenu_Link("Seasonal")}
      >
        <Link to={`/Seasonal`} className="nav-l-menu-drawer-link-t">
          Seasonal
        </Link>
      </div>

      <div
        className="nav-l-menu-links-t-span-text"
        onClick={() => props.openShopMenu_Link("Shop")}
      >
        <p className="nav-l-menu-drawer-text-t">Shop</p>
        <HiPlus
          color={"#969696"}
          className={`${!props.openShopOptions ? "" : "display-none"}`}
        />
        <HiMinus
          color={"#969696"}
          className={`${props.openShopOptions ? "" : "display-none"}`}
        />
      </div>
      <div
        className={`nav-l-menu-links-shop-span ${
          props.openShopOptions ? "" : "display-none"
        }`}
        onClick={() => props.openShopMenu_Link("Shop-links")}
      >
        {shopMenuLinks.map((shopLink: ShopMenuLinks) => {
          return <Link to={`/shop/${shopLink.link}`}>{shopLink.name}</Link>;
        })}
      </div>
    </div>
    <div className="nav-l-menu-links-b-container">
      <Link
        to={`/about`}
        className="nav-l-menu-drawer-link-b"
        onClick={() => props.openShopMenu_Link("About")}
      >
        About
      </Link>
      {props.authToken ? (
        <Link
          to={`/account`}
          className="nav-l-menu-drawer-link-b"
          onClick={() => props.openShopMenu_Link("Account")}
        >
          Account
        </Link>
      ) : (
        <Link
          to={`/register`}
          className="nav-l-menu-drawer-link-b"
          onClick={() => props.openShopMenu_Link("Register")}
        >
          Register
        </Link>
      )}
    </div>
  </div>



  )
}

export default Sidebar