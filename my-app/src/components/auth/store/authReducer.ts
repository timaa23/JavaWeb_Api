import { IUserTokenState, UserActionTypes } from "./types";

const initialState: IUserTokenState = {
  token: null,
};

const authReducer = (state = initialState, action: any): IUserTokenState => {
  switch (action.type) {
    case UserActionTypes.LOGIN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case UserActionTypes.REGISTER: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
