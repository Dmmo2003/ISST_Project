import React, { Fragment } from "react";
import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition
} from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, UserIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers\' data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const userNavigation = [
  { name: 'Mi Perfil', href: '/perfil', icon: UserIcon },
  { name: 'Ajustes', href: '#', icon: CogIcon },
  { name: 'Cerrar Sesión', href: '#', icon: ArrowRightOnRectangleIcon },
];

export default function Header({ navigate, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); // Recarga la página después de logout
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <nav className="mx-auto px-4 py-4" aria-label="Global">
        <div className="flex items-center justify-between">
          
          {/* Logo y nombre */}
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">EventConnect</span>
            </a>
          </div>
          
          {/* Menú de navegación principal (desktop) */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <PopoverGroup className="flex gap-x-8">
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm font-medium text-white hover:text-gray-300 focus:outline-none">
                  Product
                  <ChevronDownIcon className="h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
                </PopoverButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {products.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                          </div>
                          <div className="flex-auto">
                            <a href={item.href} className="block font-semibold text-gray-900">
                              {item.name}
                              <span className="absolute inset-0" />
                            </a>
                            <p className="mt-1 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                      {callsToAction.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                        >
                          <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </PopoverPanel>
                </Transition>
              </Popover>

              <a href="#" className="text-sm font-medium text-white hover:text-gray-300">
                Features
              </a>
              <a href="#" className="text-sm font-medium text-white hover:text-gray-300">
                Marketplace
              </a>
              <a href="#" className="text-sm font-medium text-white hover:text-gray-300">
                Company
              </a>
            </PopoverGroup>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 mx-4 max-w-md relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Buscar eventos..." 
              className="w-full bg-gray-800 text-white border-gray-600 pl-10" 
            />
          </div>

          {/* Menú de usuario (derecha) */}
          <div className="flex items-center gap-4">
            {/* Botón de login/menú usuario (desktop) */}
            <div className="hidden md:flex md:items-center">
              {user ? (
                <Menu as="div" className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <MenuButton className="relative flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl || "https://github.com/shadcn.png"} alt="User avatar" />
                        <AvatarFallback>
                          {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </MenuButton>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              onClick={item.name === 'Cerrar Sesión' ? handleLogout : null}
                              className={`${active ? 'bg-gray-100' : ''} flex items-center px-4 py-2 text-sm text-gray-700`}
                            >
                              <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-white">¿Ya tienes cuenta?</span>
                  <Button 
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 bg-[#FB8500] text-white hover:bg-orange-600"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>Iniciar Sesión</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Botón de menú móvil */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-white">EventConnect</span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-800">
                    Product
                    <ChevronDownIcon
                      className="h-5 w-5 flex-none text-gray-300"
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-800"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatarUrl || "https://github.com/shadcn.png"} alt="User avatar" />
                      <AvatarFallback>
                        {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">{user.email}</p>
                      <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-gray-300 hover:text-white"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        type="text" 
                        placeholder="Buscar eventos..." 
                        className="w-full bg-gray-800 text-white border-gray-600 pl-10 mb-4" 
                      />
                    </div>
                    <Button
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#FB8500] hover:bg-orange-600 text-white"
                    >
                      Iniciar Sesión
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}