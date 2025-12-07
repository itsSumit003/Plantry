import axiosClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

export const getCategories = () => axiosClient.get(ENDPOINTS.CATEGORIES);

export const createCategory = (data) =>
  axiosClient.post(ENDPOINTS.CREATE_CATEGORY, data);
