import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GroupList = ({ grupos }) => {
  if (!grupos || grupos.length === 0) {
    return <p className="text-gray-500">No hay grupos disponibles.</p>;
  }

  // Estado para manejar la membresía de los grupos
  const [joinedGroups, setJoinedGroups] = useState({});

  // Función para manejar el botón "Unirse al grupo"
  const handleJoinGroup = (groupId) => {
    setJoinedGroups((prevState) => ({
      ...prevState,
      [groupId]: !prevState[groupId], // Alternar entre unido/no unido
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {grupos.map((grupos) => (
        <Card key={grupos.id} className="hover:shadow-lg">
          <CardContent className="flex flex-col gap-4">
            {/* Información del grupo */}
            <div className="flex items-center gap-4">
              {/* Imagen del grupo */}
              <img
                src={grupos.icon}
                alt={grupos.nombre}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">{grupos.nombre}</h3>
                <p className="text-sm text-gray-500">{grupos.descripcion}</p>
              </div>
            </div>

            {/* Botón "Unirse al grupo" */}
            <Button
              onClick={() => handleJoinGroup(grupos.id)}
              className="mt-2 w-full"
              variant={joinedGroups[grupos.id] ? "destructive" : "default"}
            >
              {joinedGroups[grupos.id] ? "Salir del grupo" : "Unirse al grupo"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupList;
