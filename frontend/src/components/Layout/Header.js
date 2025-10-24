import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="gov-logo">
            <img src="/logo-rondonia.jpg" alt="Governo de Rondônia" className="gov-logo-img" />
          </div>
          <h1 className="header-title">Sistema de Gestão de Rodovias e Pontes</h1>
        </div>
        
        {user && (
          <nav className="header-nav">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/rodovias" className="nav-link">Rodovias</Link>
            <Link to="/pontes" className="nav-link">Pontes</Link>
            <Link to="/mapa" className="nav-link">Mapa</Link>
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn-logout">Sair</button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

