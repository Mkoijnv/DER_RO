import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import authService from '../../services/authService';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

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
      // Simula progresso até 90% durante o loading
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
    setLoading(true);
    setProgress(0);

    try {
      // Inicia em 10%
      setProgress(10);
      
      // Faz o login
      await authService.login(formData.email, formData.password);
      
      // Completa a barra (100%)
      setProgress(100);
      
      toast.success('Login realizado com sucesso!');
      
      // Aguarda um pouco para mostrar a barra completa
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      setProgress(0); // Reseta a barra em caso de erro
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
          <h2>Sistema de Gestão de Rodovias</h2>
          <p>Entre com suas credenciais</p>
        </div>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="••••••••"
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
                  <span>Autenticando... {Math.round(progress)}%</span>
                </>
              ) : (
                'Entrar'
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
            Não tem uma conta?{' '}
            <Link to="/register" className="auth-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

