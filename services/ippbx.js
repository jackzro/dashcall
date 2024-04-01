import { useQuery, useMutation } from "react-query";
import request from "@helpers/request";
import { useContext } from "react";

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

export const postCallDurationByDate = (body) =>
  postRequest("/callduration/client", body, false);
export const postCallDurationBySource = (body) =>
  postRequest("/callduration/client/number", body, false);
export const postCallDetail = (body) =>
  postRequest("/callduration/client/detail", body, false);
export const postDidByClient = (body) =>
  postRequest("/callduration/client/did", body, false);

export const useCallDurationByDate = () => useMutation(postCallDurationByDate);
export const useCallDurationBySource = () =>
  useMutation(postCallDurationBySource);
export const useCallDetail = () => useMutation(postCallDetail);
export const useDidByClient = () => useMutation(postDidByClient);
