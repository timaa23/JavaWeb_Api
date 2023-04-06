import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import http from "../../../http_common";
import {
  AuthActions,
  AuthActionTypes,
  IAuthResponse,
  IGoogleLoginCredentials,
  ILoginCredentials,
  IRegisterCredentials,
  IRegisterValidate,
  IUser,
} from "./types";
import setAuthToken from "../../../helpers/setAuthToken";

export const Login =
  (model: ILoginCredentials) => async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: AuthActionTypes.LOGIN_USER });

      const resp = await http.post<IAuthResponse>(`/account/login`, model);

      const { data } = resp;
      setAuthUserByToken(
        AuthActionTypes.LOGIN_USER_SUCCES,
        data.token,
        dispatch
      );

      console.log(resp);

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: AuthActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };

export const Register =
  (model: IRegisterValidate, reCaptchaToken: string) =>
  async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: AuthActionTypes.REGISTER_USER });

      var registerModel: IRegisterCredentials = {
        email: model.email,
        firstname: model.firstname,
        lastname: model.lastname,
        password: model.password,
        phone: model.phone,
        reCaptchaToken: reCaptchaToken,
      };

      const resp = await http.post<IAuthResponse>(
        `/account/register`,
        registerModel
      );

      const { data } = resp;
      setAuthUserByToken(
        AuthActionTypes.REGISTER_USER_SUCCES,
        data.token,
        dispatch
      );

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: AuthActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };

export const GoogleAuth =
  (model: IGoogleLoginCredentials) =>
  async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: AuthActionTypes.GOOGLE_LOGIN_USER });

      const resp = await http.post<IAuthResponse>(
        `/account/google-auth`,
        model
      );

      const { data } = resp;
      setAuthUserByToken(
        AuthActionTypes.GOOGLE_LOGIN_USER_SUCCES,
        data.token,
        dispatch
      );

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: AuthActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };

export const Logout = () => async (dispatch: Dispatch<AuthActions>) => {
  try {
    dispatch({
      type: AuthActionTypes.LOGOUT_USER,
    });

    dispatch({
      type: AuthActionTypes.LOGOUT_USER_SUCCES,
      payload: {
        isAuth: false,
        loading: false,
        user: undefined,
      },
    });

    localStorage.removeItem("token");

    return Promise.resolve("succes");
  } catch (error) {
    dispatch({ type: AuthActionTypes.ERROR_REQUEST });
    return Promise.reject(error);
  }
};

export const setAuthUserByToken = (
  authType: AuthActionTypes,
  token: string,
  dispatch: Dispatch<any>
) => {
  setAuthToken(token);

  const user: IUser = jwtDecode(token);
  dispatch({
    type: authType,
    payload: {
      isAuth: true,
      loading: false,
      user: user,
    },
  });
};
