import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImagenEvento from "./ImagenEvento"; // Ajusta la ruta si es necesario


export default function AcordeonEventos({ eventosFiltrados, navigate }) {
    return (
        <Accordion type="single" collapsible className="w-full space-y-2">
            {eventosFiltrados.map((evento) => (
                <AccordionItem key={evento.id} value={`evento-${evento.id}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="group px-4 py-3 flex justify-between items-center hover:bg-muted transition-colors rounded-md">
                        <div>
                            <h3 className="text-lg font-semibold group-hover:underline">{evento.nombre}</h3>
                            <p className="text-sm text-muted-foreground">

                                📍 {evento.ubicacion}, {evento.direccion} | 📅 {
                                    (() => {
                                        try {
                                            const fechaHora = new Date(evento.fecha); // Asumiendo que evento.fecha ya incluye la fecha y hora
                                            return fechaHora.toLocaleString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            });
                                        } catch (error) {
                                            return "Fecha inválida";
                                        }
                                    })()
                                }

                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="data-[state=open]:animate-accordion-down">
                        <Card className="border-none shadow-sm rounded-md">
                            <CardContent className="p-4 space-y-2">
                                {evento.id && (
                                    <div className="w-full rounded-md bg-black/5 flex justify-center items-center">
                                    <ImagenEvento idEvento={evento.id} />
                                    </div>
                                )}

                                <p className="text-sm">
                                    🌟 <strong>Descripción:</strong> {evento.descripcion || "Sin descripción disponible"}
                                </p>
                                <p className="text-sm">
                                    🎟️ <strong>Entradas:</strong> {evento.precio ? `${evento.precio} €` : "No especificado"}
                                </p>
                                <p className="text-sm">
                                    ⏰ <strong>Horario:</strong> {
                                        (() => {
                                            try {
                                                const fechaHora = new Date(evento.fecha);
                                                return fechaHora.toLocaleString('es-ES', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                });
                                            } catch (error) {
                                                return "Hora inválida";
                                            }
                                        })()
                                    }
                                </p>
                                <div className="pt-2">
                                    <Button className="w-full bg-[#023047] hover:bg-[#219EBC]" onClick={() => navigate(`/eventos/${evento.id}`)}>
                                        ⭐ Me interesa
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
