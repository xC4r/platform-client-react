import request from '../apiService';

const getProveedores = async () => request('/api/v1/ventas/proveedores');
const getProveedor = async (num_proveedor) => request(`/api/v1/ventas/proveedores/${num_proveedor}`);
const addProveedor = async (proveedor) => request('/api/v1/ventas/proveedores', 'POST', proveedor);
const updateProveedor = async (num_proveedor, updates) => request(`/api/v1/ventas/proveedores/${num_proveedor}`, 'PUT', updates);
const deleteProveedor = async (num_proveedor) => request(`/api/v1/ventas/proveedores/${num_proveedor}`, 'DELETE');

export { getProveedores, getProveedor, addProveedor, updateProveedor, deleteProveedor };
