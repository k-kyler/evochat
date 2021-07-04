export type MemberItemType = {
  username: string;
  avatar: string;
  active?: boolean;
  uid?: string;
  oid?: string;
  clickHandler?: () => void;
};
