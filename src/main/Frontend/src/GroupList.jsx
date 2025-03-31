import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GroupList = ({ groups }) => {
  if (!groups || groups.length === 0) {
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
      {groups.map((group) => (
        <Card key={group.id} className="hover:shadow-lg">
          <CardContent className="flex flex-col gap-4">
            {/* Información del grupo */}
            <div className="flex items-center gap-4">
              {/* Imagen del grupo */}
              <img
                src={group.icon}
                alt={group.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">{group.name}</h3>
                <p className="text-sm text-gray-500">{group.description}</p>
              </div>
            </div>

            {/* Botón "Unirse al grupo" */}
            <Button
              onClick={() => handleJoinGroup(group.id)}
              className="mt-2 w-full"
              variant={joinedGroups[group.id] ? "destructive" : "default"}
            >
              {joinedGroups[group.id] ? "Salir del grupo" : "Unirse al grupo"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupList;
