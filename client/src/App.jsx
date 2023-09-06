import "bulma/css/bulma.min.css";
import "bulma-switch";
import React from "react";
import { Route, Routes } from "react-router-dom";
// Contexts
import ProductsProvider from "./context/Products";
// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import ProductInfoPage from "./pages/Products/ProductInfoPage";
import ProductsPage from "./pages/Products/ProductsPage";

function App() {
  return (
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products">
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductInfoPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  );
}

export default App;
