import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryReducer } from "../components/category/store/categoryReducer";
import {
  productListReducer,
  productReducer,
} from "../components/product/store/productReducer";

export const rootReducer = combineReducers({
  category: categoryReducer,
  productList: productListReducer,
  product: productReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
