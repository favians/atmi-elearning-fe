// contexts/module-context.js
import { createContext, useContext, useState } from "react";

const ModuleContext = createContext({
  selectedModule: null,
  setSelectedModule: () => {},
  selectedView: "module", // "module" | "review"
  setSelectedView: () => {},
});

export const useModule = () => useContext(ModuleContext);

export const ModuleProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedView, setSelectedView] = useState("module");

  return (
    <ModuleContext.Provider
      value={{
        selectedModule,
        setSelectedModule,
        selectedView,
        setSelectedView,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};
