import axiosClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

export const getBanners = () => axiosClient.get(ENDPOINTS.BANNERS);

export const createBanner = (data) =>
  axiosClient.post(ENDPOINTS.CREATE_BANNER, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
