import { combineReducers } from "redux";
import {
  IProductListState,
  IProductState,
  ProductActions,
  ProductActionTypes,
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
  action: ProductActions
): IProductListState => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_LIST_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionTypes.PRODUCT_ALL_LIST_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionTypes.PRODUCT_DELETE: {
      return {
        ...state,
        loading: true,
      };
    }

    case ProductActionTypes.PRODUCT_LIST_GET_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.PRODUCT_ALL_LIST_GET_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.PRODUCT_DELETE_SUCCES: {
      return {
        ...state,
        loading: false,
      };
    }

    case ProductActionTypes.ERROR_REQUEST: {
      return {
        ...state,
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
    case ProductActionTypes.PRODUCT_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionTypes.PRODUCT_CREATE: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductActionTypes.PRODUCT_EDIT: {
      return {
        ...state,
        loading: true,
      };
    }

    case ProductActionTypes.PRODUCT_GET_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case ProductActionTypes.PRODUCT_CREATE_SUCCES: {
      return {
        ...state,
        loading: false,
      };
    }
    case ProductActionTypes.PRODUCT_EDIT_SUCCES: {
      return {
        ...state,
        loading: false,
      };
    }

    case ProductActionTypes.ERROR_REQUEST: {
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
