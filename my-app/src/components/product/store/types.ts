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
  START_REQUEST = "START_REQUEST",
  ERROR_REQUEST = "ERROR_REQUEST",
  GET_PRODUCT_LIST = "GET_PRODUCT_LIST",
  GET_PRODUCT = "GET_PRODUCT",
  PRODUCT_CREATE = "PRODUCT_CREATE",
  PRODUCT_EDIT = "PRODUCT_EDIT",
  PRODUCT_DELETE = "PRODUCT_DELETE",
}

export interface StartRequestAction {
  type: ProductActionTypes.START_REQUEST;
}
export interface ErrorRequestAction {
  type: ProductActionTypes.ERROR_REQUEST;
}
//List
export interface GetProductListAction {
  type: ProductActionTypes.GET_PRODUCT_LIST;
  payload: IProductListState;
}
//
export interface GetProductAction {
  type: ProductActionTypes.GET_PRODUCT;
  payload: IProductState;
}
export interface CreateProductAction {
  type: ProductActionTypes.PRODUCT_CREATE;
  payload: IProductState;
}
export interface EditProductAction {
  type: ProductActionTypes.PRODUCT_EDIT;
  payload: IProductState;
}
export interface DeleteProductAction {
  type: ProductActionTypes.PRODUCT_DELETE;
  payload: IProductListState;
}

export type ProductActions =
  | StartRequestAction
  | ErrorRequestAction
  | GetProductListAction
  | GetProductAction
  | CreateProductAction
  | EditProductAction
  | DeleteProductAction;
