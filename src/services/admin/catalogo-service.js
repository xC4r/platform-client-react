import request from '../apiService';

const getCatalogos = async () => request('/api/v1/configuracion/catalogos');
const getCatalogoById = async (cod_catalogo) => request(`/api/v1/configuracion/catalogos/${cod_catalogo}`);
const addCatalogo = async (catalogo) => request('/api/v1/configuracion/catalogos', 'POST', catalogo);
const updateCatalogo = async (cod_catalogo, updates) => request(`/api/v1/configuracion/catalogos/${cod_catalogo}`, 'PUT', updates);
const deleteCatalogo = async (cod_catalogo) => request(`/api/v1/configuracion/catalogos/${cod_catalogo}`, 'DELETE');

export { getCatalogos, getCatalogoById, addCatalogo, updateCatalogo, deleteCatalogo };
