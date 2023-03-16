import {
  IProductListState,
  IProductState,
  ProductActions,
  ProductActionTypes,
  ProductListActions,
} from "./types";

const initialState: IProductListState = {
  list: [],
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
};

export const productListReducer = (
  state = initialState,
  action: ProductListActions
): IProductListState => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCT_LIST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export const productReducer = (
  state = initialStateProduct,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ProductActionTypes.PRODUCT_CREATE: {
      return {
        ...state,
      };
    }
    case ProductActionTypes.PRODUCT_EDIT: {
      return {
        ...state,
      };
    }
    case ProductActionTypes.PRODUCT_DELETE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
