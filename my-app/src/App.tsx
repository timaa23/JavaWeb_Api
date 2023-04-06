import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";
import NotFoundPage from "./components/notFound";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import ProductListPage from "./components/product/ProductListPage";
import ProductPage from "./components/product/ProductPage";
import AdminLayout from "./components/containers/admin";
import AdminHome from "./components/admin/home";
import AdminAddCategoryPage from "./components/admin/category/create";
import AdminProductsPage from "./components/admin/product/list";
import AdminAddProductPage from "./components/admin/product/create";
import AdminEditProductPage from "./components/admin/product/edit";
import AdminProductPage from "./components/admin/product/productPage";
import UserPage from "./components/user/userPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />

          <Route path="user" element={<UserPage />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="products/view/:id" element={<ProductPage />} />
          <Route path="products/list/:id" element={<ProductListPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />

          <Route path="products/list" element={<AdminProductsPage />} />
          <Route path="products/view/:id" element={<AdminProductPage />} />
          <Route path="products/create" element={<AdminAddProductPage />} />
          <Route path="products/edit/:id" element={<AdminEditProductPage />} />

          <Route path="category/create" element={<AdminAddCategoryPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
