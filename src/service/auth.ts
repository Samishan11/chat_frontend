import { useMutation } from "react-query";
import Toast from "../component/Toast";
import { apiClient } from "./service.axios";

const login = async ({ email, password }: string) => {
  const response = await apiClient.post<any>("/login", {
    email,
    password,
  });
  Toast({ type: "success", message: "Login Sucessfully" });
  return response;
};

export const useLoginMutation = () => {
  return useMutation(login, {
    onSuccess: (response) => {
      Toast("success", "Login Sucessfully");
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
  Toast({ type: "success", message: "Login Sucessfully" });
  return response;
};

export const useRegisterMutation = () => {
  return useMutation(register, {
    onSuccess: (response) => {
      Toast("success", "User Register Sucessfully");
      return response;
    },
    onError: () => {
      Toast("error", "Something ent wrong");
    },
  });
};
