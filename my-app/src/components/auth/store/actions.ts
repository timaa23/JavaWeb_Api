import { Dispatch } from "react";
import http from "../../../http_common";
import {
  AuthActions,
  AuthActionTypes,
  ILoginCredentials,
  IRegisterCredentials,
  IUserTokenItem,
} from "./types";

export const Login =
  (model: ILoginCredentials) => async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: AuthActionTypes.START_REQUEST });

      const resp = await http.post<IUserTokenItem>(`/account/login`, model);

      const { data } = resp;
      dispatch({
        type: AuthActionTypes.LOGIN,
        payload: { token: { token: data.token }, loading: false },
      });

      localStorage.setItem("token", data.token ?? "");

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: AuthActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };

export const Register =
  (model: IRegisterCredentials) => async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: AuthActionTypes.START_REQUEST });

      const resp = await http.post<IUserTokenItem>(`/account/register`, model);

      const { data } = resp;
      dispatch({
        type: AuthActionTypes.REGISTER,
        payload: { token: { token: data.token }, loading: false },
      });

      localStorage.setItem("token", data.token ?? "");

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: AuthActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };
