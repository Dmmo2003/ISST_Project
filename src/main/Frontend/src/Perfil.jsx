import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import data from "./constants/data";

// Paleta de colores
const colors = {
  primary: '#219EBC',    // Azul principal
  dark: '#023047',       // Azul oscuro (para texto)
  danger: '#EF4444'      // Rojo para acciones peligrosas
};

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [eventosSeguidos, setEventosSeguidos] = useState([]);
  const [eventosCreados, setEventosCreados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Estado para el formulario de edición
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [usuarioName, setUsuarioName] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const usuarioActual = data.usuarios.find(u => u.username === "fer1234");
      
      if (usuarioActual) {
        setUsuario(usuarioActual);
        setNombre(usuarioActual.nombre || '');
        setApellido(usuarioActual.apellido || '');
        setUsuarioName(usuarioActual.username || '');
        setCorreo(usuarioActual.correo || '');

        const eventosSeguidos = usuarioActual.gruposSeguidos 
          ? usuarioActual.gruposSeguidos
              .map(grupo => data.eventos.find(evento => evento && evento.id === grupo.eventoId))
              .filter(Boolean)
          : [];
        setEventosSeguidos(eventosSeguidos);

        const eventosCreados = data.eventos 
          ? data.eventos.filter(evento => evento && evento.creador === usuarioActual.username)
          : [];
        
        setEventosCreados(eventosCreados);
      }
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAbandonarEvento = (eventoId) => {
    setEventosSeguidos(eventosSeguidos.filter(e => e.id !== eventoId));
  };

  const handleEliminarEvento = (eventoId) => {
    setEventosCreados(eventosCreados.filter(e => e.id !== eventoId));
  };

  if (loading || !usuario) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-800">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tarjeta de perfil */}
          <Card className="w-full lg:w-1/3 bg-white shadow-sm">
            <div className="p-6">
              <CardHeader className="flex flex-col items-center">
                <div className="relative group mb-4">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <Avatar className="w-32 h-32 border-2 border-primary">
                      <AvatarImage src={avatarPreview || "/default-avatar.jpg"} alt={`Avatar de ${usuario.nombre}`} />
                      <AvatarFallback className="text-3xl font-medium bg-primary text-white">
                        {(usuario.nombre && usuario.nombre.charAt(0)) || ''}
                        {(usuario.apellido && usuario.apellido.charAt(0)) || ''}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <CardTitle className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {usuario.nombre || 'Nombre no disponible'} {usuario.apellido || ''}
                  </h2>
                  <p className="text-sm text-gray-600">
                    @{usuario.username || 'usuario'}
                  </p>
                </CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <p className="text-sm break-all text-gray-600">
                  {usuario.correo || 'correo@no.disponible'}
                </p>
              </CardContent>

              <CardFooter className="flex justify-center">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-white"
                    >
                      Editar perfil
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader className="text-xl font-bold text-gray-900">Editar Perfil</DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-gray-700">Nombre</Label>
                        <Input 
                          id="nombre" 
                          value={nombre} 
                          onChange={(e) => setNombre(e.target.value)} 
                          className="w-full"
                          placeholder="Ingresa tu nombre"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido" className="text-gray-700">Apellido</Label>
                        <Input 
                          id="apellido" 
                          value={apellido} 
                          onChange={(e) => setApellido(e.target.value)} 
                          className="w-full"
                          placeholder="Ingresa tu apellido"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="usuario" className="text-gray-700">Usuario</Label>
                        <Input 
                          id="usuario" 
                          value={usuarioName} 
                          onChange={(e) => setUsuarioName(e.target.value)} 
                          disabled 
                          className="w-full bg-gray-100"
                          placeholder="Nombre de usuario"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="correo" className="text-gray-700">Correo</Label>
                        <Input 
                          id="correo" 
                          value={correo} 
                          onChange={(e) => setCorreo(e.target.value)} 
                          className="w-full"
                          placeholder="correo@ejemplo.com"
                          type="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contraseña" className="text-gray-700">Contraseña</Label>
                        <Input 
                          id="contraseña" 
                          type="password" 
                          value={contraseña} 
                          onChange={(e) => setContraseña(e.target.value)} 
                          className="w-full"
                          placeholder="••••••••"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmarContraseña" className="text-gray-700">Confirmar Contraseña</Label>
                        <Input 
                          id="confirmarContraseña" 
                          type="password" 
                          value={confirmarContraseña} 
                          onChange={(e) => setConfirmarContraseña(e.target.value)} 
                          className="w-full"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white"
                        onClick={() => setOpen(false)}
                        disabled={!nombre || !correo}
                      >
                        Guardar cambios
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </div>
          </Card>

          {/* Sección de eventos en columnas paralelas */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProfileSection 
              title="Eventos que Sigues" 
              eventos={eventosSeguidos} 
              navigate={navigate} 
              onAction={handleAbandonarEvento}
              actionText="Dejar de Seguir"
            />
            <ProfileSection 
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
  );
};

const ProfileSection = ({ title, eventos, navigate, onAction, actionText }) => {
  if (!eventos) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4 text-gray-600">Error al cargar los eventos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-gray-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {eventos.length === 0 ? (
          <p className="text-center py-4 text-gray-600">No hay eventos para mostrar</p>
        ) : (
          <Accordion type="single" collapsible className="w-full space-y-2">
            {eventos.map((evento, index) => (
              evento && (
                <AccordionItem key={evento.id} value={`item-${index}`} className="border-b-0">
                  <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div className="flex-1 text-left">
                      <h3 className="text-base font-medium text-gray-900 line-clamp-1">
                        {evento.nombre || 'Evento sin nombre'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {evento.fecha ? new Date(evento.fecha).toLocaleDateString() : 'Fecha no disponible'}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3">
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center text-gray-700">
                        <span className="mr-2">📅</span>
                        <span>{evento.fecha ? new Date(evento.fecha).toLocaleString() : 'Fecha no disponible'}</span>
                      </p>
                      <p className="flex items-center text-gray-700">
                        <span className="mr-2">📍</span>
                        <span className="line-clamp-1">
                          {evento.ubicacion || 'Ubicación no disponible'}
                        </span>
                      </p>
                      <p className="flex items-center text-gray-700">
                        <span className="mr-2">🏷️</span>
                        <span className="capitalize">
                          {evento.categoria || 'sin categoría'}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="mr-2 border-primary text-primary hover:bg-primary/10"
                        onClick={() => navigate(`/evento/${evento.id}`)}
                      >
                        Ver detalles
                      </Button>
                      <Button 
                        size="sm"
                        className="text-white bg-red-500 hover:bg-red-600"
                        onClick={() => onAction(evento.id)}
                      >
                        {actionText}
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default Perfil;