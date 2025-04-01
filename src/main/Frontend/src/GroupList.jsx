import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GroupList = ({ grupos, gruposSeguidos }) => {
  const [gruposSeguidosFinal, setGruposSeguidosFinal] = useState(gruposSeguidos);

  // Función para alternar la membresía del usuario en un grupo
  const handleToggleGroup = (grupo) => {
    setGruposSeguidosFinal((prev) => {
      const estaEnGrupo = prev.some((g) => g.id === grupo.id);
      const nuevoEstado = estaEnGrupo
        ? prev.filter((g) => g.id !== grupo.id) // Si está, lo quitamos
        : [...prev, { ...grupo }]; // Si no está, lo añadimos

      console.log("Nuevo estado de gruposSeguidos:", nuevoEstado); // Debug
      return nuevoEstado; // Retornamos un nuevo array
    });
  };

  //TODOOOOOOOOOOOOOOOO hacer que cambie el boton de unirse al salir
  useEffect(() => {
    console.log("Estado actualizado:", gruposSeguidosFinal);
  }, [gruposSeguidosFinal]); // Monitorea cambios en el estado

  if (!grupos || grupos.length === 0) {
    return <p className="text-gray-500">No hay grupos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {grupos.map((grupo) => {
        const estaEnGrupo = gruposSeguidosFinal.some((g) => g.id === grupo.id);

        console.log(`Grupo ${grupo.id} en gruposSeguidos:`, estaEnGrupo); // Debug

        return (
          <Card key={grupo.id} className="hover:shadow-lg">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={grupo.icon}
                  alt={grupo.nombre}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold">{grupo.nombre}</h3>
                  <p className="text-sm text-gray-500">{grupo.descripcion}</p>
                </div>
              </div>
              <Button
                onClick={() => handleToggleGroup(grupo)}
                className="mt-2 w-full"
                variant={estaEnGrupo ? "destructive" : "default"}
              >
                {estaEnGrupo ? "Salir del grupo" : "Unirse al grupo"}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default GroupList;
