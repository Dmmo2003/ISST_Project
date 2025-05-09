// import React, { Fragment } from "react";
// import { useState, useEffect, useContext } from 'react';
// import {
//   Dialog,
//   DialogPanel,
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
//   Popover,
//   PopoverButton,
//   PopoverGroup,
//   PopoverPanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition
// } from '@headlessui/react';
// import {
//   ArrowPathIcon,
//   Bars3Icon,
//   ChartPieIcon,
//   CursorArrowRaysIcon,
//   FingerPrintIcon,
//   SquaresPlusIcon,
//   XMarkIcon,
//   MagnifyingGlassIcon,
//   CalendarIcon,
//   StarIcon,
//   ChatBubbleBottomCenterIcon
// } from '@heroicons/react/24/outline';
// import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, UserIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { UserContext } from "./context/UserContext"; // Importamos el contexto


// const products = [
//   { name: 'Eventos', description: 'Busca eventos por todo el mundo y conoce a gente interesante', href: '/eventos', icon: CalendarIcon },
//   { name: 'Mis Eventos', description: 'Mira desde tu perfil los eventos que has creado', href: '/perfil', icon: StarIcon },
//   { name: 'Mis grupos', description: 'Mira desde tu perfil los grupos que has creado', href: '/perfil', icon: ChatBubbleBottomCenterIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ];

// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ];

// const userNavigation = [
//   { name: 'Mi Perfil', href: '/perfil', icon: UserIcon },
//   { name: 'Ajustes', href: '#', icon: CogIcon },
//   { name: 'Cerrar Sesión', href: '/', icon: ArrowRightOnRectangleIcon },
// ];

// export default function Header({ navigate }) {
//   const { user, logout } = useContext(UserContext);  // Usamos el contexto

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
//       <nav className="mx-auto px-4 py-4 flex items-center justify-between w-full">

//         {/* Sección izquierda: Logo + Menú Products + Barra de búsqueda */}
//         <div className="flex items-center gap-6">

//           {/* Logo */}
//           <a href="/" className="flex items-center gap-2">
//             <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
//           </a>

//           {/* Menú "Products" */}
//           <PopoverGroup className="flex">
//             <Popover className="relative">
//               <PopoverButton className="flex items-center gap-x-1 text-sm font-medium text-white hover:text-gray-300 focus:outline-none">

//                 <span className="text-xl font-bold">EventConnect</span>
//                 <ChevronDownIcon className="h-5 w-5 flex-none text-gray-300" aria-hidden="true" />

//               </PopoverButton>
//               <Transition as={Fragment}>
//                 <PopoverPanel className="absolute left-0 top-full z-10 mt-3 w-80 bg-white shadow-lg ring-1 ring-gray-900/5 rounded-lg">
//                   <div className="p-4">
//                     {products.map((item) => (
//                       <a href={item.href} key={item.name} className="flex items-center gap-x-4 p-3 hover:bg-gray-50">
//                         <item.icon className="h-6 w-6 text-gray-600" aria-hidden="true" />
//                         <div>

//                             <a className="font-semibold text-gray-900">{item.name}</a>
//                             <p className="text-gray-600 text-sm">{item.description}</p>

//                         </div>
//                       </a>
//                     ))}
//                   </div>
//                 </PopoverPanel>
//               </Transition>
//             </Popover>
//           </PopoverGroup>

//           {/* Barra de búsqueda */}
//           <div className="hidden md:flex flex-1 max-w-md relative">
//             <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Buscar eventos..."
//               className="w-full bg-gray-800 text-white border-gray-600 pl-10"
//             />
//           </div>
//         </div>

//         {/* Menú de usuario (derecha) */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <Menu as="div" className="relative">
//               <MenuButton className="flex items-center">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={user.avatarUrl || "https://github.com/shadcn.png"} alt="User avatar" />
//                   <AvatarFallback>{user.email ? user.email.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
//                 </Avatar>
//               </MenuButton>
//               <Transition as={Fragment}>
//                 <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-md">
//                   {userNavigation.map((item) => (
//                     <MenuItem key={item.name}>
//                       {({ active }) => (
//                         <a href={item.href} onClick={item.name === 'Cerrar Sesión' ? handleLogout : null}
//                           className={`${active ? 'bg-gray-100' : ''} flex items-center px-4 py-2 text-sm text-gray-700`}>
//                           <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
//                           {item.name}
//                         </a>
//                       )}
//                     </MenuItem>
//                   ))}
//                 </MenuItems>
//               </Transition>
//             </Menu>
//           ) : (
//             <Button onClick={() => navigate('/login')} className="bg-[#FB8500] text-white hover:bg-orange-600">
//               <UserIcon className="w-5 h-5" />
//               <span>Iniciar Sesión</span>
//             </Button>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

