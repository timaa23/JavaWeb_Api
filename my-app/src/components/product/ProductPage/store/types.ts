export interface IProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: number;
}
export interface IProductImageItem {
  id: number;
  name: string;
  productId: number;
}
export interface IProductState {
  _product: IProductItem;
}
export interface IProductImageState {
  _images: Array<IProductImageItem>;
}
export enum ProductActionTypes {
  GET_PRODUCT = "GET_PRODUCT",
}
export enum ProductImageActionTypes {
  GET_PRODUCT_IMAGES = "GET_PRODUCT_IMAGES",
}
