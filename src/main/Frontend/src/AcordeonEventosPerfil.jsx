import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function AcordeonEventosPerfil({ eventos, onAction, actionText, navigate }) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {eventos.map((evento) => (
        <AccordionItem key={evento.id} value={`item-${evento.id}`} className="border border-gray-200 rounded-lg">
          <AccordionTrigger className="px-4 py-3 bg-gray-50 rounded-t-lg hover:bg-gray-100">
            <div className="flex-1 text-left">
              <h3 className="text-sm font-medium text-gray-900">{evento.nombre || 'Evento sin nombre'}</h3>
              <p className="text-xs text-gray-500">
                {evento.fecha ? new Date(evento.fecha).toLocaleDateString() : 'Fecha no disponible'}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4 bg-white rounded-b-lg space-y-2">
            <p className="text-sm text-gray-700">📍 {evento.ubicacion || 'Ubicación no disponible'}</p>
            <p className="text-sm text-gray-700">🏷️ {evento.categoria || 'sin categoría'}</p>
            <div className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary hover:bg-primary/10"
                onClick={() => navigate(`/eventos/${evento.id}`)}
              >
                Ver detalles
              </Button>
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => onAction(evento.id)}
              >
                {actionText}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
