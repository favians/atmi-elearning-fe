// contexts/module-context.tsx
import { createContext, useContext, useState } from "react";

// Tipe data module bisa kamu ganti sesuai strukturmu
const ModuleContext = createContext({
  selectedModule: null,
  setSelectedModule: () => {},
});

export const useModule = () => useContext(ModuleContext);

export const ModuleProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <ModuleContext.Provider value={{ selectedModule, setSelectedModule }}>
      {children}
    </ModuleContext.Provider>
  );
};
