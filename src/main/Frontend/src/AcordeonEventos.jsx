import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
                                <p className="text-sm">
                                    🌟 <strong>Descripción:</strong> {evento.descripcion || "Sin descripción disponible"}
                                </p>
                                <p className="text-sm">
                                    🎟️ <strong>Entradas:</strong> {evento.entradas || "No especificado"}
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
                                    <Button className="w-full" onClick={() => navigate(`/eventos/${evento.id}`)}>
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
