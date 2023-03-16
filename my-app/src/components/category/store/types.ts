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
  list: Array<ICategoryItem>;
}
export enum CategoryActionTypes {
  CATEGORY_LIST = "CATEGORY_LIST",
  CATEGORY_CREATE = "CATEGORY_CREATE",
  CATEGORY_DELETE = "CATEGORY_DELETE",
}
export interface GetCategoryListAction {
  type: CategoryActionTypes.CATEGORY_LIST;
  payload: ICategoryState;
}
export interface CreateCategoryAction {
  type: CategoryActionTypes.CATEGORY_CREATE;
}
export interface DeleteCategoryAction {
  type: CategoryActionTypes.CATEGORY_DELETE;
  payload: ICategoryState;
}
export type CategoryActions =
  | GetCategoryListAction
  | CreateCategoryAction
  | DeleteCategoryAction;
