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
  category: ICategoryItem;
  loading: boolean;
}
export interface ICategoryListState {
  list: Array<ICategoryItem>;
  loading: boolean;
}

export enum CategoryActionTypes {
  START_REQUEST = "START_REQUEST",
  CATEGORY_GET = "CATEGORY_GET",
  CATEGORY_LIST = "CATEGORY_LIST",
  CATEGORY_CREATE = "CATEGORY_CREATE",
  CATEGORY_DELETE = "CATEGORY_DELETE",
}

export interface StartRequestAction {
  type: CategoryActionTypes.START_REQUEST;
}

export interface GetCategoryAction {
  type: CategoryActionTypes.CATEGORY_GET;
  payload: ICategoryState;
}
export interface GetCategoryListAction {
  type: CategoryActionTypes.CATEGORY_LIST;
  payload: ICategoryListState;
}
export interface CreateCategoryAction {
  type: CategoryActionTypes.CATEGORY_CREATE;
  payload: ICategoryState;
}
export interface DeleteCategoryAction {
  type: CategoryActionTypes.CATEGORY_DELETE;
  payload: ICategoryListState;
}

export type CategoryActions =
  | GetCategoryAction
  | StartRequestAction
  | GetCategoryListAction
  | CreateCategoryAction
  | DeleteCategoryAction;
