import api from './api';

const estadoService = {
  // Listar todos os estados
  getAll: async () => {
    const response = await api.get('/estados');
    return response.data;
  },

  // Obter um estado específico
  getById: async (id) => {
    const response = await api.get(`/estados/${id}`);
    return response.data;
  },

  // Obter municípios de um estado
  getMunicipios: async (estadoId) => {
    const response = await api.get(`/estados/${estadoId}/municipios`);
    return response.data;
  },
};

export default estadoService;

