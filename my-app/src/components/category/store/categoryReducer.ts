import { CategoryActions, CategoryActionTypes, ICategoryState } from "./types";

const initialState: ICategoryState = {
  list: [],
};

export const categoryReducer = (
  state = initialState,
  action: CategoryActions
): ICategoryState => {
  switch (action.type) {
    case CategoryActionTypes.CATEGORY_LIST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CategoryActionTypes.CATEGORY_CREATE: {
      return {
        ...state,
      };
    }
    case CategoryActionTypes.CATEGORY_DELETE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
