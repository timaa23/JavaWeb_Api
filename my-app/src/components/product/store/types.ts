export interface IProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  images: Array<IProductImageItem>;
  categoryId: number;
}

export interface IProductCreate {
  name: string;
  price: number;
  description: string;
  images: Array<File>;
  categoryId: number;
}

export interface IProductEdit {
  name: string;
  price: number;
  description: string;
  removeFiles: Array<string>;
  files: Array<File>;
  categoryId: number;
}

export interface IProductImageItem {
  id: number;
  name: string;
}

export interface IProductState {
  product: IProductItem;
  loading: boolean;
}

export interface IProductListState {
  list: Array<IProductItem>;
  loading: boolean;
}

export enum ProductActionTypes {
  PRODUCT_GET = "PRODUCT_GET",
  PRODUCT_LIST_GET = "PRODUCT_LIST_GET",
  PRODUCT_ALL_LIST_GET = "PRODUCT_ALL_LIST_GET",
  PRODUCT_CREATE = "PRODUCT_CREATE",
  PRODUCT_EDIT = "PRODUCT_EDIT",
  PRODUCT_DELETE = "PRODUCT_DELETE",

  PRODUCT_GET_SUCCES = "PRODUCT_GET_SUCCES",
  PRODUCT_LIST_GET_SUCCES = "PRODUCT_LIST_GET_SUCCES",
  PRODUCT_ALL_LIST_GET_SUCCES = "PRODUCT_ALL_LIST_GET_SUCCES",
  PRODUCT_CREATE_SUCCES = "PRODUCT_CREATE_SUCCES",
  PRODUCT_EDIT_SUCCES = "PRODUCT_EDIT_SUCCES",
  PRODUCT_DELETE_SUCCES = "PRODUCT_DELETE_SUCCES",

  ERROR_REQUEST = "ERROR_REQUEST",
}

export interface ProductGetAction {
  type: ProductActionTypes.PRODUCT_GET;
}
export interface ProductListGetAction {
  type: ProductActionTypes.PRODUCT_LIST_GET;
}
export interface ProductAllListGetAction {
  type: ProductActionTypes.PRODUCT_ALL_LIST_GET;
}
export interface ProductCreateAction {
  type: ProductActionTypes.PRODUCT_CREATE;
}
export interface ProductEditAction {
  type: ProductActionTypes.PRODUCT_EDIT;
}
export interface ProductDeleteAction {
  type: ProductActionTypes.PRODUCT_DELETE;
}

export interface ProductGetSuccesAction {
  type: ProductActionTypes.PRODUCT_GET_SUCCES;
  payload: IProductState;
}
export interface ProductListGetSuccesAction {
  type: ProductActionTypes.PRODUCT_LIST_GET_SUCCES;
  payload: IProductListState;
}
export interface ProductAllListGetSuccesAction {
  type: ProductActionTypes.PRODUCT_ALL_LIST_GET_SUCCES;
  payload: IProductListState;
}
export interface ProductCreateSuccesAction {
  type: ProductActionTypes.PRODUCT_CREATE_SUCCES;
  payload: IProductState;
}
export interface ProductEditSuccesAction {
  type: ProductActionTypes.PRODUCT_EDIT_SUCCES;
  payload: IProductState;
}
export interface ProductDeleteSuccesAction {
  type: ProductActionTypes.PRODUCT_DELETE_SUCCES;
  payload: IProductListState;
}

export interface ErrorRequestAction {
  type: ProductActionTypes.ERROR_REQUEST;
}

export type ProductActions =
  | ProductGetAction
  | ProductListGetAction
  | ProductAllListGetAction
  | ProductCreateAction
  | ProductEditAction
  | ProductDeleteAction
  | ProductGetSuccesAction
  | ProductListGetSuccesAction
  | ProductAllListGetSuccesAction
  | ProductCreateSuccesAction
  | ProductEditSuccesAction
  | ProductDeleteSuccesAction
  | ErrorRequestAction;
