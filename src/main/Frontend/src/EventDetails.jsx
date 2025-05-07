// import React, { useState, useEffect, useContext } from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useParams } from "react-router-dom";
// import { UserContext } from "./context/UserContext";
// import { obtenerGruposEvento, usuarioEstaEnGrupo } from "./api/grupos";
// import { obtenerEventoConOrganizador, obtenerRelacionUsuarioEvento } from "./api/eventos";
// import { seguirEvento, dejarSeguirEvento } from "./api/usuario";
// import GroupList from "./GroupList";

// const EventDetails = () => {
//   const [estaSiguiendo, setEstaSiguiendo] = useState(false);
//   const [evento, setEvento] = useState({});
//   const [organizador, setOrganizador] = useState({});
//   const [grupos, setGrupos] = useState([]);
//   const [gruposSeguidos, setGruposSeguidos] = useState([]);
//   const { id } = useParams();
//   const { user } = useContext(UserContext);
//   const [error, setError] = useState(null);

//   const load = async (id) => {
//     try {
//       if (!user || !user.id) return;

//       const data = await obtenerEventoConOrganizador(id);
//       if (!data) throw new Error("No se encontró el evento");

//       setEvento(data.evento);
//       setOrganizador(data.organizador);

//       const relacion = await obtenerRelacionUsuarioEvento(id, user.id);
//       setEstaSiguiendo(relacion);

//       const gruposEventoData = await obtenerGruposEvento(id);
//       setGrupos(gruposEventoData);

//       for (const grupo of gruposEventoData) {
//         const sigue = await usuarioEstaEnGrupo(grupo.id, user.id);
//         if (sigue) {
//           setGruposSeguidos((prev) => [...prev, grupo]);
//         }
//       }
//     } catch (err) {
//       setError(`Error al cargar datos: ${err.message}`);
//       console.error(err);
//     }
//   };

//   console.log("USuario", user);

//   useEffect(() => {
//     load(id);
//   }, [user, id]);

//   const handleFollow = async () => {
//     try {
//       if (estaSiguiendo) {
//         await dejarSeguirEvento(user.id, id);
//       } else {
//         await seguirEvento(user.id, id);
//       }
//       const nuevaRelacion = await obtenerRelacionUsuarioEvento(id, user.id);
//       setEstaSiguiendo(nuevaRelacion);
//     } catch (error) {
//       console.error("Error al cambiar seguimiento:", error);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-8 py-6"
//       style={{ backgroundImage: "url('/images/fondoDetalle.jpg')" }}
//     >
//       <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-[#023047] to-[#004e7c] text-white p-6 w-full max-w-2xl">
//         <CardHeader className="text-center">
//           <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{evento.nombre}</h1>
//           <p className="text-white text-sm md:text-base mt-2">{evento.fecha}</p>
//         </CardHeader>
//         <CardContent>
//           <p className="text-justify text-white text-sm md:text-base">{evento.descripcion}</p>
//           <p className="mt-4 text-sm md:text-base">
//             Ubicación: <span className="font-medium">{evento.ubicacion}</span>
//           </p>
//           <Button
//             onClick={handleFollow}
//             className="mt-6 w-full md:w-auto bg-white text-[#023047] hover:bg-gray-300 transition-colors duration-200 rounded-lg shadow-lg"
//             variant={estaSiguiendo ? "destructive" : "default"}
//           >
//             {estaSiguiendo ? "Siguiendo ✅" : "Seguir evento"}
//           </Button>
//         </CardContent>
//       </Card>

//       <div className="mt-8 bg-[#023047] text-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
//         <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center mb-4">Grupos asociados</h2>
//         <GroupList grupos={grupos} gruposSeguidos={gruposSeguidos} />
//       </div>
//     </div>
//   );
// };

// export default EventDetails;


import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import {
  obtenerEventoConOrganizador,
  obtenerRelacionUsuarioEvento,
} from "./api/eventos";
import {
  obtenerGruposEvento,
  usuarioEstaEnGrupo,
} from "./api/grupos";
import { seguirEvento, dejarSeguirEvento } from "./api/usuario";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { entrarAGrupo, salirDeGrupo } from "./api/grupos";
import { getUsuario } from "./api/perfil";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Heart, X } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "300px",
};

