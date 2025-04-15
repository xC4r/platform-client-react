import request from '../apiService';

const getDatacatalogos = async () => request('/api/v1/configuracion/datacatalogos');
const getDatacatalogoById = async (cod_catalogo) => request(`/api/v1/configuracion/datacatalogos/${cod_catalogo}`);
const addDatacatalogo = async (datacatalogo) => request('/api/v1/configuracion/datacatalogos', 'POST', datacatalogo);
const updateDatacatalogo = async (cod_catalogo, updates) => request(`/api/v1/configuracion/datacatalogos/${cod_catalogo}`, 'PUT', updates);
const deleteDatacatalogo = async (cod_catalogo) => request(`/api/v1/configuracion/datacatalogos/${cod_catalogo}`, 'DELETE');

export { getDatacatalogos, getDatacatalogoById, addDatacatalogo, updateDatacatalogo, deleteDatacatalogo };