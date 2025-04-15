import request from '../apiService';

const getEmpresas = async () => request('/api/v1/configuracion/empresas');
const getEmpresaById = async (num_empresa) => request(`/api/v1/configuracion/empresas/${num_empresa}`);
const addEmpresa = async (empresa) => request('/api/v1/configuracion/empresas', 'POST', empresa);
const updateEmpresa = async (num_empresa, updates) => request(`/api/v1/configuracion/empresas/${num_empresa}`, 'PUT', updates);
const deleteEmpresa = async (num_empresa) => request(`/api/v1/configuracion/empresas/${num_empresa}`, 'DELETE');

export { getEmpresas, getEmpresaById, addEmpresa, updateEmpresa, deleteEmpresa };