import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../components/category/store/categoryReducer";
import {
  productImageReducer,
  productListReducer,
  productReducer,
} from "../components/product/store/productReducer";

export const rootReducer = combineReducers({
  category: categoryReducer,
  productList: productListReducer,
  product: productReducer,
  productImages: productImageReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
