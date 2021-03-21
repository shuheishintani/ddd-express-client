import axios from "axios";

const token = typeof window !== "undefined" && localStorage.getItem("token");
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.headers.common["Authorization"] = token;

export { axios as customAxios };
