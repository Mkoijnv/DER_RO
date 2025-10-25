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
    const formData = new FormData();
    
    // Adicionar todos os campos ao FormData
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    const response = await api.post('/pontes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  update: async (id, data) => {
    const formData = new FormData();
    
    // Adicionar todos os campos ao FormData
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });

    // Laravel não suporta PUT com FormData nativamente, usar POST com _method
    formData.append('_method', 'PUT');

    const response = await api.post(`/pontes/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

