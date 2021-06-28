import { createContext, useContext, useState } from "react";

type OptionContextProps = {
  option: string;
  setOption: any;
};

const OptionContext = createContext<Partial<OptionContextProps>>({});

export const useOption = () => {
  return useContext(OptionContext);
};

export const OptionProvider = ({ children }: any) => {
  const [option, setOption] = useState("");

  const optionProviderValue = {
    option,
    setOption,
  };

  return (
    <OptionContext.Provider value={optionProviderValue}>
      {children}
    </OptionContext.Provider>
  );
};
