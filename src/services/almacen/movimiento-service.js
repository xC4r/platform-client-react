import request from '../apiService';

// Funciones centralizadas en API Service
const getMovimientos = async () => request('/api/v1/almacen/movimientos');
const getMovimiento = async (id) => request(`/api/v1/almacen/movimientos/${id}`);
const addMovimiento = async (movimiento) => request('/api/v1/almacen/movimientos', 'POST', movimiento);
const updateMovimiento = async (id, updates) => request(`/api/v1/almacen/movimientos/${id}`, 'PUT', updates);
const deleteMovimiento = async (id) => request(`/api/v1/almacen/movimientos/${id}`, 'DELETE');

export { getMovimientos, getMovimiento, addMovimiento, updateMovimiento, deleteMovimiento };
