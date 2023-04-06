import { Dispatch } from "react";
import http from "../../../http_common";
import {
  AuthActions,
  AuthActionTypes,
  IAuthResponse,
} from "../../auth/store/types";
import { IChangeUserImage } from "./types";
import { setAuthUserByToken } from "../../auth/store/actions";

export const ChangeUserImage =
  (model: IChangeUserImage) => async (dispatch: Dispatch<AuthActions>) => {
    try {
      dispatch({ type: AuthActionTypes.USER_CHANGE_IMAGE });

      const resp = await http.post<IAuthResponse>(
        `/account/change-image`,
        model,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { data } = resp;
      setAuthUserByToken(
        AuthActionTypes.USER_CHANGE_IMAGE_SUCCES,
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
