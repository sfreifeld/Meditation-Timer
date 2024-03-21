import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function NavBar() {
  return (
    <Disclosure as="nav" className="bg-slate-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
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
