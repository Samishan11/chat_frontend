import { createContext, useContext } from "react";

export type IType = {
  auth: any;
};

export const AuthContext = createContext<IType>({
  auth: null,
});

export const useAuthData = () => useContext(AuthContext);
