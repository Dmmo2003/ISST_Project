import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { UserContext } from "./context/UserContext";
import { obtenerEventosSeguidos, obtenerGruposSeguidos } from "./api/usuario";
import { AnimatePresence, motion } from "framer-motion";
import { obtenerMensajesGrupo } from "./api/mensajes";
import { Input } from "./components/ui/input";

export default function ChatView({ handleClick }) {
    const [grupos, setGrupos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
    const { user } = useContext(UserContext); // Obtener el usuario logueado

    const load = async () => {
        setLoading(true);
        if (!user) return;

        setTimeout(async () => {
            const eventosSeguidos = await obtenerEventosSeguidos(user.id);
            const gruposSeguidos = await obtenerGruposSeguidos(user.id);

            const mapaEventoIdNombre = {};
            eventosSeguidos.forEach((evento) => {
                mapaEventoIdNombre[evento.id] = evento.nombre;
            });

            const gruposConNombreEvento = gruposSeguidos.map((grupo) => ({
                ...grupo,
                nombreEvento: mapaEventoIdNombre[grupo.eventoId] || "Otro",
            }));

            setGrupos(gruposConNombreEvento);
            setEventos(eventosSeguidos);
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        load();
    }, []);

    const gruposPorEvento = grupos.reduce((acc, grupo) => {
        const nombreEvento = grupo.nombreEvento || "Otro";
        if (!acc[nombreEvento]) acc[nombreEvento] = [];
        acc[nombreEvento].push(grupo);
        return acc;
    }, {});

    useEffect(() => {
        if (grupoSeleccionado) {
            handleGrupoClick();
        }
    }, [grupoSeleccionado]);

    const handleGrupoClick = async () => {
        console.log("Grupo seleccionado:", grupoSeleccionado);
        const chat = await obtenerMensajesGrupo(grupoSeleccionado.id);
        setChat(chat);
        console.log("Mensajes del grupo:", chat);
    };

    return (
        <div className="relative w-full h-full">
            {/* Encabezado */}
            <div className="flex justify-between items-center border-b px-4 py-3 bg-white shadow-md">
                <div className="flex items-center gap-2">
                    {grupoSeleccionado && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setGrupoSeleccionado(null)}
                        >
                            <span className="text-xl">←</span>
                        </Button>
                    )}
                    <h2 className="text-lg font-semibold text-muted-foreground">
                        {grupoSeleccionado ? grupoSeleccionado.nombre : "Tus grupos"}
                    </h2>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                    onClick={handleClick}
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 h-[calc(100%-56px)] relative bg-gray-50">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {Array.from({ length: 3 }).map((_, idx) => (
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
                            ))}
                        </motion.div>
                    ) : grupoSeleccionado ? (
                        <>
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {/* Contenido del chat */}
                                {chat.map((mensaje) => {
                                    const esMio = mensaje.remitenteId === user.id; // Verificar si el mensaje es del usuario logueado
                                    return (
                                        <div
                                            key={mensaje.id}
                                            className={`flex items-start gap-4 p-3 rounded-lg mb-2 ${esMio ? 'bg-blue-500 text-white flex-row-reverse' : 'bg-muted'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${esMio ? 'bg-white text-blue-500' : 'bg-muted text-white'}`}>
                                                    {mensaje.remitenteNombreUsuario[0]}
                                                </div>
                                                <div>
                                                    <div className={`font-medium ${esMio ? 'text-white' : 'text-gray-900'}`}>
                                                        {mensaje.remitenteNombreUsuario || "Anónimo"}
                                                    </div>
                                                    <div className={`text-sm ${esMio ? 'text-white' : 'text-gray-500'}`}>{mensaje.contenido}</div>
                                                </div>
                                            </div>
                                            <div className={`text-xs text-muted-foreground self-end ${esMio ? 'text-white' : ''}`}>
                                                {new Date(mensaje.fecha).toLocaleString()}
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            <div className="flex items-center gap-4 mt-4">
                                <Input placeholder="Escribe tu mensaje..." className="flex-1" />
                                <Button variant="primary">Enviar</Button>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            key="lista"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {Object.entries(gruposPorEvento).map(([evento, grupos]) => (
                                <div key={evento}>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-2">{evento}</h3>
                                    <div className="space-y-2">
                                        {grupos.map((grupo) => (
                                            <div
                                                key={grupo.id}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition"
                                                onClick={() => setGrupoSeleccionado(grupo)}
                                            >
                                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-bold text-sm text-white">
                                                    {grupo.nombre[0]}
                                                </div>
                                                <span className="font-medium">{grupo.nombre}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
