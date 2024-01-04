import { useContext } from "react";
import { UserContext } from "../components/user-context";
import { IUser } from "../components/user-provider";

export const useUser = (): IUser => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Hook useUser must be used within a UserProvider");
  }

  return context.user;
};
