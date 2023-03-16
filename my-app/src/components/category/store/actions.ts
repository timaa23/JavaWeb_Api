import { Dispatch } from "react";
import http from "../../../http_common";
import {
  CategoryActions,
  CategoryActionTypes,
  ICategoryCreate,
  ICategoryItem,
} from "./types";

export const GetCategoryList =
  () => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      const resp = await http.get<Array<ICategoryItem>>("api/categories");

      const { data } = resp;
      dispatch({
        type: CategoryActionTypes.CATEGORY_LIST,
        payload: { list: data },
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const DeleteCategory =
  (category_id: number, categories: Array<ICategoryItem>) =>
  async (dispatch: Dispatch<CategoryActions>) => {
    try {
      const resp = await http.delete(`api/categories/${category_id}`);

      const { data } = resp;
      dispatch({
        type: CategoryActionTypes.CATEGORY_DELETE,
        payload: {
          list: categories.filter(
            (item: ICategoryItem) => item.id !== category_id
          ),
        },
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const CreateCategory =
  (category: ICategoryCreate) =>
  async (dispatch: Dispatch<CategoryActions>) => {
    try {
      const resp = await http.post("/api/categories", category, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      dispatch({
        type: CategoryActionTypes.CATEGORY_CREATE,
      });
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
