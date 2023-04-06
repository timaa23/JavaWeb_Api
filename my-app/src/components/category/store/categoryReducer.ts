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
    case CategoryActionTypes.CATEGORY_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case CategoryActionTypes.CATEGORY_CREATE: {
      return {
        ...state,
        loading: true,
      };
    }

    case CategoryActionTypes.CATEGORY_GET_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case CategoryActionTypes.CATEGORY_CREATE_SUCCES: {
      return {
        ...state,
        loading: false,
      };
    }

    case CategoryActionTypes.ERROR_REQUEST: {
      return {
        ...state,
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
    case CategoryActionTypes.CATEGORY_LIST_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case CategoryActionTypes.CATEGORY_DELETE: {
      return {
        ...state,
        loading: true,
      };
    }

    case CategoryActionTypes.CATEGORY_LIST_GET_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case CategoryActionTypes.CATEGORY_DELETE_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }

    case CategoryActionTypes.ERROR_REQUEST: {
      return {
        ...state,
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
