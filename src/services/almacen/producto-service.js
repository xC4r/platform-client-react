import request from '../apiService';

const getProductos = async () => request('/api/v1/almacen/productos');
const getProducto = async (id) => request(`/api/v1/almacen/productos/${id}`);
const addProducto = async (producto) => request('/api/v1/almacen/productos', 'POST', producto);
const updateProducto = async (id, updates) => request(`/api/v1/almacen/productos/${id}`, 'PUT', updates);
const deleteProducto = async (id) => request(`/api/v1/almacen/productos/${id}`, 'DELETE');

export { getProductos, getProducto, addProducto, updateProducto, deleteProducto };
