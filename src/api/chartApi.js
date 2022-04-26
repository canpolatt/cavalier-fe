import axios from "axios";
import tokenInterceptor from "./tokenInterceptor";

export const getChartIncome = async () => {
  const apiUrl = process.env.REACT_APP_BASE_URL + "/api/orders/income";
  tokenInterceptor(axios);
  try {
    return await axios.get(apiUrl).then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};
