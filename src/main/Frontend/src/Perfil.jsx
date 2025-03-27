import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [eventosSeguidos, setEventosSeguidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const usuarioActual = data.usuarios.find(u => u.username === "fer1234");
        setUsuario(usuarioActual);
        const eventos = usuarioActual.gruposSeguidos.map(grupo => {
          const evento = data.eventos.find(evento => evento.id === grupo.eventoId);
          return evento;
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
    navigate('/editar-perfil');
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      {/* Tarjeta de Perfil */}
      <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-800">Perfil de {usuario.nombre}</h2>
          <button
            onClick={handleEditProfile}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Editar Perfil
          </button>
        </div>
        <div className="mt-4 text-lg text-gray-700">
          <p><strong>Nombre de Usuario:</strong> {usuario.username}</p>
          <p><strong>Correo Electrónico:</strong> {usuario.correo}</p>
          <p><strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}</p>
        </div>
      </div>

      {/* Tarjeta de Eventos Seguidos */}
      <div className="w-full max-w-3xl mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Eventos que Sigues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventosSeguidos.map((evento) => (
            <div
              className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={evento.id}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{evento.nombre}</h3>
              <p className="text-gray-600"><strong>Fecha:</strong> {new Date(evento.fecha).toLocaleString()}</p>
              <p className="text-gray-600"><strong>Ubicación:</strong> {evento.ubicacion}</p>
              <p className="text-gray-600"><strong>Categoría:</strong> {evento.categoria}</p>
              <p className="text-gray-500 text-sm mt-2">{evento.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
