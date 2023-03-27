import { Dispatch } from "react";
import http from "../../../http_common";
import {
  CategoryActions,
  CategoryActionTypes,
  ICategoryCreate,
  ICategoryItem,
} from "./types";

export const GetCategory =
  (id: number) => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });

      const resp = await http.get<ICategoryItem>(`api/categories/${id}`);

      const { data } = resp;
      dispatch({
        type: CategoryActionTypes.CATEGORY_GET,
        payload: { category: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: CategoryActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };

export const GetCategoryList =
  () => async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });

      const resp = await http.get<Array<ICategoryItem>>("api/categories");

      const { data } = resp;
      dispatch({
        type: CategoryActionTypes.CATEGORY_LIST,
        payload: { list: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: CategoryActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };

export const DeleteCategory =
  (id: number, categories: Array<ICategoryItem>) =>
  async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });

      const resp = await http.delete(`api/categories/${id}`);

      const { data } = resp;
      dispatch({
        type: CategoryActionTypes.CATEGORY_DELETE,
        payload: {
          list: categories.filter((item: ICategoryItem) => item.id !== id),
          loading: false,
        },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: CategoryActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };

export const CreateCategory =
  (category: ICategoryCreate) =>
  async (dispatch: Dispatch<CategoryActions>) => {
    try {
      dispatch({ type: CategoryActionTypes.START_REQUEST });

      const resp = await http.post("/api/categories", category, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      dispatch({
        type: CategoryActionTypes.CATEGORY_CREATE,
        payload: { category: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({ type: CategoryActionTypes.ERROR_REQUEST });
      return Promise.reject(error);
    }
  };
