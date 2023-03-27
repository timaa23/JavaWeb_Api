import { Dispatch } from "react";
import http from "../../../http_common";
import {
  IProductCreate,
  IProductEdit,
  IProductItem,
  ProductActions,
  ProductActionTypes,
} from "./types";

export const GetProductList =
  (categoryId: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.START_REQUEST });

      const resp = await http.get<Array<IProductItem>>(
        `/api/products/byCategory/${categoryId}`
      );
      console.log("resp log ", resp);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST,
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

export const GetProduct =
  (productId: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.START_REQUEST });

      const resp = await http.get<IProductItem>(`/api/products/${productId}`);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.GET_PRODUCT,
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

export const CreateProduct =
  (model: IProductCreate) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      dispatch({ type: ProductActionTypes.START_REQUEST });

      const resp = await http.post("/api/products", model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE,
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
      dispatch({ type: ProductActionTypes.START_REQUEST });

      const resp = await http.put(`/api/products/${id}`, model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_EDIT,
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
      dispatch({ type: ProductActionTypes.START_REQUEST });

      const resp = await http.delete(`api/products/${id}`);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE,
        payload: {
          list: products.filter((item: IProductItem) => item.id !== id),
          loading: false,
        },
      });

      return Promise.resolve(data);
    } catch (error) {
      dispatch({
        type: ProductActionTypes.ERROR_REQUEST,
      });
      return Promise.reject(error);
    }
  };
