import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

export const getOrder = async () => {
  tokenInterceptor(axios);
  return await axios
    .get(process.env.REACT_APP_BASE_URL + `/api/orders`)
    .then((res) => res.data)
    .catch((e) => e.response);
};
