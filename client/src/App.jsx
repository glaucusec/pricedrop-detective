import "bulma/css/bulma.min.css";
import "bulma-switch";
import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
// Contexts
import ProductsProvider from "./context/Products";
import { UserContext } from "./context/UserAuth";
// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import ProductInfoPage from "./pages/Products/ProductInfoPage";
import ProductsPage from "./pages/Products/ProductsPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const authCtx = useContext(UserContext);
  const isLoggedin = !!authCtx.user.id;

  return (
    <ProductsProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isLoggedin ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/products">
          <Route
            index
            element={isLoggedin ? <ProductsPage /> : <Navigate to={"/login"} />}
          />
          <Route path=":productId" element={<ProductInfoPage />} />
        </Route>
      </Routes>
    </ProductsProvider>
  );
}

export default App;
