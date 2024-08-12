import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { IUser } from "../types";
interface IContext {
  id?: number;
  username?: string;
  role?: string;
  currency?: string;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
}

export const userContext = createContext<IContext | undefined>(undefined);

export const UserProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>();
  return (
    <userContext.Provider value={{ ...user, setUser }}>
      {props.children}
    </userContext.Provider>
  );
};

export const useSessionUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("Use context within context provider");
  }
  return context;
};
