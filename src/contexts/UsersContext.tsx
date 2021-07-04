import { createContext, useContext, useState } from "react";
import { UserType } from "../typings/UserType";

type UsersContextProps = {
  users: UserType[];
  setUsers: any;
};

const UsersContext = createContext<Partial<UsersContextProps>>({});

export const useUsers = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }: any) => {
  const [users, setUsers] = useState([]);

  const usersProviderValue = {
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={usersProviderValue}>
      {children}
    </UsersContext.Provider>
  );
};
