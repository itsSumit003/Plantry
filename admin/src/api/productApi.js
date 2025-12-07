import axiosClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

export const getProducts = () => axiosClient.get(ENDPOINTS.PRODUCTS);

export const createProduct = (data) =>
  axiosClient.post(ENDPOINTS.CREATE_PRODUCT, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
