import axios from "axios";

const axiosApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { "Content-type": "application/json" },
  params: {
    api_key: "e05d4571d77fadcce4caaa76464df83b",
  },
});

axiosApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosApi;
