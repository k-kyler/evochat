export type PanelOptionType = {
  name: string;
  icon: any;
  highlight?: "red" | "blue";
  clickHandler?: () => void;
};
