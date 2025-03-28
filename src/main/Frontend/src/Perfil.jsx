import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [eventosSeguidos, setEventosSeguidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false); // Estado para el Dialog
  const [nombre, setNombre] = useState('');
  const [usuarioName, setUsuarioName] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const usuarioActual = data.usuarios.find(u => u.username === "fer1234");
        setUsuario(usuarioActual);
        setNombre(usuarioActual.nombre);
        setUsuarioName(usuarioActual.username);
        const eventos = usuarioActual.gruposSeguidos.map(grupo => {
          return data.eventos.find(evento => evento.id === grupo.eventoId);
        });
        setEventosSeguidos(eventos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Cargando...</p>;
  }

  const handleEditProfile = () => {
    setOpen(true); // Abre el Dialog
  };

  const handleSave = () => {
    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }
    // Aquí podrías agregar la lógica para guardar los cambios
    setOpen(false);
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
          <div className="flex gap-4">
            <ThemeToggle />
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button onClick={handleEditProfile} className="bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300">Editar Perfil</button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <h2 className="text-xl font-bold">Editar Perfil</h2>
                </DialogHeader>
                <div className="w-full p-6 bg-white rounded-2xl">
                  <div className="flex flex-col items-center">
                    <Input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="mt-3 text-center"
                      placeholder="Introduce tu nombre"
                    />
                    <Input
                      value={usuarioName}
                      onChange={(e) => setUsuarioName(e.target.value)}
                      className="text-center"
                      placeholder="Introduce tu nombre de usuario"
                    />
                    <Badge variant="secondary" className="mt-2">
                      Desarrollador Web
                    </Badge>
                  </div>

                  <div className="text-center">
                    <Label htmlFor="contraseña" className="mt-4">Contraseña</Label>
                    <Input
                      id="contraseña"
                      type="password"
                      value={contraseña}
                      onChange={(e) => setContraseña(e.target.value)}
                      placeholder="Introduce tu nueva contraseña"
                    />
                    <Label htmlFor="confirmar-contraseña" className="mt-4">Confirmar Contraseña</Label>
                    <Input
                      id="confirmar-contraseña"
                      type="password"
                      value={confirmarContraseña}
                      onChange={(e) => setConfirmarContraseña(e.target.value)}
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button onClick={handleSave}>Guardar cambios</Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setOpen(false)}>Cerrar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
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
          {eventosSeguidos.map((evento) => (
            <div
              className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={evento.id}
            >
              <h3 className="text-xl font-semibold mb-3">{evento.nombre}</h3>
              <p><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString()}</p>
              <p><strong>Ubicación:</strong> {evento.ubicacion}</p>
              <p><strong>Categoría:</strong> {evento.categoria}</p>
              <p className="text-sm mt-2">{evento.descripcion}</p>

              {/* Botones de acción */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUnfollow(evento.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-300"
                >
                  Dejar de seguir
                </button>
                <button
                  onClick={() => handleMoreInfo(evento.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  +Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
