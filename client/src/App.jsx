import "bulma/css/bulma.min.css";
import "bulma-switch";
import React from "react";
import { Route, Routes } from "react-router-dom";
// Contexts
import ProductsProvider from "./context/Products";
import UserAuthProvider from "./context/UserAuth";
// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import ProductInfoPage from "./pages/Products/ProductInfoPage";
import ProductsPage from "./pages/Products/ProductsPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <UserAuthProvider>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products">
            <Route index element={<ProductsPage />} />
            <Route path=":productId" element={<ProductInfoPage />} />
          </Route>
        </Routes>
      </ProductsProvider>
    </UserAuthProvider>
  );
}

export default App;
