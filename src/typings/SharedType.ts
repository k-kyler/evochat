export type SharedMediaType = {
  id?: string;
  media: string;
  type: "image" | "video";
};

export type SharedFileType = {
  id?: string;
  file: string;
  fileName: string;
};
