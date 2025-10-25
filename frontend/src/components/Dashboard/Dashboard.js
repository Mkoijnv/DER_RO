import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Route, Construction, MapPin, Plus, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import rodoviaService from '../../services/rodoviaService';
import ponteService from '../../services/ponteService';
import authService from '../../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRodovias: 0,
    totalPontes: 0,
    pontesComCoordenadas: 0,
    pontesPorSituacao: { boa: 0, regular: 0, ruim: 0, interditada: 0 },
  });
  const [recentRodovias, setRecentRodovias] = useState([]);
  const [recentPontes, setRecentPontes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [rodovias, pontes] = await Promise.all([
        rodoviaService.getAll().catch(() => []),
        ponteService.getAll().catch(() => []),
      ]);

      const pontesComCoord = pontes.filter(p => p.latitude && p.longitude).length;
      
      // Contar pontes por situação
      const situacoes = { boa: 0, regular: 0, ruim: 0, interditada: 0 };
      pontes.forEach(ponte => {
        if (ponte.situacao && situacoes.hasOwnProperty(ponte.situacao)) {
          situacoes[ponte.situacao]++;
        }
      });

      setStats({
        totalRodovias: rodovias.length,
        totalPontes: pontes.length,
        pontesComCoordenadas: pontesComCoord,
        pontesPorSituacao: situacoes,
      });

      setRecentRodovias(rodovias.slice(0, 5));
      setRecentPontes(pontes.slice(0, 5));
      
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  const totalPontes = stats.totalPontes || 1; // Evita divisão por zero
  const percentBoaRegular = Math.round(((stats.pontesPorSituacao.boa + stats.pontesPorSituacao.regular) / totalPontes) * 100);

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-title">Bem-vindo, {user?.name}!</h1>
          <p className="hero-subtitle">Gerencie rodovias e pontes de Rondônia de forma eficiente</p>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-gradient-1">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">
                <Route size={28} strokeWidth={2.5} />
              </span>
            </div>
            <div className="stat-badge">Total</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalRodovias}</h3>
            <p className="stat-label">Rodovias Cadastradas</p>
          </div>
          <Link to="/rodovias" className="stat-link">
            Ver todas as rodovias
            <span className="arrow">→</span>
          </Link>
          <div className="stat-decoration stat-decoration-1"></div>
        </div>

        <div className="stat-card stat-card-gradient-2">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">
                <Construction size={28} strokeWidth={2.5} />
              </span>
            </div>
            <div className="stat-badge">Total</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.totalPontes}</h3>
            <p className="stat-label">Pontes Cadastradas</p>
          </div>
          <Link to="/pontes" className="stat-link">
            Ver todas as pontes
            <span className="arrow">→</span>
          </Link>
          <div className="stat-decoration stat-decoration-2"></div>
        </div>

        <div className="stat-card stat-card-gradient-3">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">
                <MapPin size={28} strokeWidth={2.5} />
              </span>
            </div>
            <div className="stat-badge">Mapeadas</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{stats.pontesComCoordenadas}</h3>
            <p className="stat-label">Pontes no Mapa</p>
          </div>
          <Link to="/mapa" className="stat-link">
            Visualizar no mapa
            <span className="arrow">→</span>
          </Link>
          <div className="stat-decoration stat-decoration-3"></div>
        </div>

        <div className="stat-card stat-card-gradient-4">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">
                <CheckCircle size={28} strokeWidth={2.5} />
              </span>
            </div>
            <div className="stat-badge">Status</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{percentBoaRegular}%</h3>
            <p className="stat-label">Pontes em Bom Estado</p>
          </div>
          <div className="stat-progress-bar">
            <div className="stat-progress-fill" style={{ width: `${percentBoaRegular}%` }}></div>
          </div>
          <div className="stat-decoration stat-decoration-4"></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <div className="section-header">
          <h2 className="section-title">Ações Rápidas</h2>
          <p className="section-subtitle">Acesse rapidamente as funcionalidades principais</p>
        </div>
        <div className="quick-actions-grid">
          <Link to="/rodovias/nova" className="quick-action-card">
            <div className="quick-action-icon-wrapper">
              <span className="quick-action-icon">
                <Plus size={32} strokeWidth={2.5} />
              </span>
            </div>
            <h3>Nova Rodovia</h3>
            <p>Cadastrar uma nova rodovia no sistema</p>
          </Link>
          
          <Link to="/pontes/nova" className="quick-action-card">
            <div className="quick-action-icon-wrapper">
              <span className="quick-action-icon">
                <Plus size={32} strokeWidth={2.5} />
              </span>
            </div>
            <h3>Nova Ponte</h3>
            <p>Adicionar uma nova ponte ao sistema</p>
          </Link>
          
          <Link to="/mapa" className="quick-action-card">
            <div className="quick-action-icon-wrapper">
              <span className="quick-action-icon">
                <MapPin size={32} strokeWidth={2.5} />
              </span>
            </div>
            <h3>Ver Mapa</h3>
            <p>Visualizar pontes no mapa interativo</p>
          </Link>
        </div>
      </div>

      {/* Recent Items Grid */}
      <div className="recent-items-grid">
        {/* Recent Rodovias */}
        <div className="recent-card">
          <div className="recent-card-header">
            <div>
              <h2 className="recent-card-title">Rodovias Recentes</h2>
              <p className="recent-card-subtitle">Últimas 5 rodovias cadastradas</p>
            </div>
            <Link to="/rodovias/nova" className="btn-add">
              + Adicionar
            </Link>
          </div>
          
          {recentRodovias.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">
                <Route size={48} strokeWidth={2} />
              </span>
              <p>Nenhuma rodovia cadastrada ainda</p>
              <Link to="/rodovias/nova" className="btn-primary-small">
                Cadastrar primeira rodovia
              </Link>
            </div>
          ) : (
            <div className="recent-list">
              {recentRodovias.map((rodovia, index) => (
                <div key={rodovia.id} className="recent-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="recent-item-icon">
                    <Route size={20} strokeWidth={2.5} />
                  </div>
                  <div className="recent-item-content">
                    <h4>{rodovia.nome}</h4>
                    <p>{rodovia.trecho_inicial || '-'} → {rodovia.trecho_final || '-'}</p>
                    <div className="recent-item-meta">
                      <span>{rodovia.extensao_km ? `${rodovia.extensao_km} km` : '-'}</span>
                      <span className={`status-badge status-${rodovia.situacao?.toLowerCase()}`}>
                        {rodovia.situacao}
                      </span>
                    </div>
                  </div>
                  <Link to={`/rodovias/${rodovia.id}`} className="btn-view">
                    Ver →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Pontes */}
        <div className="recent-card">
          <div className="recent-card-header">
            <div>
              <h2 className="recent-card-title">Pontes Recentes</h2>
              <p className="recent-card-subtitle">Últimas 5 pontes cadastradas</p>
            </div>
            <Link to="/pontes/nova" className="btn-add">
              + Adicionar
            </Link>
          </div>
          
          {recentPontes.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">
                <Construction size={48} strokeWidth={2} />
              </span>
              <p>Nenhuma ponte cadastrada ainda</p>
              <Link to="/pontes/nova" className="btn-primary-small">
                Cadastrar primeira ponte
              </Link>
            </div>
          ) : (
            <div className="recent-list">
              {recentPontes.map((ponte, index) => (
                <div key={ponte.id} className="recent-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="recent-item-icon">
                    <Construction size={20} strokeWidth={2.5} />
                  </div>
                  <div className="recent-item-content">
                    <h4>{ponte.nome}</h4>
                    <p>{ponte.rodovia?.nome || 'N/A'} - {ponte.rio}</p>
                    <div className="recent-item-meta">
                      <span>KM {ponte.km}</span>
                      <span>{ponte.material}</span>
                      <span className={`status-badge status-${ponte.situacao?.toLowerCase()}`}>
                        {ponte.situacao}
                      </span>
                    </div>
                  </div>
                  <Link to={`/pontes/${ponte.id}`} className="btn-view">
                    Ver →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
