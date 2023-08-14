import React, { useEffect, useState, createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import { loginRequest } from "@services/auth";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = () => {
    const { "nextauth.token": token } = parseCookies();
    return token;
  };

  async function signIn({ username, password }) {
    try {
      const response = await loginRequest({ username, password });
      const { token, user } = response;
      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 1,
      });
      setCookie(undefined, "nextauth.user", JSON.stringify(user), {
        maxAge: 60 * 60 * 1,
      });
      setUser(user);
      Router.push("/");
    } catch (error) {}
  }

  function logout() {
    destroyCookie(undefined, "nextauth.token", { path: "/" });
    Router.push("/login");
  }

  useEffect(() => {
    const { "nextauth.user": userData } = parseCookies();
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      // failed parse
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
