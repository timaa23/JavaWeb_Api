import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";
import NotFoundPage from "./components/notFound";
import AddCategoryPage from "./components/category/addCategory";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import ProductListPage from "./components/product/ProductListPage";
import ProductPage from "./components/product/ProductPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="category/create" element={<AddCategoryPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
