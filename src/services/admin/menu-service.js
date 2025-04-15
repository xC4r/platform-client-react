import request from '../apiService';

const getMenus = async () => request('/api/v1/configuracion/menus');
const getMenuById = async (num_menu) => request(`/api/v1/configuracion/menus/${num_menu}`);
const addMenu = async (menu) => request('/api/v1/configuracion/menus', 'POST', menu);
const updateMenu = async (num_menu, updates) => request(`/api/v1/configuracion/menus/${num_menu}`, 'PUT', updates);
const deleteMenu = async (num_menu) => request(`/api/v1/configuracion/menus/${num_menu}`, 'DELETE');

export { getMenus, getMenuById, addMenu, updateMenu, deleteMenu };
