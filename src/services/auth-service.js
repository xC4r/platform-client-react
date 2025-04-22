import { saveToken } from '../utils/util';
import { PATH_URL } from '../utils/config';
import request from './apiService';

// Método `login` simplificado
const login = async (usuario, clave) => {
  const response = await fetch(`${PATH_URL}/api/v1/seguridad/login`, {
    method: 'POST',
    body: JSON.stringify({ usuario, clave }),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (response.ok) saveToken(data.token);
  if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');
  return data;
};

// Métodos centralizados en `apiService.js`
const logout = () => request('/api/v1/seguridad/logout', 'POST').then(response => response);
const register = (username, password) => request('/api/v1/seguridad/register', 'POST', { username, password });
const forgotPassword = (email) => request('/api/v1/seguridad/forgot-password', 'POST', { email });
const resetPassword = (code, newPassword) => request('/api/v1/seguridad/reset-password', 'POST', { code, newPassword });
const validateToken = async () => {
  try {
    const response = await request('/api/v1/seguridad/verificar-token', 'POST', {});
    return response && response.valid === true; //
  } catch (error) {
    console.error('Error al validar token:', error);
    return false;
  }
};

// Exportación de métodos
export { login, logout, register, forgotPassword, resetPassword, validateToken };
