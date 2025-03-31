import React from "react";
import { useState, useEffect } from "react";

import { CalendarIcon, MapPin } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Marker } from "@react-google-maps/api";

export default function HoverEvento(props) {
    const [evento, setEvento] = useState(props);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState(null);

    const handleMouseOver = (e) => {
        setPosition({ x: e.domEvent.clientX, y: e.domEvent.clientY });

        setTimeout(() => {
            setVisible(true);
        }, 1000);
    };

    const handleMouseOut = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (evento.ubicacion) {
            obtenerCoordenadas(evento.ubicacion)
                .then((coordenadas) => {
                    if (coordenadas) {
                        setEvento(prevEvento => ({
                            ...prevEvento,
                            lat: coordenadas.lat,
                            lng: coordenadas.lng
                        }));
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener coordenadas:", error);
                });
        }
    }, [evento.ubicacion]);
    

    async function obtenerCoordenadas(direccion) {
        const apiKey = "AIzaSyDom-bBHqqlpEbgMtYHU97FnxkssLgSn40"; // Usa tu clave de Google Maps
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${apiKey}`;

        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();

            if (datos.status === "OK") {
                const ubicacion = datos.results[0].geometry.location;
                return { lat: ubicacion.lat, lng: ubicacion.lng };
            } else {
                console.error("Error en la geocodificación:", datos.status);
                return null;
            }
        } catch (error) {
            console.error("Error al obtener coordenadas:", error);
            return null;
        }
    }




    return (
        <>
            {evento.lat && evento.lng && !isNaN(evento.lat) && !isNaN(evento.lng) && (
                <Marker
                    key={evento.id}
                    position={{ lat: evento.lat, lng: evento.lng }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                />
            )}


            {visible && position && (
                <div
                    className="absolute z-50"
                    style={{
                        position: 'fixed',
                        top: position.y + 30,
                        left: position.x + 30,
                        pointerEvents: 'none',
                    }}
                >
                    <HoverCard open={visible}>
                        <HoverCardTrigger>{visible}</HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/vercel.png" />
                                    <AvatarFallback>VC</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">

                                    <h4 className="text-sm font-semibold">{evento.nombre}</h4>

                                    <p className="text-sm">
                                        {evento.descripcion}
                                    </p>

                                    <p className="text-sm">
                                        Creado por {evento.usuario ? evento.usuario : "Anonimo"}
                                    </p>

                                    <div className="flex items-center pt-2">
                                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                                        <span className="text-xs text-muted-foreground">
                                            {evento.fecha}
                                        </span>
                                    </div>

                                    <div className="flex items-center pt-2">
                                        <MapPin className="mr-2 h-4 w-4 opacity-70" />{" "}
                                        <span className="text-xs text-muted-foreground">
                                            {evento.direccion}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            )}
        </>
    );
}