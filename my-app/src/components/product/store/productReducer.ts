import { combineReducers } from "redux";
import {
  IProductListState,
  IProductState,
  ProductActions,
  ProductActionTypes,
  ProductListActions,
} from "./types";

const initialState: IProductListState = {
  list: [],
  loading: false,
};

const initialStateProduct: IProductState = {
  product: {
    id: 0,
    name: "",
    description: "",
    images: [],
    price: 0,
    categoryId: 0,
  },
  loading: false,
};

const productListReducer = (
  state = initialState,
  action: ProductListActions
): IProductListState => {
  switch (action.type) {
    case ProductActionTypes.START_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionTypes.GET_PRODUCT_LIST: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};

const productReducer = (
  state = initialStateProduct,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.START_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionTypes.GET_PRODUCT: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.PRODUCT_CREATE: {
      return {
        ...state,
        loading: false,
      };
    }
    case ProductActionTypes.PRODUCT_EDIT: {
      return {
        ...state,
        loading: false,
      };
    }
    case ProductActionTypes.PRODUCT_DELETE: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

const productRootReducer = combineReducers({
  product: productReducer,
  productList: productListReducer,
});

export default productRootReducer;
