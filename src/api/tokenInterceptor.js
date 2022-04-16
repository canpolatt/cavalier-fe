const tokenInterceptor = (axios) => {
  const accessToken = localStorage.getItem("accessToken");

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default tokenInterceptor;
