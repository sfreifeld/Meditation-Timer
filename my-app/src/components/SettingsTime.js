import React from 'react';
import { useDuration } from './DurationContext'
import '../index.css'
 
//uses the useDuration context to access and set the meditation duration
export function SettingsTime() {
  const { selectedDuration, setSelectedDuration } = useDuration()

  function handleSelectedDuration(duration) {
    setSelectedDuration(duration)
  }

  return (
    <>
        <p className="block text-sm font-medium leading-6 text-gray-900">Meditation Duration: {selectedDuration} Minutes</p>
        <div className="slidecontainer">
        <input className="w-full relative cursor-default  accent-primary" type="range" min="1" max="100" value={selectedDuration} id="myRange" onChange={(newValue) => {
          handleSelectedDuration(newValue.target.value)
          console.log(newValue.target.value)
          }}
          />
        </div>
    </>
  )
}

export default SettingsTime