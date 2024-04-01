import { useMutation } from "react-query";
import request from "@helpers/reqgw1";

const getRequest = async (endpoint, params) => {
  try {
    const { data: response } = await request.get(endpoint, { params });
    return response;
  } catch (error) {
    throw error?.response?.data || {};
  }
};

const postRequest = async (
  endpoint,
  body,
  isFormData = false,
  method = "post"
) => {
  let payload;
  payload = body;

  if (isFormData) {
    payload = new FormData();
    Object.keys(body).forEach((key) => {
      payload.append(key, body[key]);
    });
  }
  try {
    const { data: response } = await request[method](endpoint, payload);
    return response;
  } catch (error) {
    throw error?.response?.data || {};
  }
};

export const postCallDurationgw1 = (body) =>
  postRequest("/callduration/clientgw1", body, false);

export const useCallDurationgw1 = () => useMutation(postCallDurationgw1);
