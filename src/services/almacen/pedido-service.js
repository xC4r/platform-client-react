import request from '../apiService';

const getPedidos = async () => request('/api/v1/almacen/pedidos');
const getPedido = async (id) => request(`/api/v1/almacen/pedidos/${id}`);
const addPedido = async (pedido) => request('/api/v1/almacen/pedidos', 'POST', pedido);
const updatePedido = async (id, updates) => request(`/api/v1/almacen/pedidos/${id}`, 'PUT', updates);
const deletePedido = async (id) => request(`/api/v1/almacen/pedidos/${id}`, 'DELETE');
const getMaxNumPedido = async () => request('/api/v1/almacen/maxnumpedido', 'GET');

export { getPedidos, getPedido, addPedido, updatePedido, deletePedido, getMaxNumPedido };
