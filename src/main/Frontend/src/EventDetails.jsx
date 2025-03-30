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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{event.name}</h1>
          <p className="text-gray-500 text-sm md:text-base">{event.date}</p>

        </CardHeader>
        <CardContent>
          <p className="text-justify text-gray-700 text-sm md:text-base">
            {event.description}
          </p>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            Ubicación: <span className="font-medium">{event.location}</span>
          </p>
          <Button 
            onClick={handleFollow} 
            className="mt-6 w-full md:w-auto"
            variant={isFollowing ? "destructive" : "default"}
          >
            {isFollowing ? "Siguiendo ✅" : "Seguir evento"}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Grupos asociados
        </h2>
        <GroupList groups={event.groups} />
      </div>
    </div>
  );
};

export default EventDetails;
