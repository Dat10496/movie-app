import axios from "axios";
import { BASE_URL, BASE_API } from "./config";

const apiKey = `${BASE_API}`;
// console.log(apiKey);

const apiService = axios.create({
  baseURL: BASE_URL,
});

export { apiService, apiKey };
