import { PATH_URL } from '../../utils/config';
import { getToken } from '../../utils/util';
import request from '../apiService';

const getAuthToken = () => localStorage.getItem('authToken');

// Funciones excluidas del centralizado API Service
const getUsuarios = async () => {
  const response = await fetch(`${PATH_URL}/api/v1/usuarios`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  return response.json();
};

const getMenu = async () => {
  const token = getToken();
  if (!token) return false;
  const response = await fetch(`${PATH_URL}/api/v1/usuarios/menu`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  return response.json();
};

// Funciones centralizadas en API Service
const getUsuario = async (numDocumento) => request(`/api/v1/usuarios/${numDocumento}`);
const addUsuario = async (usuario) => request('/api/v1/usuarios', 'POST', usuario);
const updateUsuario = async (numDocumento, updates) => request(`/api/v1/usuarios/${numDocumento}`, 'PUT', updates);
const deleteUsuario = async (numDocumento) => request(`/api/v1/usuarios/${numDocumento}`, 'DELETE');

export { getUsuarios, getUsuario, addUsuario, updateUsuario, deleteUsuario, getMenu };
