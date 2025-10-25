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
      setProgress(10);

      await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.password_confirmation
      );
      
      setProgress(100);
      
      // Limpa o token e usuário (não fazer login automático)
      storage.removeItem('token');
      storage.removeItem('user');
      
      toast.success('Conta criada com sucesso! Faça login para continuar.');
      
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

        {/* Header do Cadastro */}
        <div className="auth-header">
          <h2>Criar Conta</h2>
          <h3>Sistema de Gestão</h3>
          <p className="auth-subtitle">Preencha seus dados para solicitar acesso</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">👤</span>
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Digite seu nome completo"
              autoComplete="name"
            />
          </div>

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
              placeholder="Mínimo 8 caracteres"
              minLength="8"
              autoComplete="new-password"
            />
            <small className="form-hint">Use letras, números e caracteres especiais</small>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">✓</span>
              Confirmar Senha
            </label>
            <input
              type="password"
              name="password_confirmation"
              className="form-control"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              placeholder="Digite a senha novamente"
              autoComplete="new-password"
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
                <>
                  <span>Criar Conta</span>
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
            Já possui uma conta?{' '}
            <Link to="/login" className="auth-link">
              Fazer login
            </Link>
          </p>
          <div className="auth-divider">
            <span>ou</span>
          </div>
          <p className="auth-help">
            Após o cadastro, aguarde a aprovação do administrador
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

export default Register;
