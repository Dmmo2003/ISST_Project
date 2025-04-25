import React, { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { X } from "lucide-react"
import { UserContext } from "./context/UserContext"
import { obtenerEventosSeguidos, obtenerGruposSeguidos } from "./api/usuario"

export default function ChatView({ handleClick }) {
    const [grupos, setGrupos] = useState([])
    const [eventos, setEventos] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)

    const load = async () => {
        setLoading(true)
        if (!user) return

        setTimeout(async () => {
            const eventosSeguidos = await obtenerEventosSeguidos(user.id)
            const gruposSeguidos = await obtenerGruposSeguidos(user.id)

            console.log("Grupos:", gruposSeguidos)
            console.log("Eventos:", eventosSeguidos)

            // Crear un mapa de eventoId -> nombreEvento
            const mapaEventoIdNombre = {}
            eventosSeguidos.forEach(evento => {
                mapaEventoIdNombre[evento.id] = evento.nombre
            })

            // Agregar el nombre del evento a cada grupo
            const gruposConNombreEvento = gruposSeguidos.map(grupo => ({
                ...grupo,
                nombreEvento: mapaEventoIdNombre[grupo.eventoId] || "Otro"
            }))

            setGrupos(gruposConNombreEvento)
            setEventos(eventosSeguidos)
            setLoading(false)
        }, 2000)
    }

    useEffect(() => {
        load()
    }, [])

    // Agrupar los grupos por nombre del evento
    const gruposPorEvento = grupos.reduce((acc, grupo) => {
        const nombreEvento = grupo.nombreEvento || "Otro"
        if (!acc[nombreEvento]) acc[nombreEvento] = []
        acc[nombreEvento].push(grupo)
        return acc
    }, {})


    return (
        <div className="relative w-full h-full">
            {/* Encabezado */}
            <div className="flex justify-between items-center border-b px-4 py-3">
                <h2 className="text-lg font-semibold">Tus grupos</h2>
                <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={handleClick}>
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Lista scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 h-[calc(100%-56px)]">
                {loading
                    ? Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx}>
                            <Skeleton className="h-5 w-[180px] mb-2 rounded-md" />
                            {Array.from({ length: 2 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-background mb-2"
                                >
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <Skeleton className="h-4 w-[150px] rounded-md" />
                                </div>
                            ))}
                        </div>
                    ))
                    : Object.entries(gruposPorEvento).map(([evento, grupos]) => (
                        <div key={evento}>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">{evento}</h3>
                            <div className="space-y-2">
                                {grupos.map((grupo) => (
                                    <div
                                        key={grupo.id}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition"
                                    >
                                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-bold text-sm">
                                            {grupo.nombre[0]}
                                        </div>
                                        <span className="font-medium">{grupo.nombre}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
