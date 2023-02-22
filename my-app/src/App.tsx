import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";
import NotFoundPage from "./components/notFound";
import AddCategoryPage from "./components/addCategory";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="add" element={<AddCategoryPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
