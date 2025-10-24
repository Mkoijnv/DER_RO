import api from './api';

const rodoviaService = {
  getAll: async () => {
    const response = await api.get('/rodovias');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/rodovias/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/rodovias', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/rodovias/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/rodovias/${id}`);
    return response.data;
  },

  getRodoviaWithPontes: async (id) => {
    const response = await api.get(`/rodovias/${id}/pontes`);
    return response.data;
  },
};

export default rodoviaService;

