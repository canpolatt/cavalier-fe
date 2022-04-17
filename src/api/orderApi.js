import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

const postOrder = async (api, cart) => {
  const apiUrl = process.env.REACT_APP_BASE_URL + api;
  tokenInterceptor(axios);
  return await axios.post(`${apiUrl}`, cart)
};

export default postOrder;
