export type PanelOptionType = {
  id?: string;
  name: string;
  icon: any;
  highlight?: "red" | "blue";
  bottomDivider?: boolean;
  clickHandler?: () => void;
};
