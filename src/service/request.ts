import { useQuery } from "react-query";
import { apiClient } from "./service.axios";

const listRequest = async (data: any) => {
  const response = await apiClient.get<any>(`/list-request?id=${data}`);
  return response.data.data;
};

export const useListRequest = (data: any) => {
  return useQuery(["friend", data], () => listRequest(data));
};

const listFriend = async (data: any) => {
  const response = await apiClient.get<any>(`/list-friend?id=${data}`);
  return response.data.data;
};

export const useListFriend = (data: any) => {
  return useQuery(["friend", data], () => listFriend(data));
};
