// import { Dialog } from "@headlessui/react";
// import React, { useState } from "react";
// import DialogPerfil from "./DialogPerfil";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// export default function CardPerfil(props) {
//     const [avatarPreview, setAvatarPreview] = useState(null);
//     const usuario = props.usuario;
//     const setApellido = props.setApellido;
//     const setNombre = props.setNombre;
//     const setUsuarioName = props.setUsuarioName;
//     const setCorreo = props.setCorreo;
//     const setContrasena = props.setContrasena;
//     const navigate = props.navigate;
//     const [error, setError] = useState('');

//     //DIALOG
//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatarFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setAvatarPreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <Card className="w-full lg:w-1/3 bg-[#FB8500] shadow-sm">
//             <div className="p-6">
//                 <CardHeader className="flex flex-col items-center">
//                     <div className="relative group mb-4">
//                         <label htmlFor="avatar-upload" className="cursor-pointer">
//                             <Avatar className="w-32 h-32 border-2 border-white">
//                                 <AvatarImage src={avatarPreview || "/default-avatar.jpg"} alt={`Avatar de ${usuario.nombre}`} />
//                                 <AvatarFallback className="text-3xl font-medium bg-white text-[#FB8500]">
//                                     {(usuario.nombre && usuario.nombre.charAt(0)) || ''}
//                                     {(usuario.apellido && usuario.apellido.charAt(0)) || ''}
//                                 </AvatarFallback>
//                             </Avatar>

//                             <input
//                                 id="avatar-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleAvatarChange}
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>

//                     <CardTitle className="text-center text-white">
//                         <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                             {usuario.nombre || 'Nombre no disponible'} {usuario.apellido || ''}
//                         </h2>
//                         <p className="text-sm text-white">
//                             @{usuario.nombreUsuario || 'usuario'}
//                         </p>
//                     </CardTitle>
//                 </CardHeader>

//                 <CardContent className="text-center">
//                     <p className="text-sm break-all text-white">
//                         {usuario.correo || 'correo@no.disponible'}
//                     </p>
//                 </CardContent>

//                 <CardFooter className="flex justify-center">
//                     <DialogPerfil 
//                         usuario={usuario} 
//                         navigate={navigate} 
//                         setApellido={setApellido} 
//                         setNombre={setNombre} 
//                         setUsuarioName={setUsuarioName} 
//                         setCorreo={setCorreo} 
//                         setContrasena={setContrasena} 
//                     />
//                 </CardFooter>
//             </div>
//         </Card>
//     );
// }
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DialogPerfil from "./DialogPerfil";

export default function CardPerfil({ user, setUsuario, navigate }) {
  if (!user) return <div className="text-white text-center">Cargando perfil...</div>;

  const [avatarPreview, setAvatarPreview] = useState(
    user.fotoPerfil ? `data:image/jpeg;base64,${user.fotoPerfil}` : null
  );
  const [error, setError] = useState('');

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`/api/usuarios/${user.id}/foto-perfil`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir la imagen");
      const updatedUser = await res.json();
      setUsuario(updatedUser);
      localStorage.setItem("usuario", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (err) {
      setError("No se pudo subir la imagen.");
    }
  };

  return (
    <Card className="bg-white shadow-2xl rounded-2xl text-center p-6">
      <CardHeader className="flex flex-col items-center space-y-4">
        <label htmlFor="avatar-upload" className="cursor-pointer relative group">
          <Avatar className="w-32 h-32 border-4 border-primary">
            <AvatarImage src={avatarPreview || "/default-avatar.jpg"} alt={`Avatar de ${user.nombre}`} />
            <AvatarFallback className="text-3xl font-bold bg-gray-200 text-primary">
              {(user.nombre?.charAt(0) || '')}{(user.apellido?.charAt(0) || '')}
            </AvatarFallback>
          </Avatar>
          <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
        </label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <CardTitle className="text-xl font-semibold text-gray-900">
          {user.nombre || 'Nombre no disponible'}
        </CardTitle>
        <p className="text-sm text-gray-500">@{user.nombreUsuario || 'usuario'}</p>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600">{user.correo || 'Correo no disponible'}</p>
      </CardContent>

      <CardFooter className="flex justify-center">
        <DialogPerfil user={user} onUpdate={setUsuario} />
      </CardFooter>
    </Card>
  );
}