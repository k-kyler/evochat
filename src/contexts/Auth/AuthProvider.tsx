import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import firebase from "firebase";

type AuthContextProps = {
  user: firebase.User | null;
  setUser: any;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null as firebase.User | null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
