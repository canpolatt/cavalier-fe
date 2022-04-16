import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

const postOrder = async (api, cart) => {
  const apiUrl = process.env.REACT_APP_BASE_URL + api;
  tokenInterceptor(axios);
  try {
    await axios.post(`${apiUrl}`, cart).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};

export default postOrder;
