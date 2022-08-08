import http from "../utils/axios";

export const Login = (username: string, password: string) => {
  return http.post("/api/auth/login", {
    username,
    password,
  });
};

export const getCurrentUser = () => {
  return http.get("/api/user/currentUser").then(({ code, msg, data }: any) => {
    if (code === 0) {
      return data;
    } else {
      return null;
    }
  });
};
