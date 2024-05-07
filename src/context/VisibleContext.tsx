import React, { createContext, useState, ReactNode } from "react";

interface ContextProviderProps {
  children: ReactNode;
}

interface ContextValue {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextCreator = createContext<ContextValue>({
  visible: false,
  setVisible: () => {}
});

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState<boolean>(false);


  return (
    <ContextCreator.Provider value={{ setVisible, visible}}>
      {children}
    </ContextCreator.Provider>
  );
};

export default ContextProvider;
