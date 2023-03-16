import { Dispatch } from "react";
import http from "../../../http_common";
import {
  IProductCreate,
  IProductEdit,
  IProductItem,
  ProductActions,
  ProductActionTypes,
  ProductListActions,
} from "./types";

export const GetProductList =
  (categoryId: number) => async (dispatch: Dispatch<ProductListActions>) => {
    try {
      const resp = await http.get<Array<IProductItem>>(
        `/api/products/byCategory/${categoryId}`
      );

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.GET_PRODUCT_LIST,
        payload: { list: data },
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const GetProduct =
  (productId: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.get<IProductItem>(`/api/products/${productId}`);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.GET_PRODUCT,
        payload: { product: data },
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const CreateProduct =
  (model: IProductCreate) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.post("/api/products", model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_CREATE,
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const EditProduct =
  (id: number, model: IProductEdit) =>
  async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.put(`/api/products/${id}`, model, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_EDIT,
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const DeleteProduct =
  (id: number) => async (dispatch: Dispatch<ProductActions>) => {
    try {
      const resp = await http.delete(`api/products/${id}`);

      const { data } = resp;
      dispatch({
        type: ProductActionTypes.PRODUCT_DELETE,
      });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
