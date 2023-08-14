import request from "@helpers/req";

export const loginRequest = async ({ username, password }) => {
  try {
    const { data: response } = await request.post("/auth/login", {
      username,
      password,
    });
    return {
      token: response.access_token,
      user: response.user,
    };
  } catch (error) {
    throw error?.response?.data || {};
  }
};

export const registerRequest = async (data) => {
  try {
    const res = await request.post("/user/register", data);
    return res;
  } catch (error) {
    throw error?.response?.data || {};
  }
};
