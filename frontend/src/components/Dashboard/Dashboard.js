import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import rodoviaService from '../../services/rodoviaService';
import ponteService from '../../services/ponteService';
import authService from '../../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRodovias: 0,
    totalPontes: 0,
    pontesComCoordenadas: 0,
  });
  const [recentRodovias, setRecentRodovias] = useState([]);
  const [recentPontes, setRecentPontes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();

  useEffect(() => {
    // Carrega dados de forma assíncrona (não bloqueia o login)
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Carrega tudo em paralelo de forma não-bloqueante
      const [rodovias, pontes] = await Promise.all([
        rodoviaService.getAll().catch(() => []),
        ponteService.getAll().catch(() => []),
      ]);

      const pontesComCoord = pontes.filter(p => p.latitude && p.longitude).length;

      setStats({
        totalRodovias: rodovias.length,
        totalPontes: pontes.length,
        pontesComCoordenadas: pontesComCoord,
      });

      // Pegar as 5 mais recentes (limita a quantidade de dados)
      setRecentRodovias(rodovias.slice(0, 5));
      setRecentPontes(pontes.slice(0, 5));
      
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      // Sempre para o loading, mesmo em caso de erro
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="welcome-text">Bem-vindo, {user?.name}!</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">🛣️</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalRodovias}</h3>
            <p className="stat-label">Rodovias Cadastradas</p>
          </div>
          <Link to="/rodovias" className="stat-link">
            Ver todas →
          </Link>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">🌉</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalPontes}</h3>
            <p className="stat-label">Pontes Cadastradas</p>
          </div>
          <Link to="/pontes" className="stat-link">
            Ver todas →
          </Link>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon">📍</div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.pontesComCoordenadas}</h3>
            <p className="stat-label">Pontes no Mapa</p>
          </div>
          <Link to="/mapa" className="stat-link">
            Ver mapa →
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header flex-between">
            <h2>Rodovias Recentes</h2>
            <Link to="/rodovias/nova" className="btn btn-sm btn-primary">
              + Adicionar
            </Link>
          </div>
          {recentRodovias.length === 0 ? (
            <p className="empty-message">Nenhuma rodovia cadastrada ainda.</p>
          ) : (
            <div className="list-container">
              {recentRodovias.map((rodovia) => (
                <div key={rodovia.id} className="list-item">
                  <div className="list-item-content">
                    <h4>{rodovia.nome}</h4>
                    <p className="list-item-description">
                      {rodovia.trecho_inicial || '-'} → {rodovia.trecho_final || '-'}
                    </p>
                    <div className="list-item-meta">
                      <span>{rodovia.extensao_km ? `${rodovia.extensao_km} km` : '-'}</span>
                      <span className={`badge badge-${rodovia.situacao?.toLowerCase()}`}>
                        {rodovia.situacao}
                      </span>
                    </div>
                  </div>
                  <Link to={`/rodovias/${rodovia.id}`} className="btn btn-sm btn-secondary">
                    Ver
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header flex-between">
            <h2>Pontes Recentes</h2>
            <Link to="/pontes/nova" className="btn btn-sm btn-primary">
              + Adicionar
            </Link>
          </div>
          {recentPontes.length === 0 ? (
            <p className="empty-message">Nenhuma ponte cadastrada ainda.</p>
          ) : (
            <div className="list-container">
              {recentPontes.map((ponte) => (
                <div key={ponte.id} className="list-item">
                  <div className="list-item-content">
                    <h4>{ponte.nome}</h4>
                    <p className="list-item-description">
                      {ponte.rodovia?.nome || 'N/A'} - {ponte.rio}
                    </p>
                    <div className="list-item-meta">
                      <span>KM {ponte.km}</span>
                      <span>{ponte.material}</span>
                      <span className={`badge badge-${ponte.situacao?.toLowerCase()}`}>
                        {ponte.situacao}
                      </span>
                    </div>
                  </div>
                  <Link to={`/pontes/${ponte.id}`} className="btn btn-sm btn-secondary">
                    Ver
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions-card">
        <h2 className="card-header">Ações Rápidas</h2>
        <div className="quick-actions-grid">
          <Link to="/rodovias/nova" className="quick-action-item">
            <div className="quick-action-icon">➕</div>
            <h3>Nova Rodovia</h3>
            <p>Cadastrar uma nova rodovia</p>
          </Link>
          <Link to="/pontes/nova" className="quick-action-item">
            <div className="quick-action-icon">➕</div>
            <h3>Nova Ponte</h3>
            <p>Cadastrar uma nova ponte</p>
          </Link>
          <Link to="/mapa" className="quick-action-item">
            <div className="quick-action-icon">🗺️</div>
            <h3>Visualizar Mapa</h3>
            <p>Ver pontes no mapa interativo</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

