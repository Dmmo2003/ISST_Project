import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUsuario, getEventosSeguidos, updateUsuario } from './api/perfil'; // Importamos las funciones de la API
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import data from "./constants/data";
import AcordeonEventosPerfil from './AcordeonEventosPerfil';
import CardPerfil from './CardPerfil';
import CardEventosPerfil from './CardEventosPerfil';


// Paleta de colores
const colors = {
  primary: '#219EBC',    // Azul principal
  dark: '#023047',       // Azul oscuro (para texto)
  danger: '#EF4444'      // Rojo para acciones peligrosas
};

export default function Perfil() {


  const [usuario, setUsuario] = useState(null);
  const [eventosSeguidos, setEventosSeguidos] = useState([]);
  const [eventosCreados, setEventosCreados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // const [avatarFile, setAvatarFile] = useState(null);

  // Estado para el formulario de edición
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  // const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const navigate = useNavigate();
  

  const userId = localStorage.getItem('userId');
  useEffect(() => {
    console.log("CAMBIOS DEL DIALOG", nombre, apellido, nombreUsuario, correo, contraseña);
  }, [nombre, apellido, nombreUsuario, correo, contraseña]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarioData = await getUsuario(userId);
        setUsuario(usuarioData);
        setNombre(usuarioData.nombre);
        setUsuarioName(usuarioData.nombreUsuario);

        const eventosData = await getEventosSeguidos(userId);
        setEventosSeguidos(eventosData);

      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // const eventosSeguidos = usuarioActual.gruposSeguidos 
  //   ? usuarioActual.gruposSeguidos
  //       .map(grupo => data.eventos.find(evento => evento && evento.id === grupo.eventoId))
  //       .filter(Boolean)
  //   : [];
  // setEventosSeguidos(eventosSeguidos);

  const handleEditProfile = () => setOpen(true);





  const handleAbandonarEvento = (eventoId) => {
    setEventosSeguidos(eventosSeguidos.filter(e => e.id !== eventoId));
  };

  const handleEliminarEvento = (eventoId) => {
    setEventosCreados(eventosCreados.filter(e => e.id !== eventoId));
  };

  return (
    loading || !usuario ? (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-800">Cargando tu perfil...</p>
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Tarjeta de perfil */}
            <CardPerfil usuario={usuario} setApellido={setApellido} setNombre={setNombre} setUsuarioName={setUsuarioName} setCorreo={setCorreo} setContrasena={setContrasena}  navigate={navigate}/>

            {/* Sección de eventos en columnas paralelas */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CardEventosPerfil
                title="Eventos que Sigues"
                eventos={eventosSeguidos}
                navigate={navigate}
                onAction={handleAbandonarEvento}
                actionText="Dejar de Seguir"
              />
              <CardEventosPerfil
                title="Eventos que Has Creado"
                eventos={eventosCreados}
                navigate={navigate}
                onAction={handleEliminarEvento}
                actionText="Eliminar"
              />
            </div>
          </div>
        </div>
      </div>
    )
  )
};