// const googleMapsApiKey = config.googleMapsApiKey;



const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [evento, setEvento] = useState(null);
  const [organizador, setOrganizador] = useState(null);
  const [estaSiguiendo, setEstaSiguiendo] = useState(false);
  const [grupos, setGrupos] = useState([]);
  const [coordenadas, setCoordenadas] = useState(null);

  const obtenerCoordenadas = async (direccion) => {
    const apiKey = "AIzaSyDom-bBHqqlpEbgMtYHU97FnxkssLgSn40"; // Cambia por tu clave
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=${apiKey}`;

    try {
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      if (datos.status === "OK") {
        const ubicacion = datos.results[0].geometry.location;
        return { lat: ubicacion.lat, lng: ubicacion.lng };
      } else {
        console.error("Error en geocodificación:", datos.status);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener coordenadas:", error);
      return null;
    }
  };



  // useEffect(() => {
  //   const loadData = async () => {
  //     if (!user?.id) return;

  //     try {
  //       const data = await obtenerEventoConOrganizador(id);
  //       console.log(data);
  //       setEvento(data.evento);
  //       setOrganizador(data.organizador);

  //       const relacion = await obtenerRelacionUsuarioEvento(id, user.id);
  //       setEstaSiguiendo(relacion);

  //       const gruposData = await obtenerGruposEvento(id);
  //       const gruposConSigue = await Promise.all(
  //         gruposData.map(async (grupo) => {
  //           const sigue = await usuarioEstaEnGrupo(grupo.id, user.id);
  //           const admin = await getUsuario(grupo.adminId);
  //           return { ...grupo, usuarioSigue: sigue, admin };
  //         })
  //       );

  //       console.log(gruposConSigue);

  //       setGrupos(gruposConSigue);
  //     } catch (err) {
  //       console.error("Error al cargar datos del evento:", err);
  //     }
  //   };

  //   loadData();
  // }, [user, id]);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return;

      try {
        const data = await obtenerEventoConOrganizador(id);
        setEvento(data.evento);
        setOrganizador(data.organizador);

        const relacion = await obtenerRelacionUsuarioEvento(id, user.id);
        setEstaSiguiendo(relacion);

        const gruposData = await obtenerGruposEvento(id);
        const gruposConSigue = await Promise.all(
          gruposData.map(async (grupo) => {
            const sigue = await usuarioEstaEnGrupo(grupo.id, user.id);
            const admin = await getUsuario(grupo.adminId);
            return { ...grupo, usuarioSigue: sigue, admin };
          })
        );

        setGrupos(gruposConSigue);

        // Coordenadas por dirección si no están definidas
        if (!data.evento.latitud || !data.evento.longitud) {
          const coords = await obtenerCoordenadas(data.evento.ubicacion);
          if (coords) {
            setCoordenadas(coords);
          }
        } else {
          setCoordenadas({
            lat: data.evento.latitud,
            lng: data.evento.longitud,
          });
        }
      } catch (err) {
        console.error("Error al cargar datos del evento:", err);
      }
    };

    loadData();
  }, [user, id]);


  const handleFollow = async () => {
    try {
      if (estaSiguiendo) {
        const confirmar = window.confirm(
          `¿Estás seguro de que quieres dejar de seguir el evento "${evento.nombre}"? También saldrás de todos los grupos asociados que sigues.`
        );

        if (!confirmar) return;

        // Salir de todos los grupos seguidos
        for (const grupo of grupos) {
          if (grupo.usuarioSigue) {
            try {
              await salirDeGrupo(grupo.id, user.id);
            } catch (err) {
              console.warn(`Error al salir del grupo ${grupo.nombre}:`, err);
            }
          }
        }

        // Actualiza el estado local para reflejar que ya no sigue ningún grupo
        setGrupos(prevGrupos =>
          prevGrupos.map(grupo => ({
            ...grupo,
            usuarioSigue: false
          }))
        );

        // Dejar de seguir el evento
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


  if (!evento) return null;

  const toggleGrupoFollow = async (grupoSeleccionado) => {
    try {
      if (grupoSeleccionado.usuarioSigue) {
        const confirmar = window.confirm(
          `¿Estás seguro de que quieres dejar de seguir al grupo "${grupoSeleccionado.nombre}"?`
        );
        if (!confirmar) return;

        await salirDeGrupo(grupoSeleccionado.id, user.id);
      } else {
        // Si no sigue el evento, lo sigue automáticamente al entrar al grupo
        if (!estaSiguiendo) {
          try {
            await seguirEvento(user.id, id);
            setEstaSiguiendo(true);
            alert(`Ahora sigues el evento "${evento.nombre}" porque has entrado en un grupo asociado.`);
          } catch (err) {
            console.error("Error al seguir el evento automáticamente:", err);
          }
        }

        await entrarAGrupo(grupoSeleccionado.id, user.id);
      }

      setGrupos(prevGrupos =>
        prevGrupos.map(grupo =>
          grupo.id === grupoSeleccionado.id
            ? { ...grupo, usuarioSigue: !grupo.usuarioSigue }
            : grupo
        )
      );
    } catch (error) {
      console.error("Error al seguir/dejar de seguir grupo:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-12 px-4 flex flex-col items-center">

      {/* Card principal del evento */}
      <Card className="w-full max-w-3xl rounded-2xl shadow-md border-[#023047]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-[#023047]">
            {evento.nombre}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(evento.fecha).toLocaleDateString()} • {evento.ubicacion}
          </p>
          <Badge variant="outline" className="text-sm mt-1 w-fit">
            {evento.categoria}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className="text-base text-gray-700 leading-relaxed">
                  {evento.descripcion}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Precio:</strong> {evento.precio}€
                </p>
              </div>
              <Button
                onClick={handleFollow}
                className={`mt-4 w-full sm:w-auto px-4 py-4 text-lg font-bold rounded-2xl shadow-xl transition transform duration-200 ease-in-out active:scale-90 self-start flex items-center gap-2
                    ${estaSiguiendo
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#FB8500] hover:bg-[#FFB703]"} text-white`}
              > 
                {estaSiguiendo ? "Dejar de seguir evento" : "Seguir evento"}
                {estaSiguiendo ? <X size={20} /> : <Heart size={20} fill="white" />}
              </Button>

            </div>


            <div className="w-full h-[300px] rounded-lg overflow-hidden shadow">
              {/* <LoadScript googleMapsApiKey={googleMapsApiKey}> */}
              {coordenadas && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={coordenadas}
                  zoom={18}
                  options={{
                    streetViewControl: false,
                    fullscreenControl: false,
                    disableDefaultUI: true,
                    clickableIcons: false,
                    zoomControl: false,
                  }}
                >
                  <Marker position={coordenadas} title={evento.nombre} />
                </GoogleMap>
              )}

              {/* </LoadScript> */}
            </div>
          </div>
        </CardContent>

      </Card>

      {/* Sección de grupos */}
      <div className="w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-semibold text-[#023047] mb-4">Grupos Asociados</h2>
        <Separator className="mb-6 bg-[#023047]" />

        <div className="grid gap-6">
          {grupos.map((grupo) => (
            <Card key={grupo.id} className="rounded-2xl border border-[#023047] shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl font-medium text-[#023047]">
                  {grupo.nombre}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Creado por: <strong>{grupo.admin.nombreUsuario}</strong>
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700">{grupo.descripcion}</p>

                <div className="flex items-center justify-between flex-wrap gap-2 min-h-[2.5rem]">
                  <div className="w-[160px]">
                    {grupo.usuarioSigue && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-white">
                        Sigues este grupo
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => toggleGrupoFollow(grupo)}
                    className={`mt-1 ${grupo.usuarioSigue
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-[#023047] hover:bg-[#014572]"} text-white transition-colors`}
                  >
                    {grupo.usuarioSigue ? "Dejar de seguir grupo" : "Seguir grupo"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

};

export default EventDetails;
