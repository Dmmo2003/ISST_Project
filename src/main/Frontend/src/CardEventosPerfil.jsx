import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AcordeonEventosPerfil from "./AcordeonEventosPerfil";

export default function CardEventosPerfil({ title, eventos, navigate, onAction, actionText }) {

  return (
    <Card className="bg-white border-[#023047] shadow-lg rounded-2xl overflow-hidden mb-4 py-0 pb-6" > {/* Solo margen abajo */}
      <div className="bg-[#023047] px-4 py-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <CardContent className="space-y-2">
        {eventos.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No hay eventos para mostrar</p>
        ) : (
          <AcordeonEventosPerfil
            eventos={eventos}
            onAction={onAction}
            actionText={actionText}
            navigate={navigate}
          />
        )}
      </CardContent>
    </Card>
  );


}
