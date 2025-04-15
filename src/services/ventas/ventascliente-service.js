import request from '../apiService';

const getVentasClientes = async () => request('/api/v1/ventas/ventascli');
const getVentaCliente = async (num_venta) => request(`/api/v1/ventas/ventascli/${num_venta}`);
const addVentaCliente = async (ventaCliente) => request('/api/v1/ventas/ventascli', 'POST', ventaCliente);
const updateVentaCliente = async (num_venta, updates) => request(`/api/v1/ventas/ventascli/${num_venta}`, 'PUT', updates);
const deleteVentaCliente = async (num_venta) => request(`/api/v1/ventas/ventascli/${num_venta}`, 'DELETE');

export { getVentasClientes, getVentaCliente, addVentaCliente, updateVentaCliente, deleteVentaCliente };
