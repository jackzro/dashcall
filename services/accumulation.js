import { useQuery, useMutation } from "react-query";
import request from "@helpers/req";

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

export const getAllCustomer = () => getRequest(`/customer`);
export const getCustomerById = (body) => getRequest(`/customer/${body.id}`);
export const getClientById = (id) => getRequest(`/user/client/${id}`);

export const postCdrMonth = (body) => postRequest(`/cdrmonth`, body, false);
export const usePostCdrMonth = () => useMutation(postCdrMonth);

export const postCdrMonthByMonth = (body) =>
  postRequest(`/cdrmonth/month`, body, false);
export const usePostCdrMonthByMonth = () => useMutation(postCdrMonthByMonth);

export const useCustomer = () => useQuery("customer", getAllCustomer);
export const useCustomerById = () => useMutation(getCustomerById);
export const useClientById = (id) =>
  useQuery(["client-by-id", id], () => getClientById(id));
