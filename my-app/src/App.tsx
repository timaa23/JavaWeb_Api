import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/containers/default";
import Home from "./components/home";
import NotFoundPage from "./components/notFound";
import AddCategoryPage from "./components/category/AddCategory";
import LoginPage from "./components/auth/login";
import RegisterPage from "./components/auth/register";
import ProductListPage from "./components/product/ProductListPage";
import ProductPage from "./components/product/ProductPage";
import AddProductPage from "./components/product/AddProduct";
import EditProductPage from "./components/product/EditProduct";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="category/create" element={<AddCategoryPage />} />

          <Route path="products/view/:id" element={<ProductPage />} />
          <Route path="products/list/:id" element={<ProductListPage />} />
          <Route path="products/create" element={<AddProductPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
