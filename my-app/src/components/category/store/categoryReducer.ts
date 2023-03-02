import { CategoryActionTypes, ICategoryState } from "./types";

const initialState: ICategoryState = {
  list: [],
};

export const categoryReducer = (
  state = initialState,
  action: any
): ICategoryState => {
  switch (action.type) {
    case CategoryActionTypes.CATEGORY_LIST: {
      return {
        ...state,
        list: [...action.payload],
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
        list: [...action.payload],
      };
    }
    default:
      return state;
  }
};
