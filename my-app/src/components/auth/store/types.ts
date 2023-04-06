export interface ILoginCredentials {
  email: string;
  password: string;
  reCaptchaToken: string;
}

export interface IRegisterCredentials {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  reCaptchaToken: string;
}

export interface IRegisterValidate {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}

export interface IGoogleLoginCredentials {
  token: string;
  reCaptchaToken: string;
}

export interface IAuthResponse {
  token: string;
}

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  image: string;
  roles: Array<string>;
}

export interface IAuthUser {
  isAuth: boolean;
  user?: IUser;
  loading: boolean;
}

export enum AuthActionTypes {
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  GOOGLE_LOGIN_USER = "GOOGLE_LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  USER_CHANGE_IMAGE = "USER_CHANGE_IMAGE",

  LOGIN_USER_SUCCES = "LOGIN_USER_SUCCES",
  REGISTER_USER_SUCCES = "REGISTER_USER_SUCCES",
  GOOGLE_LOGIN_USER_SUCCES = "GOOGLE_LOGIN_USER_SUCCES",
  LOGOUT_USER_SUCCES = "LOGOUT_USER_SUCCES",
  USER_CHANGE_IMAGE_SUCCES = "USER_CHANGE_IMAGE_SUCCES",

  ERROR_REQUEST = "ERROR_REQUEST",
}

export interface LoginUserAction {
  type: AuthActionTypes.LOGIN_USER;
}
export interface RegisternUserAction {
  type: AuthActionTypes.REGISTER_USER;
}
export interface GoogleLoginUserAction {
  type: AuthActionTypes.GOOGLE_LOGIN_USER;
}
export interface LogutUserAction {
  type: AuthActionTypes.LOGOUT_USER;
}
export interface UserChangeImageAction {
  type: AuthActionTypes.USER_CHANGE_IMAGE;
}

export interface LoginUserSuccesAction {
  type: AuthActionTypes.LOGIN_USER_SUCCES;
  payload: IAuthUser;
}
export interface RegisternUserSuccesAction {
  type: AuthActionTypes.REGISTER_USER_SUCCES;
  payload: IAuthUser;
}
export interface GoogleLoginUserSuccesAction {
  type: AuthActionTypes.GOOGLE_LOGIN_USER_SUCCES;
  payload: IAuthUser;
}
export interface LogutUserSuccesAction {
  type: AuthActionTypes.LOGOUT_USER_SUCCES;
  payload: IAuthUser;
}
export interface UserChangeImageSuccesAction {
  type: AuthActionTypes.USER_CHANGE_IMAGE_SUCCES;
  payload: IAuthUser;
}

export interface ErrorRequestAction {
  type: AuthActionTypes.ERROR_REQUEST;
}

export type AuthActions =
  | LoginUserAction
  | RegisternUserAction
  | GoogleLoginUserAction
  | LogutUserAction
  | UserChangeImageAction
  | LoginUserSuccesAction
  | RegisternUserSuccesAction
  | GoogleLoginUserSuccesAction
  | LogutUserSuccesAction
  | UserChangeImageSuccesAction
  | ErrorRequestAction;
