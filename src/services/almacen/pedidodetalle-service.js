import request from '../apiService';

const getPedidoDetalles = async () => request('/api/v1/almacen/pedidodetalles');
const getPedidoDetalle = async (id) => request(`/api/v1/almacen/pedidodetalles/${id}`);
const addPedidoDetalle = async (pedidoDetalle) => request('/api/v1/almacen/pedidodetalles', 'POST', pedidoDetalle);
const updatePedidoDetalle = async (id, updates) => request(`/api/v1/almacen/pedidodetalles/${id}`, 'PUT', updates);
const deletePedidoDetalle = async (id) => request(`/api/v1/almacen/pedidodetalles/${id}`, 'DELETE');

export { getPedidoDetalles, getPedidoDetalle, addPedidoDetalle, updatePedidoDetalle, deletePedidoDetalle };
