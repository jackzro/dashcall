import { parseCookies } from "nookies";

export const checkAuth = () => {
  const { "nextauth.token": token } = parseCookies();
  return token != null;
};
