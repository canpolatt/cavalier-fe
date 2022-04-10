import axios from "axios";

export const getAllProducts = async () => {

  return await axios
    .get(process.env.REACT_APP_BASE_URL + "/api/products")
    .then((res) => res.data)
    .catch((e) => e.response)
};
