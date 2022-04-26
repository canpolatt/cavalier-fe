import axios from "axios";

export const getFilteredProducts = async (category) => {
  return await axios
    .get(process.env.REACT_APP_BASE_URL + `/api/products?category=${category}`)
    .then((res) => res.data)
    .catch((e) => e.response)
};