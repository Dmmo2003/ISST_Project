import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import datos_probar from "./constants/datos_probar.json";
import GroupList from "./GroupList";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { obtenerGruposEvento } from "./api/grupos";
import { obtenerEventoConOrganizador } from "./api/eventos";
import { obtenerRelacionUsuarioEvento } from "./api/eventos";

const EventDetails = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [evento, setEvento] = useState({});
  const [organizador, setOrganizador] = useState({});
  const event = datos_probar.event;
  const { id } = useParams();
  const { user, logout } = useContext(UserContext);

  const [error, setError] = useState(null);

  console.log("ID del evento:", id);
  // console.log("id del usuairio:", user.id);

  // const load = async (id) => {
  //   try {

  //     if (!user || !user.id) {
  //       setError("Usuario no válido");
  //       console.error("Error cargando el evento o los grupos:");
  //       return;
  //     }

  //     // Obtener el evento con el organizador
  //     const data = await obtenerEventoConOrganizador(id);
  //     const eventosBackend = data.evento;
  //     const organizadorBackend = data.organizador;
  //     setEvento(eventosBackend);
  //     setOrganizador(organizadorBackend);
  //     console.log("Evento:", eventosBackend);
  //     console.log("Organizador:", organizadorBackend);

  //     // const relacionesUsuarioGrupoBackend = await obtenerRelacionUsuarioGrupo(id)
  //     const relacionUsuarioEventoBackend = await obtenerRelacionUsuarioEvento(id, user.id) // Backend

  //     console.log("Relacion Usuario Evento:", relacionUsuarioEventoBackend);

  //     // Obtener los grupos del evento
  //     const gruposEventoData = await obtenerGruposEvento(id);
  //     setGrupos(gruposEventoData);
  //     console.log("Grupos del Evento:", gruposEventoData);
  //   } catch (error) {
  //     setError("Error al cargar los datos");
  //     console.error("Error cargando el evento o los grupos:", error);
  //   }
  // };

  const load = async (id) => {
    try {

      // Obtener el evento con el organizador
      const data = await obtenerEventoConOrganizador(id);
      if (!data) {
        throw new Error("No se encontró el evento con organizador");
      }

      const eventosBackend = data.evento;
      const organizadorBackend = data.organizador;
      setEvento(eventosBackend);
      setOrganizador(organizadorBackend);
      console.log("Evento:", eventosBackend);
      console.log("Organizador:", organizadorBackend);


      // Obtener la relación usuario-evento
      const relacionUsuarioEventoBackend = await obtenerRelacionUsuarioEvento(id, user.id);
      if (relacionUsuarioEventoBackend) {
        setIsFollowing(relacionUsuarioEventoBackend);
      }
      console.log("Relacion Usuario Evento:", relacionUsuarioEventoBackend);

      
      // Obtener los grupos del evento
      const gruposEventoData = await obtenerGruposEvento(id);
      if (!gruposEventoData) {
        throw new Error("No se encontraron grupos para el evento");
      }
      setGrupos(gruposEventoData);
      console.log("Grupos del Evento:", gruposEventoData);

    } catch (error) {
      setError(`Error al cargar los datos: ${error.message}`);
      console.error("Error cargando el evento o los grupos:", error);
    }
  };

  // Usar useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    load(id);
  }, [user, id]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-6"
      style={{ backgroundImage: "url('/images/fondoDetalle.jpg')" }} // Fondo con imagen
    >
      <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-[#023047] to-[#004e7c] text-white p-6 w-full max-w-2xl">
        <CardHeader className="text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{evento.nombre}</h1>
          <p className="text-white text-sm md:text-base mt-2">{evento.fecha}</p>
        </CardHeader>
        <CardContent>
          <p className="text-justify text-white text-sm md:text-base">
            {evento.descripcion}
          </p>
          <p className="mt-4 text-sm md:text-base">
            Ubicación: <span className="font-medium">{evento.ubicacion}</span>
          </p>
          <Button
            onClick={handleFollow}
            className="mt-6 w-full md:w-auto bg-white text-[#023047] hover:bg-gray-300 transition-colors duration-200 rounded-lg shadow-lg"
            variant={isFollowing ? "destructive" : "default"}
          >
            {isFollowing ? "Siguiendo ✅" : "Seguir evento"}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 bg-[#023047] text-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center mb-4">
          Grupos asociados
        </h2>
        <GroupList grupos={grupos} />
      </div>
    </div>
  );
};

export default EventDetails;
