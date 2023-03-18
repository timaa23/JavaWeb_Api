import { combineReducers } from "redux";
import {
  CategoryActions,
  CategoryActionTypes,
  ICategoryListState,
  ICategoryState,
} from "./types";

const initialStateList: ICategoryListState = {
  list: [],
  loading: false,
};

const initialState: ICategoryState = {
  category: { id: 0, description: "", name: "", image: "" },
  loading: false,
};

const categoryReducer = (
  state = initialState,
  action: CategoryActions
): ICategoryState => {
  switch (action.type) {
    case CategoryActionTypes.START_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CategoryActionTypes.CATEGORY_GET: {
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

const categoryListReducer = (
  state = initialStateList,
  action: CategoryActions
): ICategoryListState => {
  switch (action.type) {
    case CategoryActionTypes.START_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CategoryActionTypes.CATEGORY_GET: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case CategoryActionTypes.CATEGORY_LIST: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case CategoryActionTypes.CATEGORY_CREATE: {
      return {
        ...state,
        loading: false,
      };
    }
    case CategoryActionTypes.CATEGORY_DELETE: {
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

const categoryRootReducer = combineReducers({
  category: categoryReducer,
  categoryList: categoryListReducer,
});

export default categoryRootReducer;
