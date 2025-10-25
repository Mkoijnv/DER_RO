import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/dashboard" className="header-brand">
          <div className="header-logos">
            <img 
              src="https://cdn.detic.ro.gov.br/imgs/svg/palacio.svg" 
              alt="Palácio do Governo" 
              className="header-palacio-logo"
            />
            <div className="header-divider"></div>
            <img 
              src="/logo-rondonia.jpg" 
              alt="Governo de Rondônia" 
              className="header-governo-logo"
            />
          </div>
          <div className="header-title-container">
            <h1 className="header-title">Sistema de Gestão</h1>
            <p className="header-subtitle">Rodovias e Pontes - RO</p>
          </div>
        </Link>
        
        {user && (
          <nav className="header-nav">
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'nav-link-active' : ''}`}>
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </Link>
            <Link to="/rodovias" className={`nav-link ${isActive('/rodovias') ? 'nav-link-active' : ''}`}>
              <span className="nav-icon">🛣️</span>
              <span>Rodovias</span>
            </Link>
            <Link to="/pontes" className={`nav-link ${isActive('/pontes') ? 'nav-link-active' : ''}`}>
              <span className="nav-icon">🌉</span>
              <span>Pontes</span>
            </Link>
            <Link to="/mapa" className={`nav-link ${isActive('/mapa') ? 'nav-link-active' : ''}`}>
              <span className="nav-icon">🗺️</span>
              <span>Mapa</span>
            </Link>
            <div className="user-menu">
              <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">Administrador</span>
              </div>
              <button onClick={handleLogout} className="btn-logout" title="Sair do sistema">
                🚪 Sair
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
