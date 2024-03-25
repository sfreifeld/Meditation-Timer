import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useSound } from './SoundContext'
import sound1 from '../assets/timer-option-1.mp3'
import sound2 from '../assets/timer-option-2.mp3'
import sound3 from '../assets/timer-option-3.wav'
import sound4 from '../assets/timer-option-4.wav'
import sound5 from '../assets/timer-option-5.wav'
import sound6 from '../assets/timer-option-6.wav'
import sound7 from '../assets/timer-option-7.wav'


//object holding the different timer end sounds
const soundChoice = [
  { id: 1, name: 'Default', src: sound1  },
  { id: 2, name: 'Fairy Twinkles', src: sound2 },
  { id: 3, name: 'Alert', src: sound3 },
  { id: 4, name: 'High-Pitch Bell', src: sound4 },
  { id: 5, name: 'Xylophone', src: sound5 },
  { id: 6, name: 'Relaxing', src: sound6 },
  { id: 7, name: 'Flute', src: sound7 }

]

//constructs tailwind classNames based on whether certain conditions are met
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

//Uses the useSound context to access and update the global state of the selected sound, and uses selected variable to handle local state
function SettingsChoice() {
  const { selectedSound, setSelectedSound } = useSound()
  const [selected, setSelected] = useState(soundChoice[0])

  function handleSelectedSound(sound) {
    setSelectedSound(sound)
  }



  return (
    <Listbox value={selected} onChange={(newValue) => {
  setSelected(newValue)
  handleSelectedSound(newValue)
  console.log(newValue)
}}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Bell Sound:</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {soundChoice.map((sound) => (
                  <Listbox.Option
                    key={sound.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={sound}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {sound.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default SettingsChoice;
