import { createContext, useContext } from "react";

export type IType = {
  socket: any;
};

export const SocketContext = createContext<IType>({
  socket: null,
});

export const useSocket = () => useContext(SocketContext);
