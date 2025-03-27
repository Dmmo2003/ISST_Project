import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Juan Pérez");
  const [bio, setBio] = useState("🚀 Apasionado por el desarrollo web y la tecnología. Amante de React y Tailwind CSS.");
  const [username, setUsername] = useState("@juanperez");
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  // Función para manejar el cambio de estado entre edición y visualización
  const toggleEdit = () => setIsEditing(!isEditing);

  // Función para guardar los cambios (puedes agregar una lógica para enviar los datos al servidor)
  const saveChanges = () => {
    setIsEditing(false);
    // Aquí podrías enviar los cambios a un servidor, por ejemplo
    console.log("Cambios guardados:", { name, bio, username, profileImage });
  };

  // Función para manejar el cambio de foto de perfil
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-xl p-6 bg-white rounded-2xl">
        {/* Encabezado con Foto de Perfil */}
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileImage} alt="Foto de perfil" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {isEditing ? (
            <input
              type="file"
              className="mt-3"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          ) : (
            // Nombre editable en modo edición
            <h2 className="text-xl font-bold mt-3">
              {isEditing ? (
                <input
                  type="text"
                  className="w-full text-xl text-center font-bold bg-transparent border-none focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                name
              )}
            </h2>
          )}
          <p className="text-gray-500 text-sm">{username}</p>
          <Badge variant="secondary" className="mt-2">Desarrollador Web</Badge>
        </CardHeader>

        {/* Información de perfil */}
        <CardContent className="text-center">
          {isEditing ? (
            <textarea
              className="w-full p-2 mt-4 border-2 border-gray-300 rounded"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Escribe algo sobre ti..."
            />
          ) : (
            <p className="text-gray-600">{bio}</p>
          )}

          {/* Estadísticas */}
          <div className="flex justify-around mt-4">
            <div>
              <h3 className="font-bold text-lg">120</h3>
              <p className="text-gray-500 text-sm">Publicaciones</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">4.5K</h3>
              <p className="text-gray-500 text-sm">Seguidores</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">320</h3>
              <p className="text-gray-500 text-sm">Siguiendo</p>
            </div>
          </div>
        </CardContent>

        {/* Botón para Editar Perfil */}
        <CardFooter className="flex justify-center">
          {isEditing ? (
            <Button className="w-full" onClick={saveChanges}>Guardar Cambios</Button>
          ) : (
            <Button className="w-full" onClick={toggleEdit}>Editar Perfil</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
