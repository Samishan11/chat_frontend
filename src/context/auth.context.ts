import { createContext, useContext } from "react";

export type IType = {
  authData: any;
  setAuthData: (data: any) => void;
};

export const AuthContext = createContext<IType>({
  authData: null,
  setAuthData: () => {},
});

export const useAuthData = () => useContext(AuthContext);
