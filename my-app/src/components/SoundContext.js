import React, { createContext, useState, useContext } from 'react';
import sound1 from "../assets/timer-option-1.mp3"


const defaultSound = {
     id: 1, name: 'Default', src: sound1  
}

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [selectedSound, setSelectedSound] = useState(defaultSound)

  return (
    <SoundContext.Provider value={{ selectedSound, setSelectedSound }}>
      {children}
    </SoundContext.Provider>
  );
};