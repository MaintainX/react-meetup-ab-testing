import { createContext } from "react";
import { IUser } from "./user-provider";

export interface IUserContext {
  user: IUser;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);
