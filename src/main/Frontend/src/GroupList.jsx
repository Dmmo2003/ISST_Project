import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { entrarAGrupo, salirDeGrupo } from "./api/grupos";
import { UserContext } from "./context/UserContext";

const GroupList = ({ grupos, gruposSeguidos }) => {
  // Estado de los grupos con la propiedad usuarioSigue
  const [gruposFinales, setGruposFinales] = useState([]);
  console.log("Grupos finales:", gruposFinales)

  const { user } = useContext(UserContext);

  // Función para verificar si el usuario está en el grupo
  const verificarUsuarioEstaGrupo = () => {
    if (!grupos || grupos.length === 0) return;

    // Mapear los grupos y asignarles el estado usuarioSigue
    const gruposFinalesActualizados = grupos.map((grupo) => {
      const usuarioSigue = gruposSeguidos.some((g) => g.id === grupo.id);
      // console.log(`Grupo: ${grupo.nombre}, usuarioSigue: ${usuarioSigue}`);
      return { ...grupo, usuarioSigue };
    });
    // console.log("Grupos finales actualizados:", gruposFinalesActualizados);

    // Actualizar el estado con los grupos actualizados
    setGruposFinales(gruposFinalesActualizados);
  };


  // Se ejecuta cuando los datos de grupos y gruposSeguidos cambian
  useEffect(() => {
    // console.log("Grupos:", grupos);
    // console.log("Grupos Seguidos:", gruposSeguidos);
    if (grupos.length > 0) {
      verificarUsuarioEstaGrupo();
    }
  }, [grupos, gruposSeguidos]);

  const handleToggleGroup = async (grupoSeleccionado) => {
    if (grupoSeleccionado.usuarioSigue) {
      // Salir del grupo si el usuario ya lo sigue
      const response = await salirDeGrupo(grupoSeleccionado.id, user.id);
      console.log(response);
    } else {
      // Entrar al grupo si el usuario no lo sigue
      const response = await entrarAGrupo(grupoSeleccionado.id, user.id);
      console.log(response);
    }

    setGruposFinales((prevGrupos) =>
      prevGrupos.map((grupo) =>
        grupo.id === grupoSeleccionado.id
          ? { ...grupo, usuarioSigue: !grupo.usuarioSigue }
          : grupo
      )
    );
  };

  // Si no hay grupos disponibles, mostrar un mensaje
  if (gruposFinales.length === 0) {
    return <p className="text-gray-500">No hay grupos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {gruposFinales.map((grupo) => (
        <Card key={grupo.id} className="hover:shadow-lg">
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img
                src={grupo.icon || "/default-icon.png"} // Usar una imagen por defecto si no hay icono
                alt={grupo.nombre}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">{grupo.nombre}</h3>
                <p className="text-sm text-gray-500">{grupo.descripcion}</p>
              </div>
            </div>
            <Button
              onClick={() => handleToggleGroup(grupo)} // Llamar a la función de toggle cuando el botón es clickeado
              className="mt-2 w-full"
              variant={grupo.usuarioSigue ? "destructive" : "default"} // Cambiar el estilo del botón según si sigue o no el grupo
            >
              {grupo.usuarioSigue ? "Salir del grupo" : "Unirse al grupo"} {/* El texto cambia según si lo sigue */}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupList;
