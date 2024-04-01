import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_URL_SECOND;

const createClientAPI = () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });
  return api;
};

export default createClientAPI();
