import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

export const getOrder = async (id) => {
  tokenInterceptor(axios);

  return await axios
    .get(process.env.REACT_APP_BASE_URL + `/api/orders/find` + id)
    .then((res) => res.data)
    .catch((e) => e.response);
};
