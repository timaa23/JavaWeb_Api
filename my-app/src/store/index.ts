import { combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../components/auth/store/authReducer";
import categoryRootReducer from "../components/category/store/categoryReducer";
import productRootReducer from "../components/product/store/productReducer";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  category: categoryRootReducer,
  product: productRootReducer,
  user: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk],
});
