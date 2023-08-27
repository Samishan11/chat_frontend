import { useMutation, useQuery } from "react-query";
import Toast from "../component/Toast";
import { apiClient } from "./service.axios";
import { setToken } from "./token";
import { useNavigate } from "react-router-dom";
import { useAuthData } from "../context/auth.context";

const login = async ({ email, password }: any) => {
  const response = await apiClient.post<any>("/login", {
    email,
    password,
  });
  return response;
};

export const useLoginMutation = () => {
  const { setAuthData } = useAuthData();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.data.token);
      setAuthData(response.data.token);
      if (response.data.message === "User login sucessfully") {
        Toast({ type: "success", message: "Login Sucessfully" });
        navigate("/chat");
      } else {
        Toast({ type: "error", message: "Email or password not match." });
      }
    },
    onError: () => {
      Toast({ type: "error", message: "Something ent wrong" });
    },
  });
};

const register = async ({ username, fullname, email, password }: any) => {
  const response = await apiClient.post<any>("/register", {
    email,
    password,
    username,
    fullname,
  });

  return response;
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      Toast({ type: "success", message: "User register sucessfully" });
      // return response;
    },
    onError: () => {
      Toast({ type: "error", message: "Something ent wrong" });
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
