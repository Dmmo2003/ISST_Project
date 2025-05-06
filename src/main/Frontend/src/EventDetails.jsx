import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { obtenerGruposEvento, usuarioEstaEnGrupo } from "./api/grupos";
import { obtenerEventoConOrganizador, obtenerRelacionUsuarioEvento } from "./api/eventos";
import { seguirEvento, dejarSeguirEvento } from "./api/usuario";
import GroupList from "./GroupList";

const EventDetails = () => {
  const [estaSiguiendo, setEstaSiguiendo] = useState(false);
  const [evento, setEvento] = useState({});
  const [organizador, setOrganizador] = useState({});
  const [grupos, setGrupos] = useState([]);
  const [gruposSeguidos, setGruposSeguidos] = useState([]);
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);

  const load = async (id) => {
    try {
      if (!user || !user.id) return;

      const data = await obtenerEventoConOrganizador(id);
      if (!data) throw new Error("No se encontró el evento");

      setEvento(data.evento);
      setOrganizador(data.organizador);

      const relacion = await obtenerRelacionUsuarioEvento(id, user.id);
      setEstaSiguiendo(relacion);

      const gruposEventoData = await obtenerGruposEvento(id);
      setGrupos(gruposEventoData);

      for (const grupo of gruposEventoData) {
        const sigue = await usuarioEstaEnGrupo(grupo.id, user.id);
        if (sigue) {
          setGruposSeguidos((prev) => [...prev, grupo]);
        }
      }
    } catch (err) {
      setError(`Error al cargar datos: ${err.message}`);
      console.error(err);
    }
  };

  useEffect(() => {
    load(id);
  }, [user, id]);

  const handleFollow = async () => {
    try {
      if (estaSiguiendo) {
        await dejarSeguirEvento(user.id, id);
      } else {
        await seguirEvento(user.id, id);
      }
      const nuevaRelacion = await obtenerRelacionUsuarioEvento(id, user.id);
      setEstaSiguiendo(nuevaRelacion);
    } catch (error) {
      console.error("Error al cambiar seguimiento:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-6"
      style={{ backgroundImage: "url('/images/fondoDetalle.jpg')" }}
    >
      <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-[#023047] to-[#004e7c] text-white p-6 w-full max-w-2xl">
        <CardHeader className="text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{evento.nombre}</h1>
          <p className="text-white text-sm md:text-base mt-2">{evento.fecha}</p>
        </CardHeader>
        <CardContent>
          <p className="text-justify text-white text-sm md:text-base">{evento.descripcion}</p>
          <p className="mt-4 text-sm md:text-base">
            Ubicación: <span className="font-medium">{evento.ubicacion}</span>
          </p>
          <Button
            onClick={handleFollow}
            className="mt-6 w-full md:w-auto bg-white text-[#023047] hover:bg-gray-300 transition-colors duration-200 rounded-lg shadow-lg"
            variant={estaSiguiendo ? "destructive" : "default"}
          >
            {estaSiguiendo ? "Siguiendo ✅" : "Seguir evento"}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 bg-[#023047] text-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center mb-4">Grupos asociados</h2>
        <GroupList grupos={grupos} gruposSeguidos={gruposSeguidos} />
      </div>
    </div>
  );
};

export default EventDetails;