import React, { Fragment, useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition as HeadlessTransition
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleBottomCenterIcon
} from "@heroicons/react/24/outline";
import {
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/20/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "./context/UserContext";

const products = [
  { name: "Eventos", href: "/eventos", icon: CalendarIcon },
  { name: "Mis Eventos", href: "/perfil", icon: StarIcon },
  { name: "Mis grupos", href: "/perfil", icon: ChatBubbleBottomCenterIcon }
];

const userNavigation = [
  { name: "Mi Perfil", href: "/perfil", icon: UserIcon },
  { name: "Ajustes", href: "#", icon: CogIcon },
  { name: "Cerrar Sesión", href: "/", icon: ArrowRightOnRectangleIcon }
];

export default function Header({ navigate }) {
  const { user, logout } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  console.log(user); // Verifica si el objeto `user` está presente cuando deberías estar logueado.


  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow">
      <nav className="mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        {/* Zona izquierda */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
          </a>
          <span href="/" className="block text-base sm:text-xl font-bold relative lg:hidden">
            EventConnect
          </span>

          {/* Popover escritorio */}
          <PopoverGroup className="hidden lg:flex relative">
            <Popover>
              <PopoverButton className="flex items-center gap-1 text-sm font-medium hover:text-gray-300">
                <span className="text-xl font-bold">EventConnect</span>
                <ChevronDownIcon className="h-5 w-5 text-gray-300" />
              </PopoverButton>
              <HeadlessTransition as={Fragment}>
                <PopoverPanel static>
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full z-10 mt-3 w-64 bg-white shadow-lg ring-1 ring-gray-900/5 rounded-lg"
                      // className="absolute left-0 top-full z-40 mt-3 w-72 bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-4"

                    >
                      <div className="p-4 space-y-2">
                        {products.map((item) => (
                          <motion.a
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <item.icon className="h-6 w-6 text-gray-600" />
                            <span className="font-medium text-gray-900">
                              {item.name}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </PopoverPanel>
              </HeadlessTransition>
            </Popover>
          </PopoverGroup>
        </div>

        {/* Zona central escritorio */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
          <div className="relative w-full max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full bg-gray-800 text-white border-gray-600 pl-10"
            />
          </div>
        </div>

        {/* Zona derecha */}
        <div className="flex items-center gap-4">
          {/* Hamburger móvil */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-10 w-10 text-white" />
            </Button>
          </div>
          {/* Menú usuario escritorio */}
          <div className="hidden lg:flex lg:items-center gap-4">
            {user ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center">
                  <Avatar className="h-8 w-8">
              <AvatarImage
                src={
                  user.fotoPerfil
                    ? `data:image/jpeg;base64,${user.fotoPerfil}`
                    : "https://github.com/shadcn.png"
                }
              />
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </MenuButton>
                <HeadlessTransition as={Fragment}>
                  <MenuItems static>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        // className="absolute right-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 rounded-md"
                        className="absolute right-0 mt-2 w-60 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-gray-200 z-40"

                      >
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            {({ active }) => (
                              <motion.a
                                href={item.href}
                                onClick={
                                  item.name === "Cerrar Sesión"
                                    ? handleLogout
                                    : undefined
                                }
                                // className={`${active ? "bg-gray-100" : ""
                                //   } flex items-center px-4 py-2 text-sm text-gray-700`}
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100`}
                                
                                whileHover={{ scale: 1.02 }}
                              >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.name}
                              </motion.a>
                            )}
                          </MenuItem>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </MenuItems>
                </HeadlessTransition>
              </Menu>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#FB8500] hover:bg-orange-600"
              >
                <UserIcon className="w-5 h-5 mr-1" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Drawer móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            {/* Overlay: al hacer click aquí cierra el menú */}
            <div
              className="fixed inset-0 bg-black/30 "
              aria-hidden="true"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: "linear",
                duration: 0.2,
              }}
              className="fixed inset-y-0 right-0 w-72 bg-white p-6 shadow-lg overflow-y-auto"
            >
              {/* Header interno */}
              <div className="flex items-center justify-between mb-6">
                <a href="/" className="flex items-center gap-2">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-8 w-8"
                  />
                  <span className="text-xl font-bold text-gray-900">
                    EventConnect
                  </span>
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-900" />
                </Button>
              </div>

              {/* Navegación */}
              <nav className="space-y-4">
                {products.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 text-gray-900 hover:text-gray-700"
                    whileHover={{ x: 4 }}
                  >
                    <item.icon className="h-5 w-5 text-gray-500" />
                    {item.name}
                  </motion.a>
                ))}

                <hr className="my-4 border-gray-200" />

                {user ? (
                  userNavigation.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={
                        item.name === "Cerrar Sesión" ? handleLogout : undefined
                      }
                      className="flex items-center gap-3 text-gray-900 hover:text-gray-700"
                      whileHover={{ x: 4 }}
                    >
                      <item.icon className="h-5 w-5 text-gray-500" />
                      {item.name}
                    </motion.a>
                  ))
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#FB8500] hover:bg-orange-600"
                  >
                    <UserIcon className="w-5 h-5 mr-2" /> Iniciar Sesión
                  </Button>
                )}
              </nav>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

    </header >
  );
}
