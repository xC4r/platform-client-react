import { PATH_URL } from '../utils/config';
import { getToken, removeToken } from '../utils/util';

// Determinar el entorno actual
const isProduction = process.env.NODE_ENV === 'production';

const request = async (endpoint, method = 'GET', body) => {
  const authToken = getToken();
  // En producción, verificar si la ruta requiere autenticación
  if (!authToken && endpoint !== '/seguridad/login') {
    console.log('Redirigiendo a sin token de sesion');
    removeToken(); 
    window.location.href = '/login';
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Headers adicionales para producción
  if (isProduction) {
    // headers['X-CSRF-Token'] = getCsrfToken(); // Implementar si se usa CSRF
    // headers['X-API-Key'] = process.env.REACT_APP_API_KEY; // Si se usa API Key
  }

  const config = {
    method,
    headers,
    credentials: 'include',
    mode: 'cors',
    // Configuraciones adicionales para producción
    ...(isProduction && {
      // cache: 'no-cache', // Deshabilitar caché en producción
      // redirect: 'follow', // Seguir redirecciones
      // integrity: 'sha256-...', // Verificación de integridad si se usa
    })
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${PATH_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // Manejo específico de errores CORS
    if (error.message.includes('CORS')) {
      console.error('Error de CORS: Verifica la configuración del servidor y las URLs permitidas');
    }
    
    // En producción, no mostrar detalles técnicos al usuario
    if (isProduction) {
      console.error('Error en la petición:', error);
      throw new Error('Error al procesar la solicitud. Por favor, intente nuevamente.');
    }
    
    throw error;
  }
};

export default request;
