import React from "react";
import { useState } from "react";

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
        }, 500);
    };

    const handleMouseOut = () => {
        setTimeout(() => {
            setVisible(false);
        }, 250);
    };


    return (
        <>
            <Marker
                key={evento.id}
                position={{ lat: evento.lat, lng: evento.lng }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            />

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