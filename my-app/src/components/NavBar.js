import { Disclosure } from '@headlessui/react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import animationData from '/Users/sabrinafreifeld/Development/code/phase-two/phase-two-project/phase-2-frontend/my-app/src/assets/hourglass.json'; // Update this path

function NavBar() {
  const location = useLocation();
  const [isStopped, setIsStopped] = useState(true);

  useEffect(() => {
    setIsStopped(false);
    const timer = setTimeout(() => {
      setIsStopped(true);
    }, 1700); // Adjust based on your Lottie animation's length

    return () => clearTimeout(timer);
  }, [location]);

  const defaultOptions = {
    loop: false,
    autoplay: false, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Lottie options={defaultOptions}
                          height={60}
                          width={60}
                          isStopped={isStopped}
                          isClickToPauseDisabled={true} />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "inline-flex items-center border-b-2 border-primary px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/statistics"
                    className={({ isActive }) =>
                      isActive ? "inline-flex items-center border-b-2 border-primary px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Statistics
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive ? "inline-flex items-center border-b-2 border-primary px-1 pt-1 text-sm font-medium text-gray-900" : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }
                  >
                    Settings
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
