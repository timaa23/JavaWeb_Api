import {
  IProductImageState,
  IProductState,
  ProductActionTypes,
  ProductImageActionTypes,
} from "./types";

const initialStateProduct: IProductState = {
  _product: { id: 0, name: "", description: "", price: 0, categoryId: 0 },
};

const initialStateProductImage: IProductImageState = {
  _images: [],
};

export const productReducer = (
  state = initialStateProduct,
  action: any
): IProductState => {
  switch (action.type) {
    case ProductActionTypes.GET_PRODUCT: {
      return {
        ...state,
        _product: action.payload,
      };
    }
    default:
      return state;
  }
};

export const productImageReducer = (
  state = initialStateProductImage,
  action: any
): IProductImageState => {
  switch (action.type) {
    case ProductImageActionTypes.GET_PRODUCT_IMAGES: {
      return {
        ...state,
        _images: [...action.payload],
      };
    }
    default:
      return state;
  }
};
