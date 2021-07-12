export type MessageType = {
  id: string;
  uid: string;
  username?: string;
  avatar?: string;
  message: string;
  video?: string;
  image?: string;
  timestamp: any;
  active?: boolean;
  type: "text" | "video" | "image";
};
