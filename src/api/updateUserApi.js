import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

const updateUser = async (api, user) => {
  const apiUrl = process.env.REACT_APP_BASE_URL + api;
  tokenInterceptor(axios);
  return await axios.put(`${apiUrl}`, user)
};

export default updateUser;