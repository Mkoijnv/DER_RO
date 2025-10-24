import api from './api';

const municipioService = {
  // Listar todos os municípios (com filtro opcional por estado)
  getAll: async (estadoId = null) => {
    const params = estadoId ? { estado_id: estadoId } : {};
    const response = await api.get('/municipios', { params });
    return response.data;
  },

  // Obter um município específico
  getById: async (id) => {
    const response = await api.get(`/municipios/${id}`);
    return response.data;
  },
};

export default municipioService;

