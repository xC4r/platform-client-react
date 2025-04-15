import request from '../apiService';

// Funciones centralizadas en API Service
const getInventarios = async () => request('/api/v1/almacen/inventarios');
const getInventario = async (id) => request(`/api/v1/almacen/inventarios/${id}`);
const addInventario = async (inventario) => request('/api/v1/almacen/inventarios', 'POST', inventario);
const updateInventario = async (id, updates) => request(`/api/v1/almacen/inventarios/${id}`, 'PUT', updates);
const deleteInventario = async (id) => request(`/api/v1/almacen/inventarios/${id}`, 'DELETE');

export { getInventarios, getInventario, addInventario, updateInventario, deleteInventario };
