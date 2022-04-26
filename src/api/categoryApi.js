import axios from "axios";

export const getAllCategories = async () => {
  return await axios
    .get(process.env.REACT_APP_BASE_URL + "/api/categories")
    .then((res) => res.data)
    .catch((e) => e.response);
};