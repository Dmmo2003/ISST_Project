import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { eventos } from "./constants/data";

export default function AcordeonEventosPerfil() {
    return (
        <Accordion type="single" collapsible className="w-full space-y-2">
            {eventos.map((evento, index) => (
                evento && (
                    <AccordionItem key={evento.id} value={`item-${index}`} className="border-b-0">
                        <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                            <div className="flex-1 text-left">
                                <h3 className="text-base font-medium text-gray-900 line-clamp-1">
                                    {evento.nombre || 'Evento sin nombre'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {evento.fecha ? new Date(evento.fecha).toLocaleDateString() : 'Fecha no disponible'}
                                </p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3">
                            <div className="space-y-2 text-sm">
                                <p className="flex items-center text-gray-700">
                                    <span className="mr-2">📅</span>
                                    <span>{evento.fecha ? new Date(evento.fecha).toLocaleString() : 'Fecha no disponible'}</span>
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <span className="mr-2">📍</span>
                                    <span className="line-clamp-1">
                                        {evento.ubicacion || 'Ubicación no disponible'}
                                    </span>
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <span className="mr-2">🏷️</span>
                                    <span className="capitalize">
                                        {evento.categoria || 'sin categoría'}
                                    </span>
                                </p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-2 border-primary text-primary hover:bg-primary/10"
                                    onClick={() => navigate(`/eventos/${evento.id}`)}
                                >
                                    Ver detalles
                                </Button>
                                <Button
                                    size="sm"
                                    className="text-white bg-red-500 hover:bg-red-600"
                                    onClick={() => onAction(evento.id)}
                                >
                                    {actionText}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            ))}
        </Accordion>
    );
}
