import api from './api';
import storage from '../utils/storage';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      storage.setItem('token', response.data.token);
      storage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (name, email, password, password_confirmation) => {
    const response = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation,
    });
    if (response.data.token) {
      storage.setItem('token', response.data.token);
      storage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      storage.removeItem('token');
      storage.removeItem('user');
    }
  },

  getCurrentUser: () => {
    try {
      const userStr = storage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  },

  isAuthenticated: () => {
    try {
      const token = storage.getItem('token');
      const user = storage.getItem('user');
      
      // Verificar se existe token E usuário
      if (!token || !user) {
        // Limpar qualquer dado incompleto
        storage.removeItem('token');
        storage.removeItem('user');
        return false;
      }
      
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default authService;

