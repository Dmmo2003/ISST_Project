// perfil.js

export async function getUsuario(userId) {
  const response = await fetch(`/api/usuarios/${userId}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos del usuario');
  }
  return response.json();
}

export async function getEventosSeguidos(userId) {
  const response = await fetch(`/api/usuarios/${userId}/eventos-seguidos`);
  if (!response.ok) {
    throw new Error('Error al obtener los eventos seguidos');
  }
  return response.json();
}

export async function getEventosCreados(userId) {
  const response = await fetch(`/api/usuarios/${userId}/eventos-creados`);
  if (!response.ok) {
    throw new Error('Error al obtener los eventos creados');
  }
  return response.json();
}

export async function updateUsuario(userId, data) {
  const response = await fetch(`/api/usuarios/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el usuario');
  }

  return response.json();
}
