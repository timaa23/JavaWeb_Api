export interface IProductListItem {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
export interface IProductImageItem {
  id: number;
  name: string;
  productId: number;
}
export interface IProductListState {
  list: Array<IProductListItem>;
}
export enum ProductListActionTypes {
  PRODUCT_LIST = "PRODUCT_LIST",
}
