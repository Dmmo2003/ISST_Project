import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import DialogEventos from "./DialogEventos";
import AcordeonEventos from "./AcordeonEventos";

export default function CardEventos(props) {
    const { eventosFiltrados, navigate } = props;
    return (
        <>
            <Card className="flex-1 h-full flex flex-col border border-[#023047] pt-0">
                <CardHeader className="text-center bg-[#023047] rounded-t-xl py-4 text-white">
                    <CardTitle className="text-2xl font-bold">Próximos Eventos</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 overflow-y-auto">
                        <AcordeonEventos eventosFiltrados={eventosFiltrados} navigate={navigate} />
                    </ScrollArea>

                    {/* Dialog para crear eventos */}
                    <DialogEventos />
                </CardContent>
            </Card>

        </>
    )
}