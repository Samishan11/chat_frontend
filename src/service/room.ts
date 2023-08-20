import { useQuery } from "react-query";
import { apiClient } from "./service.axios";

const listRoom = async (data: any) => {
  const response = await apiClient.post<any>("/list-room", { users: data });
  return response.data.data;
};

export const useRoomQuery = (data: any) => {
  return useQuery(["room", data], () => listRoom(data));
};
