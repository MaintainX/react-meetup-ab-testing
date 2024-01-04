import { UserContext } from "./user-context";

export type IUser = {
  id: string;
};

interface Props {
  user: IUser;
  children: JSX.Element;
}

export const UserProvider: React.FC<Props> = ({ children, user }) => {
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
