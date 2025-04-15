import request from '../apiService';

const getMenuAsignados = async () => request('/api/v1/configuracion/menusasignados');
const getMenuAsignadoById = async (num_usuario, num_menu) => request(`/api/v1/configuracion/menusasignados/${num_usuario}/${num_menu}`);
const addMenuAsignado = async (menuAsignado) => request('/api/v1/configuracion/menusasignados', 'POST', menuAsignado);
const updateMenuAsignado = async (num_usuario, num_menu, updates) => request(`/api/v1/configuracion/menusasignados/${num_usuario}/${num_menu}`, 'PUT', updates);
const deleteMenuAsignado = async (num_usuario, num_menu) => request(`/api/v1/configuracion/menusasignados/${num_usuario}/${num_menu}`, 'DELETE');

export { getMenuAsignados, getMenuAsignadoById, addMenuAsignado, updateMenuAsignado, deleteMenuAsignado };
