export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUserTokenItem {
  token: string | null;
}

export interface IUserTokenState {
  token: IUserTokenItem;
  loading: boolean;
}

export enum AuthActionTypes {
  START_REQUEST = "START_REQUEST",
  ERROR_REQUEST = "ERROR_REQUEST",
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export interface StartRequestAction {
  type: AuthActionTypes.START_REQUEST;
}
export interface ErrorRequestAction {
  type: AuthActionTypes.ERROR_REQUEST;
}

export interface LoginAction {
  type: AuthActionTypes.LOGIN;
  payload: IUserTokenState;
}
export interface RegisterAction {
  type: AuthActionTypes.REGISTER;
  payload: IUserTokenState;
}

export type AuthActions =
  | StartRequestAction
  | ErrorRequestAction
  | LoginAction
  | RegisterAction;
