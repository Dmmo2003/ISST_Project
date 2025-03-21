import React from "react";
import { useState } from 'react'
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
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
]



/**
 * Componente de cabecera que representa el menú de navegación global.
 * 
 * - Contiene un logo de la empresa, enlaces a secciones como Producto, Características, 
 *   Mercado y Compañía, y un botón de inicio de sesión.
 * - Utiliza Popover para mostrar un menú desplegable de productos en pantallas grandes.
 * - Utiliza Dialog para gestionar un menú móvil.
 * 
 * Elementos del return:
 * - `<header>`: Contiene el componente completo, con fondo blanco.
 * - `<nav>`: Barra de navegación principal, con enlaces y logo.
 * - `<a>`: Enlaces a diferentes secciones de la aplicación.
 * - `<PopoverGroup>`: Agrupa los elementos Popover para el menú de productos.
 * - `<Popover>`: Elemento desplegable para productos.
 * - `<PopoverButton>`: Botón que abre el menú desplegable.
 * - `<PopoverPanel>`: Panel que contiene los elementos del menú desplegable.
 * - `<Dialog>`: Menú lateral para dispositivos móviles.
 * - `<DialogPanel>`: Contenido del menú móvil.
 * - `<Disclosure>`: Elemento desplegable dentro del menú móvil.
 * 
 * TODO: Reemplazar los enlaces `#` y el logo con valores reales.
 * 
 * Tailwind classes:
 * - `bg-white`: Fondo blanco.
 * - `mx-auto`: Centra el contenido horizontalmente.
 * - `flex items-center justify-between`: Establece el contenido como flexbox y justifica los elementos entre sí.
 * - `p-6 lg:px-8`: Establece el padding en 6px en pantallas pequeñas y 8px en pantallas grandes.
 * - `hidden lg:flex`: Oculta el contenido en pantallas pequeñas y lo muestra en pantallas grandes.
 * - `flex lg:flex-1`: Establece el contenido como flexbox y lo hace ocupar el 100% del ancho en pantallas grandes.
 * - `gap-x-12`: Establece el espacio entre los elementos en 12px.
 * - `relative`: Establece el posición del elemento como relativa.
 * - `absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in`: Establece el estilo del menú desplegable.
 * - `size-6`: Establece el tamaño del icono en 6px.
 * - `size-11`: Establece el tamaño del icono en 11px.
 * - `flex-none`: Establece el contenido como flexbox y no permite que se cambie de tamaño.
 * - `text-gray-600`: Establece el color del texto como gris claro.
 * - `text-gray-900`: Establece el color del texto como gris oscuro.
 * - `group-hover:bg-gray-50`: Establece el color del fondo del grupo al pasar por encima como gris claro.
 * - `group-hover:text-indigo-600`: Establece el color del texto del grupo al pasar por encima como azul.
 * - `grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50`: Establece el estilo del grid.
 * - `flow-root`: Establece el contenido como un contenedor de flujo.
 * - `space-y-2 py-6`: Establece el espacio vertical entre los elementos en 2px y el padding en 6px.
 * - `rounded-lg`: Establece el estilo del borde como redondeado.
 * - `p-2.5`: Establece el padding en 2.5px.
 * - `text-sm/7`: Establece el tamaño del texto como pequeño.
 * - `font-semibold`: Establece el estilo del texto como seminegrito.
 * - `-mx-3`: Establece el margen horizontal en -3px.
 * - `-m-2.5`: Establece el margen en -2.5px.
 * - `rounded-md`: Establece el estilo del borde como redondeado.
 * - `p-1.5`: Establece el padding en 1.5px.
 * - `pr-20`: Establece el padding horizontal derecho en 20px.
 * - `flex items-center justify-center`: Establece el contenido como flexbox y justifica los elementos entre sí.
 * - `text-md/6`: Establece el tamaño del texto como mediano.
 * - `font-semibold`: Establece el estilo del texto como seminegrito.
 * - `text-gray-900`: Establece el color del texto como gris oscuro.
 * - `hover:bg-gray-50`: Establece el color del fondo al pasar por encima como gris claro.
 * - `hover:text-indigo-600`: Establece el color del texto al pasar por encima como azul.
 * - `group-data-open:rotate-180`: Establece el estilo del icono al abrir el menú como rotado 180 grados.
 * - `flex-auto`: Establece el contenido como flexbox y lo hace ocupar el ancho disponible.
 * - `mt-6`: Establece el margen superior en 6px.
 * - `space-y-2`: Establece el espacio vertical entre los elementos en 2px.
 * - `py-6`: Establece el padding vertical en 6px.
 * - `divide-y divide-gray-500/10`: Establece el estilo del borde como divisor horizontal.
 * - `bg-gray-50`: Establece el color del fondo como gris claro.
 * - `-mx-3`: Establece el margen horizontal en -3px.
 * - `block`: Establece el contenido como un bloque.
 * - `rounded-lg py-2 pr-3.5 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50`: Establece el estilo del menú desplegable.
 * - `-my-6`: Establece el margen vertical en -6px.
 * - `space-y-2`: Establece el espacio vertical entre los elementos en 2px.
 * - `-mx-3 block rounded-lg px-3 py-2 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50`: Establece el estilo del menú desplegable.
 * - `fixed inset-0 z-10`: Establece el estilo del menú lateral como fijo en pantalla.
 * - `lg:hidden`: Oculta el contenido en pantallas grandes.
 * - `fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`: Establece el estilo del menú lateral.
 * - `flex items-center justify-between`: Establece el contenido como flexbox y justifica los elementos entre sí.
 * - `-m-2.5 rounded-md p-2.5 text-gray-700`: Establece el estilo del botón de cierre del menú lateral.
 * - `sr-only`: Establece el contenido como no visible.
 * - `group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50`: Establece el estilo del menú desplegable.
 * - `mt-2 space-y-2`: Establece el margen superior en 2px y el espacio vertical entre los elementos en 2px.
 * - `block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50`: Establece el estilo del menú desplegable.
 * - `py-6`: Establece el padding vertical en 6px.
 * - `space-y-2`: Establece el espacio vertical entre los elementos en 2px.
 * - `bg-gray-50`: Establece el color del fondo como gris claro.
 * - `lg:flex lg:flex-1 lg:justify-end`: Establece el contenido como flexbox y lo hace ocupar el 100% del ancho en pantallas grandes y justifica los elementos a la derecha.
 * - `text-sm/7 font-semibold text-gray-900 hover:bg-gray-50`: Establece el estilo del botón de inicio de sesión.
 * - `mt-2`: Establece el margen superior en 2px.
 * - `flex items-center justify-center rounded-lg py-2 pr-3.5 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50`: Establece el estilo del menú desplegable.
 * - `group-data-open:rotate-180`: Establece el estilo del icono al abrir el menú como rotado 180 grados.
 * - `space-y-2`: Establece el espacio vertical entre los elementos en 2px.
 * - `py-6`: Establece el padding vertical en 6px.
**/
export default function Header( props ) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const handleLoginClick = props.handleLoginClick

    return (

        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex items-center justify-between p-6 lg:px-8">

                {/* Logo */}
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5 pr-20">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="../public/vite.svg"
                            className="h-8 w-auto"
                        />
                    </a>

                    {/* Menú de productos SOLO DESKTOP */}
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <PopoverButton className="flex items-center gap-x-1 text-md/6 font-semibold text-gray-900">
                                Product
                                <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                            </PopoverButton>

                            <PopoverPanel
                                transition
                                className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                            >

                                {/* Productos */}
                                <div className="p-4">
                                    {products.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                                        >
                                            <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
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

                                {/* Acciones */}
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                    {callsToAction.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                                        >
                                            <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>

                        <a href="#" className="text-md/6 font-semibold text-gray-900">
                            Features
                        </a>
                        <a href="#" className="text-md/6 font-semibold text-gray-900">
                            Marketplace
                        </a>
                        <a href="#" className="text-md/6 font-semibold text-gray-900">
                            Company
                        </a>
                    </PopoverGroup>
                </div>

                {/* Botón de apertura de menú SOLO MOVIL */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>



                {/* Botón de login SOLO DESKTOP */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/login" className="text-md/6 font-semibold text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>

            {/* Menú de productos SOLO MOVIL */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="../public/vite.svg"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                                        Product
                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products, ...callsToAction].map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}