export interface IProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
}

export interface IProductCreate {
  name: string;
  price: number;
  description: string;
  images: Array<File>;
  categoryId: number;
}

export interface IProductState {
  _product: IProductItem;
}

export interface IProductImageItem {
  id: number;
  name: string;
  productId: number;
}

export interface IProductImageState {
  _images: Array<IProductImageItem>;
}

export interface IProductListItem {
  id: number;
  name: string;
  price: number;
  description: string;
  primaryImage: string;
}

export interface IProductListState {
  list: Array<IProductListItem>;
}

export enum ProductActionTypes {
  GET_PRODUCT_LIST = "GET_PRODUCT_LIST",
  GET_PRODUCT = "GET_PRODUCT",
  PRODUCT_CREATE = "PRODUCT_CREATE",
  PRODUCT_DELETE = "PRODUCT_DELETE",
}

export enum ProductImageActionTypes {
  GET_PRODUCT_IMAGES = "GET_PRODUCT_IMAGES",
}
