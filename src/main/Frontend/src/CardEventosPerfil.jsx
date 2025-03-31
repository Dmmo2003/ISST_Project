import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CardEventosPerfil({ title, eventos, navigate, onAction, actionText }) {

    return (
        (!eventos) ? (
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="text-gray-900">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center py-4 text-gray-600">Error al cargar los eventos</p>
                </CardContent>
            </Card>
        ) : (
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="text-gray-900">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {eventos.length === 0 ? (
                        <p className="text-center py-4 text-gray-600">No hay eventos para mostrar</p>
                    ) : (
                        <AcordeonEventosPerfil />
                    )}
                </CardContent>
            </Card>
        )
    )
}
