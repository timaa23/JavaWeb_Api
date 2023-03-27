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

export interface IUserTokenState {
  token: string | null;
}

export enum UserActionTypes {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}
