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
      setProgress(10);
      await authService.login(formData.email, formData.password);
      setProgress(100);
      toast.success('Login realizado com sucesso!');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background-pattern"></div>
      
      <div className="auth-card">
        {/* Logo do Governo */}
        <div className="auth-brand">
          <div className="brand-logos">
            <img 
              src="https://cdn.detic.ro.gov.br/imgs/svg/palacio.svg" 
              alt="Palácio do Governo de Rondônia" 
              className="palacio-logo"
            />
            <div className="brand-divider"></div>
            <img 
              src="/logo-rondonia.jpg" 
              alt="Governo de Rondônia" 
              className="governo-logo"
            />
          </div>
          
          <div className="brand-text">
            <h1>Governo de Rondônia</h1>
            <p>Departamento de Estradas de Rodagem e Transportes</p>
          </div>
        </div>

        {/* Header do Login */}
        <div className="auth-header">
          <h2>Sistema de Gestão</h2>
          <h3>Rodovias e Pontes</h3>
          <p className="auth-subtitle">Acesse sua conta para continuar</p>
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

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📧</span>
              E-mail Institucional
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu.email@deter.ro.gov.br"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">🔒</span>
              Senha
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Digite sua senha"
              autoComplete="current-password"
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
                <>
                  <span>Entrar no Sistema</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </span>
            {loading && (
              <div 
                className="btn-progress-bar" 
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Não possui acesso?{' '}
            <Link to="/register" className="auth-link">
              Solicitar cadastro
            </Link>
          </p>
          <div className="auth-divider">
            <span>ou</span>
          </div>
          <p className="auth-help">
            Precisa de ajuda? Entre em contato com o suporte técnico
          </p>
        </div>
      </div>

      {/* Rodapé institucional */}
      <div className="auth-institutional-footer">
        <p>© 2025 Governo do Estado de Rondônia - Todos os direitos reservados</p>
        <p className="footer-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Privacidade</a>
          {' · '}
          <a href="#" onClick={(e) => e.preventDefault()}>Termos de Uso</a>
          {' · '}
          <a href="#" onClick={(e) => e.preventDefault()}>Suporte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
