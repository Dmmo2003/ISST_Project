import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import datos_probar from "./constants/datos_probar.json";
import GroupList from "./GroupList";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const event = datos_probar.event;

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-6"
      style={{ backgroundImage: "url('/images/fondoDetalle.jpg')" }} // Fondo con imagen
    >
      <Card className="rounded-2xl shadow-md bg-[#023047] text-white p-6"> 
        <CardHeader className="text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{event.name}</h1>
          <p className="text-white text-sm md:text-base">{event.date}</p>
        </CardHeader>
        <CardContent>
          <p className="text-justify text-white text-sm md:text-base">
            {event.description}
          </p>
          <p className="mt-4 text-sm md:text-base">
            Ubicación: <span className="font-medium">{event.location}</span>
          </p>
          <Button 
            onClick={handleFollow} 
            className="mt-6 w-full md:w-auto bg-white text-[#023047] hover:bg-gray-300"
            variant={isFollowing ? "destructive" : "default"}
          >
            {isFollowing ? "Siguiendo ✅" : "Seguir evento"}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 bg-[#023047] text-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center">
          Grupos asociados
        </h2>
        <GroupList groups={event.groups} />
      </div>
    </div>
  );
};

export default EventDetails;
