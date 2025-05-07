import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import DialogEventos from "./DialogEventos";
import HoverEvento from "./HoverEvento";
import config from "./config/config";
import { eventosMock } from "./constants/EventosMock";
import CardEventos from "./CardEventos";
import { obtenerEventos, obtenerTodosEventosConOrganizador } from "./api/eventos";


const containerStyle = {
    width: "100%",
    height: "100%",
};
const googleMapsApiKey = config.googleMapsApiKey

export default function ListaEventos(props) {
    const [eventos, setEventos] = useState([]);
    const [organizadores, setOrganizadores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEtiqueta, setSelectedEtiqueta] = useState("todas");
    const [diasFiltro, setDiasFiltro] = useState(30);
    const [ubicacion, setUbicacion] = useState({ lat: 40.4168, lng: -3.7038 });
    const [currentDate] = useState(new Date());
    const navigate = props.navigate
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUbicacion({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                () => console.log("No se pudo obtener la ubicación")
            );
        }
    }, []);

    useEffect(() => {
        // Obtener eventos desde el backend
        const cargarEventos = async () => {
            try {
                // const eventosConOrganizadorBackend = await obtenerTodosEventosConOrganizador();
                // console.log(eventosConOrganizadorBackend);

                // const eventos = eventosConOrganizadorBackend.map((evento) => evento.evento);
                // const organizadores = eventosConOrganizadorBackend.map((evento) => evento.organizador);
                // setEventos(eventos);
                // setOrganizadores(organizadores);

                const eventosBackend = await obtenerEventos();
                setEventos(eventosBackend);
                console.log(eventosBackend);


            } catch (error) {
                console.error("No se pudieron cargar los eventos:", error);
            }
        };

        cargarEventos();
    }, []);

    const eventosFiltrados = eventos.filter((evento) => {
        const cumpleBusqueda = evento.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const cumpleEtiqueta = selectedEtiqueta === "todas" || evento.categoria === selectedEtiqueta;


        const eventoFecha = new Date(evento.fecha);
        const eventoDia = eventoFecha.setHours(0, 0, 0, 0);
        const hoy = new Date(currentDate);
        hoy.setHours(0, 0, 0, 0);

        const diferenciaTiempo = eventoDia - hoy.getTime();
        const diasDiferencia = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

        let cumpleFecha = false;

        if (diasFiltro >= 91) {
            cumpleFecha = true; // mostrar todos
        } else if (diasFiltro === 0) {
            cumpleFecha = diasDiferencia === 0; // solo hoy
        } else {
            cumpleFecha = diasDiferencia >= 0 && diasDiferencia <= diasFiltro;
        }

        return cumpleBusqueda && cumpleEtiqueta && cumpleFecha;
    });



    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 w-full max-w-9xl">
                {/* Mapa de Google con react-google-maps */}
                <div className="w-full lg:col-span-7 h-[400px] lg:h-[800px] rounded-lg overflow-hidden shadow-lg shadow-gray-400 ">
                    {/* <LoadScript googleMapsApiKey={googleMapsApiKey}> */}
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={ubicacion}
                        zoom={15}
                        options={{
                            streetViewControl: false,  // Desactivar Street View
                            fullscreenControl: false, // Desactivar pantalla completa
                            disableDefaultUI: true,     // Desactivar UI predeterminada
                            clickableIcons: false,
                            zoomControl: true
                        }}
                        className="w-full h-full"
                    >
                        {eventosFiltrados.map((evento) => (
                            <HoverEvento key={evento.id} {...evento} />
                        ))}
                    </GoogleMap>
                    {/* </LoadScript> */}
                </div>

                {/* Lista de eventos */}
                <div className="w-full lg:col-span-3 flex flex-col h-[400px] lg:h-[800px]">
                    <CardEventos eventosFiltrados={eventosFiltrados} navigate={navigate} />
                </div>

                {/* Filtros */}
                <div className="w-full lg:col-span-2 gap-y-4">

                    <Card className="p-4 md:p-6 space-y-4 border-[#023047]">
                        <Input
                            type="text"
                            placeholder="Buscar eventos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full"
                        />

                        <Select onValueChange={setSelectedEtiqueta} value={selectedEtiqueta}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filtrar por etiqueta" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todas">Todas</SelectItem>
                                <SelectItem value="Música">Música</SelectItem>
                                <SelectItem value="Tecnología">Tecnología</SelectItem>
                                <SelectItem value="Festival">Festival</SelectItem>
                                <SelectItem value="Programación">Programación</SelectItem>
                                <SelectItem value="Arte">Arte</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium">{diasFiltro >= 91 ? 'Todos los eventos' : diasFiltro === 0 ? 'Eventos hoy' : `Eventos en los próximos ${diasFiltro} días`}</label>
                            <Slider
                                min={0}
                                max={91}
                                step={1}
                                value={[diasFiltro]}
                                onValueChange={(value) => setDiasFiltro(value[0])}
                                className="[&_.bg-primary]:bg-[#FFB703] [&_[role=slider]]:border-[#023047] [&_[role=slider]]:bg-[#023047]"
                            />
                        </div>

                        <Button className="w-full bg-[#FB8500] text-[#023047] hover:bg-[#023047] hover:text-[#FB8500]" onClick={() => { setSelectedEtiqueta("todas"); setDiasFiltro(30); }}>
                            Restablecer filtros
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
