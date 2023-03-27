import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "../components/auth/store/authReducer";
import categoryRootReducer from "../components/category/store/categoryReducer";
import productRootReducer from "../components/product/store/productReducer";

export const rootReducer = combineReducers({
  category: categoryRootReducer,
  product: productRootReducer,
  user: authReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
