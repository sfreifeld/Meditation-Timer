import React, { createContext, useState, useContext } from 'react';



const DurationContext = createContext();

export const useDuration = () => useContext(DurationContext);

export const DurationProvider = ({ children }) => {
  const [selectedDuration, setSelectedDuration] = useState(5)

  return (
    <DurationContext.Provider value={{ selectedDuration, setSelectedDuration }}>
      {children}
    </DurationContext.Provider>
  );
};