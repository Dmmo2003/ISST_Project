// import React from "react";
// import { GalleryVerticalEnd } from "lucide-react"
// import { RegisterForm } from "@/components/ui/register-form"

/**
 * Pagina principal de la aplicaci n, que contiene un formulario de inicio de sesi n.
 * La p gina est  dise ada para ser responsiva, es decir, se ajusta al tama o de la pantalla del dispositivo.
 * La clase "flex" se utiliza para definir el contenedor principal como un contenedor flexible.
 * La clase "min-h-screen" se utiliza para definir el tama o m nimo del contenedor principal como la pantalla completa.
 * La clase "flex-col" se utiliza para definir el contenedor principal como un contenedor flexible en columna.
 * La clase "items-center" se utiliza para centrar los elementos del contenedor principal.
 * La clase "justify-center" se utiliza para centrar los elementos del contenedor principal.
 * La clase "gap-6" se utiliza para definir el espacio entre los elementos del contenedor principal.
 * La clase "bg-muted" se utiliza para definir el color de fondo del contenedor principal como un color claro.
 * La clase "p-6" se utiliza para definir el padding del contenedor principal como 6 p xels.
 * La clase "md:p-10" se utiliza para definir el padding del contenedor principal como 10 p xels en dispositivos de tama o mediano.
 *
 * TODO: Añadir los enlaces correctos y la logica de inicio de sesi n.
 * TODO: Traducir los textos al español.
 *
 * Las clases de tailwind se componen de prefijos que indican la propiedad CSS que se est  modificando, seguido de un valor que indica el valor de la propiedad.
 * Por ejemplo, la clase "bg-muted" se compone del prefijo "bg" que indica que se est  modificando la propiedad "background-color", y el valor "muted" que indica que el color de fondo es un color claro.
 * La documentaci n de tailwind se puede encontrar en https://tailwindcss.com/docs/utility-first
 */
// export default function RegisterPage() {
//     return (
//         <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
//           <div className="flex w-full max-w-sm flex-col gap-6">
//             <a href="/" className="flex items-center gap-2 self-center font-medium">
//               <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
//                 <GalleryVerticalEnd className="size-4" />
//               </div>
//               EventConnect
//             </a>
//             <RegisterForm />
//           </div>
//         </div>
//       )
// }


import React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "@/components/ui/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          EventConnect
        </a>
        <RegisterForm />
      </div>
    </div>
  );
}
