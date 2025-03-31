import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getUsuario, getEventosSeguidos, updateUsuario } from './api/perfil';
import CardPerfil from './CardPerfil';
import CardEventosPerfil from './CardEventosPerfil';

// Paleta de colores
const colors = {
  primary: '#219EBC',
  dark: '#023047',
  danger: '#EF4444'
};

export default function PerfilPage(props) {
  const navigate = props.navigate;

  const [usuario, setUsuario] = useState(null);
  const [eventosSeguidos, setEventosSeguidos] = useState([]);
  const [eventosCreados, setEventosCreados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Estado para el formulario de edición
  const [nombre, setNombre] = useState('');
  const [usuarioName, setUsuarioName] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarioData = await getUsuario(userId);
        setUsuario(usuarioData);
        setNombre(usuarioData.nombre);
        setUsuarioName(usuarioData.username);

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

  const handleSave = async () => {
    if (contraseña && contraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setError('');
      const updatedUser = await updateUsuario(userId, {
        nombre,
        username: usuarioName,
        ...(contraseña && { password: contraseña })
      });

      setUsuario(updatedUser);
      setOpen(false);
    } catch (error) {
      setError('Error al actualizar el perfil. Inténtalo de nuevo.');
    }
  };

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
      <div 
        className="min-h-screen" 
        style={{ 
          backgroundImage: "url('/images/fondoPerfil.jpg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Tarjeta de perfil */}
            <CardPerfil usuario={usuario} navigate={navigate} />

            {/* Sección de eventos */}
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
  );
}
