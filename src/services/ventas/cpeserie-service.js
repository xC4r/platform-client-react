import request from '../apiService';

const getCpeSeries = async () => request('/api/v1/ventas/cpeserie');
const getCpeSerie = async (num_serie) => request(`/api/v1/ventas/cpeserie/${num_serie}`);
const addCpeSerie = async (cpeserie) => request('/api/v1/ventas/cpeserie', 'POST', cpeserie);
const updateCpeSerie = async (num_serie, updates) => request(`/api/v1/ventas/cpeserie/${num_serie}`, 'PUT', updates);
const deleteCpeSerie = async (num_serie) => request(`/api/v1/ventas/cpeserie/${num_serie}`, 'DELETE');

export { getCpeSeries, getCpeSerie, addCpeSerie, updateCpeSerie, deleteCpeSerie };
