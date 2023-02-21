import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} /> */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
