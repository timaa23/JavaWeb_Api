export interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  description: string;
}
export interface ICategoryState {
  list: Array<ICategoryItem>;
}
export enum CategoryActionTypes {
  CATEGORY_LIST = "CATEGORY_LIST",
  CATEGORY_CREATE = "CATEGORY_CREATE",
}
