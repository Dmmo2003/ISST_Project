import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";



const GroupList = ({ grupos, gruposSeguidos }) => {
  if (!grupos || grupos.length === 0) {
    return <p className="text-gray-500">No hay grupos disponibles.</p>;
  }

  // Estado para manejar la membresía de los grupos

  // Función para manejar el botón "Unirse al grupo"
  const handleJoinGroup = (groupId) => {
    if (gruposSeguidos.includes(groupId)) {
      return;
    }
    gruposSeguidos.push(groupId);
    console.log(gruposSeguidos);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {grupos.map((grupo) => (
        <Card key={grupo.id} className="hover:shadow-lg">
          <CardContent className="flex flex-col gap-4">
            {/* Información del grupo */}
            <div className="flex items-center gap-4">
              {/* Imagen del grupo */}
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
            {/* Botón "Unirse al grupo" */}
            <Button
              onClick={() => handleJoinGroup(grupo.id)}
              className="mt-2 w-full"
              variant={gruposSeguidos[grupo.id] ? "destructive" : "default"}
            >
              {gruposSeguidos[grupo.id] ? "Salir del grupo" : "Unirse al grupo"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupList;
