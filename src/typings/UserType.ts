import firebase from "firebase";

export type UserType = {
  user: firebase.User | null | undefined;
};
