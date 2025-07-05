import { createContext, useContext, useState } from "react";

const UploadProgressContext = createContext({
  progress: 0,
  setProgress: () => {},
});

export const useUploadProgress = () => useContext(UploadProgressContext);

export const UploadProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0); // default 0%

  return (
    <UploadProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </UploadProgressContext.Provider>
  );
};
