import { createContext, useContext, useState } from "react";

const TopicContext = createContext({
  selectedTopicId: null,
  setSelectedTopicId: () => {},
});

export const useTopic = () => useContext(TopicContext);

export const TopicProvider = ({ children }) => {
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  return (
    <TopicContext.Provider value={{ selectedTopicId, setSelectedTopicId }}>
      {children}
    </TopicContext.Provider>
  );
};
