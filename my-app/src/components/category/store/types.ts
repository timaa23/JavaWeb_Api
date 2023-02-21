export interface ICategoryItem {
  id: number;
  name: string;
}
export interface ICategoryState {
  list: Array<ICategoryItem>;
}
export enum CategoryActionTypes {
  CATEGORY_LIST = "CATEGORY_LIST",
}
