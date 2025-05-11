import { useEffect, useState } from 'react';
import { getUsuario, updateUsuario, obtenerEventosCreados } from './api/perfil';
import CardPerfil from './CardPerfil';
import CardEventosPerfil from './CardEventosPerfil';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { UserContext } from "./context/UserContext";
import { obtenerEventosSeguidos } from './api/usuario';
import { dejarSeguirEvento } from './api/usuario';
import { eliminarEvento } from './api/usuario';
import { dejarGrupoPorEvento } from './api/usuario';
import AcordeonEventosPerfil from './AcordeonEventosPerfil';
import { useNavigate } from 'react-router-dom';

const colors = {
  primary: '#219EBC',
  dark: '#023047',
  danger: '#EF4444',
};

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const [eventosSeguidos, setEventosSeguidos] = useState([]);
  const [eventosCreados, setEventosCreados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [nombre, setNombre] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const { user, login, logout } = useContext(UserContext); const navigate = useNavigate();
  console.log("USER", user);

  useEffect(() => {
    if (!user) {
      console.log("No hay user");
      return
    }
    load();
  }, [user]);

  const load = async () => {
    console.log("Hay user", user);
    setUsuario(user);
    const eventosSeguidosData = await obtenerEventosSeguidos(user.id);
    setEventosSeguidos(eventosSeguidosData);
    const eventosCreadosData = await obtenerEventosCreados(user.id);
    setEventosCreados(eventosCreadosData);
    console.log("Eventos creados", eventosCreadosData);
    setLoading(false);
  }


  const handleSave = async () => {
    if (contraseña && contraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setError('');
      const updatedUser = await updateUsuario(userId, {
        nombre,
        nombreUsuario,
        ...(contraseña && { password: contraseña }),
      });

      setUsuario(updatedUser);
      setOpen(false);
    } catch (error) {
      setError('Error al actualizar el perfil. Inténtalo de nuevo.');
    }
  };

  const handleAbandonarEvento = async (eventoId) => {
    try {
      await dejarSeguirEvento(user.id, eventoId);
      await dejarGrupoPorEvento(user.id, eventoId);
      setEventosSeguidos(eventosSeguidos.filter(e => e.id !== eventoId)); // igual que handleEliminarEvento
    } catch (err) {
      console.error("Error al dejar de seguir el evento:", err);
    }
  };

  const handleEliminarEvento = async (eventoId) => {
    try {
      const response = await eliminarEvento(eventoId, user.id);
      console.log(response);
      setEventosCreados(eventosCreados.filter(e => e.id !== eventoId));
      setEventosSeguidos(eventosSeguidos.filter(e => e.id !== eventoId));
    } catch (err) {
      console.error("Error al eliminar el evento:", err);
    }
  };

  return (
    loading ? (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-gray-800">Cargando tu perfil...</p>
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-gray-50 py-12">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:flex lg:items-start">
      {/* Perfil */}
      <div className="lg:w-1/3">
        <CardPerfil user={usuario} setUsuario={setUsuario} navigate={navigate} />
      </div>

      {/* Eventos */}
      <div className="lg:w-2/3 space-y-8">
        <CardEventosPerfil
          title="🎉 Eventos que Sigues"
          eventos={eventosSeguidos}
          navigate={navigate}
          onAction={handleAbandonarEvento}
          actionText="Dejar de Seguir"
        />
        <CardEventosPerfil
          title="📌 Eventos que Has Creado"
          eventos={eventosCreados}
          navigate={navigate}
          onAction={handleEliminarEvento}
          actionText="Eliminar evento"
        />
      </div>
    </div>
  </div>
</div>

    )
  );



}
