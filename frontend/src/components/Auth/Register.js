import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import authService from '../../services/authService';
import storage from '../../utils/storage';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Efeito para animar a barra de progresso
  useEffect(() => {
    let interval;
    if (loading && progress < 90) {
      interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 15;
          return Math.min(prev + increment, 90);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [loading, progress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirmation) {
      const errorMsg = 'As senhas não coincidem';
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      // Inicia em 10%
      setProgress(10);

      // Faz o registro
      const response = await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.password_confirmation
      );
      
      // Completa a barra (100%)
      setProgress(100);
      
      // Limpa o token e usuário (não fazer login automático)
      storage.removeItem('token');
      storage.removeItem('user');
      
      toast.success('Conta criada com sucesso! Faça login para continuar.');
      
      // Aguarda um pouco para mostrar a barra completa e redireciona para login
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Conta criada! Entre com suas credenciais.',
            email: formData.email 
          } 
        });
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erro ao criar conta. Verifique os dados informados.';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="gov-logo-large">
            <div className="gov-flag-large"></div>
            <span className="gov-text-large">GOVERNO</span>
          </div>
          <h2>Criar Conta</h2>
          <p>Preencha os dados para cadastro</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nome Completo</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Seu nome completo"
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu.email@gov.br"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Mínimo 8 caracteres"
              minLength="8"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirmar Senha</label>
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              placeholder="Confirme sua senha"
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-block ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
          >
            <span className="btn-content">
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Criando conta... {Math.round(progress)}%</span>
                </>
              ) : (
                'Cadastrar'
              )}
            </span>
            {/* Barra de progresso dentro do botão */}
            {loading && (
              <div 
                className="btn-progress-bar" 
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Já tem uma conta?{' '}
            <Link to="/login" className="auth-link">
              Entre aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

