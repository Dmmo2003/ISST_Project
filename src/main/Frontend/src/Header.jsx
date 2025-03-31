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
      <nav className="mx-auto px-4 py-4 flex items-center justify-between w-full">
        
        {/* Sección izquierda: Logo + Menú Products + Barra de búsqueda */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">EventConnect</span>
          </a>

          {/* Menú "Products" */}
          <PopoverGroup className="flex">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-medium text-white hover:text-gray-300 focus:outline-none">
                Product
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
              </PopoverButton>
              <Transition as={Fragment}>
                <PopoverPanel className="absolute left-0 top-full z-10 mt-3 w-80 bg-white shadow-lg ring-1 ring-gray-900/5 rounded-lg">
                  <div className="p-4">
                    {products.map((item) => (
                      <div key={item.name} className="flex items-center gap-x-4 p-3 hover:bg-gray-50">
                        <item.icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                        <div>
                          <a href={item.href} className="font-semibold text-gray-900">{item.name}</a>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverPanel>
              </Transition>
            </Popover>
          </PopoverGroup>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Buscar eventos..." 
              className="w-full bg-gray-800 text-white border-gray-600 pl-10" 
            />
          </div>
        </div>

        {/* Menú de usuario (derecha) */}
        <div className="flex items-center gap-4">
          {user ? (
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl || "https://github.com/shadcn.png"} alt="User avatar" />
                  <AvatarFallback>{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
              </MenuButton>
              <Transition as={Fragment}>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-md">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      {({ active }) => (
                        <a href={item.href} onClick={item.name === 'Cerrar Sesión' ? handleLogout : null}
                           className={`${active ? 'bg-gray-100' : ''} flex items-center px-4 py-2 text-sm text-gray-700`}>
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
            <Button onClick={() => navigate('/login')} className="bg-[#FB8500] text-white hover:bg-orange-600">
              <UserIcon className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
