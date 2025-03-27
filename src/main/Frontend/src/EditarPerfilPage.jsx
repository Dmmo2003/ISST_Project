import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function EditarPerfilPage() {
  const navigate = useNavigate();
  const [usuarioData, setUsuarioData] = useState(null);
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [editando, setEditando] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const usuarioData = data.usuarios.find((user) => user.username === "fer1234");
        setUsuarioData(usuarioData);
        setNombre(usuarioData.nombre);
        setUsuario(usuarioData.username);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }, []);

  const handleSave = () => {
    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setEditando(false);
    navigate("/perfil");
  };

  if (!usuarioData) return <p>Cargando...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-xl p-6 bg-white rounded-2xl">
        <CardHeader className="flex flex-col items-center">
          {/* Ya no usamos el Avatar */}
          {editando ? (
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-3 text-center"
              placeholder="Introduce tu nombre"
            />
          ) : (
            <h2 className="text-xl font-bold mt-3">{nombre}</h2>
          )}
          {editando ? (
            <Input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="text-center"
              placeholder="Introduce tu nombre de usuario"
            />
          ) : (
            <p className="text-gray-500 text-sm">{usuario}</p>
          )}
          <Badge variant="secondary" className="mt-2">
            Desarrollador Web
          </Badge>
        </CardHeader>

        <CardContent className="text-center">
          {editando && (
            <>
              <Label htmlFor="contraseña" className="mt-4">Contraseña</Label>
              <Input
                id="contraseña"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Introduce tu nueva contraseña"
              />

              <Label htmlFor="confirmar-contraseña" className="mt-4">Confirmar Contraseña</Label>
              <Input
                id="confirmar-contraseña"
                type="password"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
              />
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          {editando ? (
            <Button className="w-full" onClick={handleSave}>Guardar cambios</Button>
          ) : (
            <Button className="w-full" onClick={() => setEditando(true)}>Editar Perfil</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
