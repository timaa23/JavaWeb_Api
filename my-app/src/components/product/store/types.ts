export interface IProductItem {
  id: number;
  name: string;
  price: number;
  description: string;
}
export interface IProductState {
  list: Array<IProductItem>;
}
export enum ProductActionTypes {
  PRODUCT_LIST = "PRODUCT_LIST",
}
