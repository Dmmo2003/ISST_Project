import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUsuario, getEventosSeguidos, updateUsuario } from './api/perfil'; // Importamos las funciones de la API

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [eventosSeguidos, setEventosSeguidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [usuarioName, setUsuarioName] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const navigate = useNavigate();
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

  if (loading) {
    return <p className="text-center text-lg">Cargando...</p>;
  }

  const handleEditProfile = () => setOpen(true);

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
        ...(contraseña && { password: contraseña }) // Solo enviar la contraseña si se ha cambiado
      });

      setUsuario(updatedUser); // Actualizar el estado con los nuevos datos
      setOpen(false);
    } catch (error) {
      setError('Error al actualizar el perfil. Inténtalo de nuevo.');
    }
  };

  const handleUnfollow = (eventoId) => {
    setEventosSeguidos(prevEventos => prevEventos.filter(evento => evento.id !== eventoId));
  };

  const handleMoreInfo = (eventoId) => {
    navigate(`/evento/${eventoId}`);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">

      {/* Tarjeta de Perfil */}
      <div className="w-full max-w-3xl p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Perfil de {usuario.nombre}</h2>

          {/* Botón de Edición de Perfil */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleEditProfile}>Editar Perfil</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar Perfil</DialogTitle>
                <DialogDescription>Modifica los detalles de tu perfil.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nombre" >Nombre</Label>
                  <Input
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="col-span-3"
                    placeholder="Introduce tu nombre"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="usuarioName">Nombre de Usuario</Label>
                  <Input
                    id="usuarioName"
                    value={usuarioName}
                    onChange={(e) => setUsuarioName(e.target.value)}
                    className="col-span-3"
                    placeholder="Introduce tu nombre de usuario"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contraseña" >Contraseña</Label>
                  <Input
                    id="contraseña"
                    type="password"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    className="col-span-3"
                    placeholder="Introduce tu nueva contraseña"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirmar-contraseña" >Confirmar Contraseña</Label>
                  <Input
                    id="confirmar-contraseña"
                    type="password"
                    value={confirmarContraseña}
                    onChange={(e) => setConfirmarContraseña(e.target.value)}
                    className="col-span-3"
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={handleSave}>Guardar cambios</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
        <div className="mt-4 text-lg">
          <p><strong>Nombre de Usuario:</strong> {usuario.username}</p>
          <p><strong>Correo Electrónico:</strong> {usuario.correo}</p>
          <p><strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}</p>
        </div>
      </div>

      {/* Tarjeta de Eventos Seguidos */}
      <div className="w-full max-w-3xl mt-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-semibold mb-6">Eventos que Sigues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventosSeguidos.length > 0 ? (
            eventosSeguidos.map((evento) => (
              <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" key={evento.id}>
                <h3 className="text-xl font-semibold mb-3">{evento.nombre}</h3>
                <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString()}</p>
                <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
                <p><strong>Categoría:</strong> {evento.categoria}</p>
                <p className="text-sm mt-2">{evento.descripcion}</p>

                <div className="mt-4 flex justify-between">
                  <Button variant="destructive" onClick={() => handleUnfollow(evento.id)}>Dejar de seguir</Button>
                  <Button onClick={() => handleMoreInfo(evento.id)}>+Info</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No sigues ningún evento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
