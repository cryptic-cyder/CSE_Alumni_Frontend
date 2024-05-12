import axios from "axios";
const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: "http://localhost:8181",
  withCredentials: true,
});
export default axios;

// const instance = axios.create({
//   baseURL: "https://some-domain.com/api/",
//   timeout: 1000,
//   headers: { "X-Custom-Header": "foobar" },
// });
