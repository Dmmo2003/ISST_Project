import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import datos_probar from "./constants/datos_probar.json"; // Importamos el JSON aquí
import GroupList from "./GroupList";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const event = datos_probar.event; // Obtenemos el evento desde el JSON
  const groups = event.groups; // Obtenemos los grupos
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <p className="text-gray-500">{event.date}</p>
          <p className="text-gray-500">este es el evento con la ruta de id: {id}</p>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
          <p className="text-gray-600">Ubicación: {event.location}</p>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Grupos asociados</h2>
        <GroupList groups={groups} />
      </div>
    </div>
  );
};

export default EventDetails;
