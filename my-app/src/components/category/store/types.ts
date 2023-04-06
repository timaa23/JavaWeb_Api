export interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  description: string;
}
export interface ICategoryCreate {
  name: string;
  description: string;
  image: File | undefined;
}

export interface ICategoryState {
  category: ICategoryItem;
  loading: boolean;
}
export interface ICategoryListState {
  list: Array<ICategoryItem>;
  loading: boolean;
}

export enum CategoryActionTypes {
  CATEGORY_GET = "CATEGORY_GET",
  CATEGORY_LIST_GET = "CATEGORY_LIST_GET",
  CATEGORY_CREATE = "CATEGORY_CREATE",
  CATEGORY_DELETE = "CATEGORY_DELETE",

  CATEGORY_GET_SUCCES = "CATEGORY_GET_SUCCES",
  CATEGORY_LIST_GET_SUCCES = "CATEGORY_LIST_SUCCES",
  CATEGORY_CREATE_SUCCES = "CATEGORY_CREATE_SUCCES",
  CATEGORY_DELETE_SUCCES = "CATEGORY_DELETE_SUCCES",

  ERROR_REQUEST = "ERROR_REQUEST",
}

export interface CategoryGetAction {
  type: CategoryActionTypes.CATEGORY_GET;
}
export interface CategoryListGetAction {
  type: CategoryActionTypes.CATEGORY_LIST_GET;
}
export interface CategoryCreateAction {
  type: CategoryActionTypes.CATEGORY_CREATE;
}
export interface CategoryDeleteAction {
  type: CategoryActionTypes.CATEGORY_DELETE;
}

export interface CategoryGetSuccesAction {
  type: CategoryActionTypes.CATEGORY_GET_SUCCES;
  payload: ICategoryState;
}
export interface CategoryListGetSuccesAction {
  type: CategoryActionTypes.CATEGORY_LIST_GET_SUCCES;
  payload: ICategoryListState;
}
export interface CategoryCreateSuccesAction {
  type: CategoryActionTypes.CATEGORY_CREATE_SUCCES;
  payload: ICategoryState;
}
export interface CategoryDeleteSuccesAction {
  type: CategoryActionTypes.CATEGORY_DELETE_SUCCES;
  payload: ICategoryListState;
}

export interface ErrorRequestAction {
  type: CategoryActionTypes.ERROR_REQUEST;
}

export type CategoryActions =
  | CategoryGetAction
  | CategoryListGetAction
  | CategoryCreateAction
  | CategoryDeleteAction
  | CategoryGetSuccesAction
  | CategoryListGetSuccesAction
  | CategoryCreateSuccesAction
  | CategoryDeleteSuccesAction
  | ErrorRequestAction;
