import axios from "axios";

export const findProduct = async (product_id) => {
  return await axios
    .get(process.env.REACT_APP_BASE_URL + "/api/products/find/" + product_id)
    .then((res) => res.data)
    .catch((e) => e.response);
};
