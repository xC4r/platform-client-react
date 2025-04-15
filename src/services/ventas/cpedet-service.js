import request from '../apiService';

const getCpeDets = async () => request('/api/v1/ventas/cpedet');
const getCpeDet = async (num_item) => request(`/api/v1/ventas/cpedet/${num_item}`);
const addCpeDet = async (cpedet) => request('/api/v1/ventas/cpedet', 'POST', cpedet);
const updateCpeDet = async (num_item, updates) => request(`/api/v1/ventas/cpedet/${num_item}`, 'PUT', updates);
const deleteCpeDet = async (num_item) => request(`/api/v1/ventas/cpedet/${num_item}`, 'DELETE');

export { getCpeDets, getCpeDet, addCpeDet, updateCpeDet, deleteCpeDet };
