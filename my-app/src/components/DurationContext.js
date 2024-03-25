import React, { createContext, useState, useContext } from 'react';


//creates duration context so that user input from settings can be used in sibling component
const DurationContext = createContext()

export const useDuration = () => useContext(DurationContext)

export const DurationProvider = ({ children }) => {
  //using this state for now for testing purposes, will switch this to 5 in prod
  const [selectedDuration, setSelectedDuration] = useState(.05)

  return (
    <DurationContext.Provider value={{ selectedDuration, setSelectedDuration }}>
      {children}
    </DurationContext.Provider>
  )
}