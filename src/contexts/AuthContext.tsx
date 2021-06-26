import { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { auth, googleAuthProvider, facebookAuthProvider } from "../firebase";

type AuthContextProps = {
  user: firebase.User | null;
  isLoading: boolean;
  googleSignInHandler: () => void;
  facebookSignInHandler: () => void;
  logOutHandler: () => void;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null as firebase.User | null);
  const [isLoading, setIsLoading] = useState(true);

  const thirdPartySignInHandler = (provider: any) => {
    auth
      .signInWithPopup(provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.error(error));
  };

  const googleSignInHandler = () => {
    return thirdPartySignInHandler(googleAuthProvider);
  };

  const facebookSignInHandler = () => {
    return thirdPartySignInHandler(facebookAuthProvider);
  };

  const logOutHandler = () => {
    return auth.signOut();
  };

  const authProviderValue = {
    user,
    googleSignInHandler,
    facebookSignInHandler,
    logOutHandler,
  };

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubcribe;
  }, []);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
