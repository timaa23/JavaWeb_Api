import { AuthActions, IUserTokenState, AuthActionTypes } from "./types";

const initialState: IUserTokenState = {
  token: { token: null },
  loading: false,
};

const authReducer = (
  state = initialState,
  action: AuthActions
): IUserTokenState => {
  switch (action.type) {
    case AuthActionTypes.START_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case AuthActionTypes.ERROR_REQUEST: {
      return {
        ...state,
        loading: false,
      };
    }
    case AuthActionTypes.LOGIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case AuthActionTypes.REGISTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
