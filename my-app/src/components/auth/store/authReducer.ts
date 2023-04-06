import { AuthActionTypes, AuthActions, IAuthUser } from "./types";

const initialState: IAuthUser = {
  isAuth: false,
  loading: false,
};

const authReducer = (state = initialState, action: AuthActions): IAuthUser => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.REGISTER_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.GOOGLE_LOGIN_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.LOGOUT_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.USER_CHANGE_IMAGE: {
      return {
        ...state,
        loading: true,
      };
    }

    case AuthActionTypes.LOGIN_USER_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.REGISTER_USER_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.GOOGLE_LOGIN_USER_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.LOGOUT_USER_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.USER_CHANGE_IMAGE_SUCCES: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }

    case AuthActionTypes.ERROR_REQUEST: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
