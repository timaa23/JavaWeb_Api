import { IProductListState, ProductListActionTypes } from "./types";

const initialState: IProductListState = {
  list: [],
};

export const productListReducer = (
  state = initialState,
  action: any
): IProductListState => {
  switch (action.type) {
    case ProductListActionTypes.PRODUCT_LIST: {
      return {
        ...state,
        list: [...action.payload],
      };
    }
    default:
      return state;
  }
};
