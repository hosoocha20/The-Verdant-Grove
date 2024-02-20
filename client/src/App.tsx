import { useState } from "react";


import "./styles/App.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  const [openPage, setOpenPage] = useState("Home");

  // interface RouteCommon {
  //   loader?: LoaderFunction;
  //   action?: ActionFunction;
  //   ErrorBoundary?: React.ComponentType<any>;
  // }
  
  // interface IRoute extends RouteCommon{
  //   path: string;
  //   Element: React.ComponentType<any>;
  // }
  
  // interface Pages {
  //   [key: string]: {
  //     default: React.ComponentType<any>;
  //   } & RouteCommon
  // }
  
  // const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
  
  // const routes: IRoute[] = [];
  // for (const path of Object.keys(pages)) {
  //   const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  //   if (!fileName) {
  //     continue;
  //   }
  
  //   const normalizedPathName = fileName.includes("$")
  //     ? fileName.replace("$", ":")
  //     : fileName.replace(/\/HomeCollection/, "");
  
  //   routes.push({
  //     path: fileName === "HomeCollection" ? "/" : `/${normalizedPathName.toLowerCase()}`,
  //     Element: pages[path].default,
  //     loader: pages[path]?.loader as LoaderFunction | undefined,
  //     action: pages[path]?.action as ActionFunction | undefined,
  //     ErrorBoundary: pages[path]?.ErrorBoundary,
  //   });
  // }
  // const router = createBrowserRouter(
  //   routes.map(({ Element, ErrorBoundary, ...rest }) => ({
  //     ...rest,
  //     element: <Element />,
  //     ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  //   }))
  // );
  
  return (
    <div className="App">
      <Navbar />
      {openPage === "Home" && (
        <>
          <Home />
        </>
      )}
      {openPage === "Shop/All" && <Shop />}

      {openPage === "Product" && <Product />}

      {openPage === "About" && <About />}

      <Footer />
    </div>
  );
}

export default App;
