import api from './api';

const ponteService = {
  getAll: async () => {
    const response = await api.get('/pontes');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/pontes/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/pontes', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/pontes/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/pontes/${id}`);
    return response.data;
  },

  getPontesByRodovia: async (rodoviaId) => {
    const response = await api.get(`/rodovias/${rodoviaId}/pontes`);
    return response.data;
  },

  getAllWithCoordinates: async () => {
    const response = await api.get('/pontes?with_coordinates=true');
    return response.data;
  },
};

export default ponteService;

