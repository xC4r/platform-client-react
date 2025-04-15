import request from '../apiService';

const getClientes = async () => request('/api/v1/ventas/clientes');
const getCliente = async (num_cliente) => request(`/api/v1/ventas/clientes/${num_cliente}`);
const addCliente = async (cliente) => request('/api/v1/ventas/clientes', 'POST', cliente);
const updateCliente = async (num_cliente, updates) => request(`/api/v1/ventas/clientes/${num_cliente}`, 'PUT', updates);
const deleteCliente = async (num_cliente) => request(`/api/v1/ventas/clientes/${num_cliente}`, 'DELETE');

export { getClientes, getCliente, addCliente, updateCliente, deleteCliente };
