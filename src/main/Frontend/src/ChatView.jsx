import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X, MoveLeft, RefreshCcw } from "lucide-react";
import { UserContext } from "./context/UserContext";
import { obtenerEventosSeguidos, obtenerGruposSeguidos } from "./api/usuario";
import { AnimatePresence, motion } from "framer-motion";
import { obtenerMensajesGrupo } from "./api/mensajes";
import { Input } from "./components/ui/input";
import { enviarMensajeGrupo } from "./api/mensajes";
import { Card } from "./components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";

export default function ChatView({ handleClick }) {
    const [grupos, setGrupos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
    const { user } = useContext(UserContext); // Obtener el usuario logueado
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const [fechaVisible, setFechaVisible] = useState("");
    const mensajesPorFecha = agruparMensajesPorFecha(chat);
    const chatEndRef = useRef(null);
    const scrollContainerRef = useRef(null);





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


    const handleMensajeClick = async () => {
        if (!nuevoMensaje.trim() || !grupoSeleccionado) return;

        console.log("Nuevo mensaje:", nuevoMensaje);

        try {
            const mensaje = await enviarMensajeGrupo(grupoSeleccionado.id, nuevoMensaje, user.id,);

            setChat((prevChat) => [...prevChat, mensaje]); // Añade el nuevo mensaje al chat
            setNuevoMensaje(""); // Limpia el campo
            setTimeout(scrollToBottom, 100);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };


    const handleGrupoClick = async () => {
        const chat = await obtenerMensajesGrupo(grupoSeleccionado.id);
        const chatSorted = chat.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setChat(chatSorted);
    };

    useEffect(() => {
        console.log("oooooola");
        if (chat.length > 0) {
            console.log("oooooola");
            setTimeout(scrollToBottom, 294); // Pequeño retraso para asegurar renderizado
        }
    }, [chat]);

    // useLayoutEffect(() => {
    //     if (chat.length > 0 && scrollContainerRef.current) {
    //         const container = scrollContainerRef.current;
    //         container.scrollTop = container.scrollHeight;
    //     }
    // }, [chat]);

    function agruparMensajesPorFecha(mensajes) {
        return mensajes.reduce((acc, mensaje) => {
            const fecha = new Date(mensaje.fecha).toLocaleDateString();
            if (!acc[fecha]) acc[fecha] = [];
            acc[fecha].push(mensaje);
            return acc;
        }, {});
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibles = entries.filter((e) => e.isIntersecting);
                if (visibles.length > 0) {
                    const ultimaVisible = visibles.at(-1); // el más abajo visible
                    const fecha = ultimaVisible?.target.getAttribute("data-fecha");
                    if (fecha) setFechaVisible(fecha);
                }
            },
            {
                root: document.querySelector("#chat-scroll"),
                threshold: 0.6,
            }
        );

        const elementos = document.querySelectorAll("[data-fecha]");
        elementos.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [chat]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView();
        }
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
                            <span className="text-xl"><MoveLeft className="w-5 h-5" /></span>
                        </Button>
                    )}
                    <h2 className="text-lg font-semibold text-muted-foreground">
                        {grupoSeleccionado ? grupoSeleccionado.nombre : "Tus grupos"}
                    </h2>
                </div>
                <div>
                    {grupoSeleccionado ? < Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={handleGrupoClick}
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </Button> : null
                }
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={handleClick}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
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
                        <Card className="h-full flex flex-col">
                            {fechaVisible && (
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground shadow">
                                    {fechaVisible}
                                </div>
                            )}
                            {/* Área de mensajes que hace scroll */}
                            <ScrollArea className="flex-1 overflow-y-auto px-4 py-4" id="chat-scroll" ref={scrollContainerRef}>
                                <div className="flex flex-col gap-3 pb-2">
                                    {Object.entries(mensajesPorFecha).map(([fecha, mensajes]) => (
                                        <div key={fecha}>
                                            <div className="text-center text-xs text-muted-foreground my-2">
                                                {fecha}
                                            </div>

                                            {mensajes.map((mensaje, index) => {
                                                const esMio = mensaje.remitenteId === user.id;
                                                return (
                                                    <div
                                                        key={mensaje.id}
                                                        className={`flex ${esMio ? "justify-end" : "justify-start"} mb-4`}
                                                        data-fecha={index === mensajes.length - 1 ? fecha : undefined}

                                                    >

                                                        <div
                                                            className={`max-w-[75%] p-3 rounded-2xl shadow text-sm ${esMio
                                                                ? "bg-primary text-white rounded-br-none"
                                                                : "bg-muted text-foreground rounded-bl-none"
                                                                }`}
                                                        >
                                                            {!esMio && (
                                                                <div className="text-xs font-semibold text-muted-foreground mb-1">
                                                                    {mensaje.remitenteNombreUsuario}
                                                                </div>
                                                            )}
                                                            <div>{mensaje.contenido}</div>
                                                            <div
                                                                className={`text-[10px] mt-1 text-right ${esMio ? "text-blue-100" : "text-gray-500"
                                                                    }`}
                                                            >
                                                                {new Date(mensaje.fecha).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            <div ref={chatEndRef} /> {/* ⬅ Aquí se hace scroll */}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {/* Input de mensaje fijo abajo */}
                            <div className="border-t p-4 bg-white flex items-center gap-2">
                                <Input
                                    placeholder="Escribe tu mensaje..."
                                    className="flex-1"
                                    value={nuevoMensaje}
                                    onChange={(e) => setNuevoMensaje(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleMensajeClick();
                                    }}
                                />
                                <Button onClick={handleMensajeClick}>Enviar</Button>
                            </div>
                        </Card>

                    ) : (
                        <motion.div
                            key="lista"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {Object.entries(gruposPorEvento).map(([evento, grupos]) => (
                                <div key={evento} className="space-y-3">
                                    <h3 className="text-sm font-semibold text-muted-foreground px-2">{evento}</h3>
                                    <div className="space-y-2">
                                        {grupos.map((grupo) => (
                                            <div
                                                key={grupo.id}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-sm hover:bg-muted transition cursor-pointer"
                                                onClick={() => setGrupoSeleccionado(grupo)}
                                            >
                                                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                    {grupo.nombre[0]}
                                                </div>
                                                <span className="font-medium text-sm">{grupo.nombre}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
