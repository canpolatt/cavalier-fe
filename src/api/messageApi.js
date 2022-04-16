import axios from "axios";

const postMessage = async (api, message) => {
  const apiUrl = process.env.REACT_APP_BASE_URL + api;
  try {
    await axios.post(`${apiUrl}`, message).then((res) => console.log(res));
  } catch (err) {
    console.log(err);
  }
};

export default postMessage;