import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

export const getAllProducts = async () => {
  return await axios
    .get(process.env.REACT_APP_BASE_URL + `/api/products`)
    .then((res) => res.data)
    .catch((e) => e.response);
};

export const addProduct = async (item) => {
  tokenInterceptor(axios);
  return await axios
    .post(process.env.REACT_APP_BASE_URL + `/api/products`, item)
    .then((res) => res.data)
    .catch((e) => e.response);
};

export const updateProduct = async (item, id) => {
  tokenInterceptor(axios);
  return await axios
    .put(process.env.REACT_APP_BASE_URL + `/api/products/` + id, item)
    .then((res) => res.data)
    .catch((e) => e.response);
};

export const deleteProduct = async (id) => {
  tokenInterceptor(axios);
  return await axios
    .delete(process.env.REACT_APP_BASE_URL + `/api/products/` + id)
    .then((res) => res.data)
    .catch((e) => e.response);
};
