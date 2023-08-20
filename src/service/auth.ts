import { useMutation, useQuery } from "react-query";
import Toast from "../component/Toast";
import { apiClient } from "./service.axios";
import { setToken } from "./token";

const login = async ({ email, password }: string) => {
  const response = await apiClient.post<any>("/login", {
    email,
    password,
  });
  return response;
};

export const useLoginMutation = () => {
  return useMutation(login, {
    onSuccess: (response) => {
      setToken(response.data.data);
      Toast({ type: "success", message: "Login Sucessfully" });
      return response;
    },
    onError: () => {
      Toast("error", "Something ent wrong");
    },
  });
};

const register = async ({ username, fullname, email, password }: string) => {
  const response = await apiClient.post<any>("/register", {
    email,
    password,
    username,
    fullname,
  });

  return response;
};

export const useRegisterMutation = () => {
  return useMutation(register, {
    onSuccess: (response) => {
      Toast({ type: "success", message: "User register sucessfully" });
      return response;
    },
    onError: () => {
      Toast("error", "Something ent wrong");
    },
  });
};

const listUser = async () => {
  const response = await apiClient.get<any>("/users");
  return response.data.data;
};

export const useUserQuery = () => {
  return useQuery(["users"], listUser, {
    select: (response) => response,
  });
};
