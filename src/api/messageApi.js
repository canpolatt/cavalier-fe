import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

export const getMessage = async () => {
  const apiUrl = process.env.REACT_APP_BASE_URL + "/api/messagebox";
  tokenInterceptor(axios);
  try {
    return await axios.get(apiUrl).then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};

const postMessage = async (api, message) => {
  const apiUrl = process.env.REACT_APP_BASE_URL + api;
  try {
    await axios.post(`${apiUrl}`, message).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};

export default postMessage;
