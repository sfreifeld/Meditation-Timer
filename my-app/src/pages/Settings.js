import React, { useState } from 'react';
//import sound1 from '../assets/timer-option-1.mp3';
//import sound2 from '../assets/timer-option-2.mp3';
//import sound3 from '../assets/timer-option-2.mp3';
import homeBackgroundVideo from '../assets/home-background.mp4'
import '../index.css'
import { Menu } from '@headlessui/react';

function Settings() {

    return (
        <div className="relative min-h-screen flex items-center justify-center">
          <video autoPlay loop muted className="absolute w-full h-full object-cover">
            <source src={homeBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="z-10 glass-container flex items-center flex-col  justify-center">
            <h2 className='text-4xl'>Settings</h2>
            <Menu as="div" className="relative">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          {/* Your existing SVG for the button */}
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a href="#" className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                  Sound 1
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a href="#" className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                  Sound 2
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a href="#" className={`block px-4 py-2 text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
                  Sound 3
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>


          </div>
        </div>
      );
}
  
  export default Settings;