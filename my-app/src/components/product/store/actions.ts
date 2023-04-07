import { Dispatch } from "react";
import http from "../../../http_common";
import {
  IProductCreate,
  IProductEdit,
  IProductItem,
  ProductActions,
  ProductActionTypes,
} from "./types";

export const GetProduct =
  (productId: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_GET });

      const resp = await http.get<IProductItem>(`/api/products/${productId}`);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_GET_SUCCES,
        payload: { product: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: ProductActionTypes.ERROR_REQUEST,
      });
      return Promise.reject(error);
    }
  };

export const GetProductList =
  (categoryId: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_LIST_GET });

      const resp = await http.get<Array<IProductItem>>(
        `/api/products/byCategory/${categoryId}`
      );

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_LIST_GET_SUCCES,
        payload: { list: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: ProductActionTypes.ERROR_REQUEST,
      });
      return Promise.reject(error);
    }
  };

export const GetAllProductList =
  () => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_ALL_LIST_GET });

      const resp = await http.get<Array<IProductItem>>(`/api/products`);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_ALL_LIST_GET_SUCCES,
        payload: { list: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: ProductActionTypes.ERROR_REQUEST,
      });
      return Promise.reject(error);
    }
  };

export const CreateProduct =
  (model: IProductCreate) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_CREATE });

      const resp = await http.post("/api/products", model, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.token,
        },
      });

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE_SUCCES,
        payload: { product: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: ProductActionTypes.ERROR_REQUEST,
      });
      return Promise.reject(error);
    }
  };

export const EditProduct =
  (id: number, model: IProductEdit) =>
  async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_EDIT });

      const resp = await http.put(`/api/products/${id}`, model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_EDIT_SUCCES,
        payload: { product: data, loading: false },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: ProductActionTypes.ERROR_REQUEST,
      });
      return Promise.reject(error);
    }
  };

export const DeleteProduct =
  (id: number, products: Array<IProductItem>) =>
  async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.PRODUCT_DELETE });

      const resp = await http.delete(`api/products/${id}`);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE_SUCCES,
        payload: {
          list: products.filter((item: IProductItem) => item.id !== id),
          loading: false,
        },
      });

      return Promise.resolve("ok");
    } catch (error) {
      dispatch({
        type: ProductActionTypes.ERROR_REQUEST,
      });
      return Promise.reject(error);
    }
  };
