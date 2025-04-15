import request from '../apiService';

const getPersonas = async () => request('/api/v1/configuracion/personas');
const getPersonaById = async (num_persona) => request(`/api/v1/configuracion/personas/${num_persona}`);
const addPersona = async (persona) => request('/api/v1/configuracion/personas', 'POST', persona);
const updatePersona = async (num_persona, updates) => request(`/api/v1/configuracion/personas/${num_persona}`, 'PUT', updates);
const deletePersona = async (num_persona) => request(`/api/v1/configuracion/personas/${num_persona}`, 'DELETE');

export { getPersonas, getPersonaById, addPersona, updatePersona, deletePersona };
