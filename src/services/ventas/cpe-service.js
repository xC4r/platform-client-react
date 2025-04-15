import request from '../apiService';

const getCpes = async () => request('/api/v1/ventas/cpe');
const getCpe = async (num_cpe) => request(`/api/v1/ventas/cpe/${num_cpe}`);
const addCpe = async (cpe) => request('/api/v1/ventas/cpe', 'POST', cpe);
const updateCpe = async (num_cpe, updates) => request(`/api/v1/ventas/cpe/${num_cpe}`, 'PUT', updates);
const deleteCpe = async (num_cpe) => request(`/api/v1/ventas/cpe/${num_cpe}`, 'DELETE');

export { getCpes, getCpe, addCpe, updateCpe, deleteCpe };
