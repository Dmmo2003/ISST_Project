import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const eventosMock = [
    { id: 1, nombre: "Concierto de Rock", ubicacion: "Madrid", fecha: "2025-04-10" },
    { id: 2, nombre: "Feria de Tecnología", ubicacion: "Barcelona", fecha: "2025-05-15" },
    { id: 3, nombre: "Festival de Jazz", ubicacion: "Sevilla", fecha: "2025-06-22" },
    { id: 4, nombre: "Hackathon de IA", ubicacion: "Valencia", fecha: "2025-07-30" },
    { id: 5, nombre: "Exposición de Arte", ubicacion: "Bilbao", fecha: "2025-09-12" },
];

export default function ListaEventos() {
    const [searchTerm, setSearchTerm] = useState("");

    const eventosFiltrados = eventosMock.filter((evento) =>
        evento.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            {/* Mapa de Google */}
            <div className="relative">
                <iframe
                    title="Mapa de eventos"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373511531693!3d-37.816279779751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf4c0e8479b826e0!2sFederation+Square!5e0!3m2!1sen!2sau!4v1632364288003!5m2!1sen!2sau"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            {/* Sección de eventos */}
            <div className="p-6 flex flex-col space-y-4">
                {/* Filtro de búsqueda */}
                <Input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />

                {/* Lista de eventos */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Eventos Disponibles</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[400px]">
                            {eventosFiltrados.length > 0 ? (
                                eventosFiltrados.map((evento) => (
                                    <div key={evento.id} className="p-4 border-b last:border-b-0">
                                        <h3 className="text-lg font-semibold">{evento.nombre}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            📍 {evento.ubicacion} | 📅 {evento.fecha}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center mt-4">
                                    No se encontraron eventos
                                </p>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
