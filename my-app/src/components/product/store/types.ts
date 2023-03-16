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
}

export interface IProductListState {
  list: Array<IProductItem>;
}

export enum ProductActionTypes {
  GET_PRODUCT_LIST = "GET_PRODUCT_LIST",
  GET_PRODUCT = "GET_PRODUCT",
  PRODUCT_CREATE = "PRODUCT_CREATE",
  PRODUCT_EDIT = "PRODUCT_EDIT",
  PRODUCT_DELETE = "PRODUCT_DELETE",
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
}
export interface EditProductAction {
  type: ProductActionTypes.PRODUCT_EDIT;
}
export interface DeleteProductAction {
  type: ProductActionTypes.PRODUCT_DELETE;
}

export type ProductListActions = GetProductListAction;

export type ProductActions =
  | GetProductAction
  | CreateProductAction
  | EditProductAction
  | DeleteProductAction;
