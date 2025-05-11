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
    <Card className="bg-white shadow-2xl rounded-2xl text-center p-6 border-[#023047]">
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