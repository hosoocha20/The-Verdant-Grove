import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/App.scss";
import Navbar from "./components/Navbar";
import HomeCollection from "./components/HomeCollection";
import HomeProducts from "./components/HomeProducts";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import Product from "./components/Product";
import About from "./components/About";

function App() {
  const [openPage, setOpenPage] = useState("About");

  const pages = import.meta.glob("./components/**/*.tsx", { eager: true });

  return (
    <div className="App">
      <Navbar />
      {openPage === "Home" && (
        <>
          <HomeCollection />
          <HomeProducts />
        </>
      )}
      {openPage === "Shop/All" && (
        <Shop />
      )}

      {openPage === "Product" && (
        <Product />
      )}

      {openPage === "About" && (
        <About />
      )}

      <Footer />
    </div>
  );
}

export default App;
