import { createContext } from "react";

interface IContextProps {
  auth: {
    isAuth: boolean
    userId: number
  }
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext({} as IContextProps);