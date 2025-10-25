import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';
import ponteService from '../../services/ponteService';
import './MapView.css';
import 'leaflet/dist/leaflet.css';

// Importação segura do Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Configuração do ícone padrão do Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente para controlar o mapa programaticamente
function MapController({ center, zoom, ponteAtual }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && ponteAtual) {
      map.flyTo(center, zoom, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map, ponteAtual]);
  
  return null;
}

const MapView = () => {
  const [pontes, setPontes] = useState([]);
  const [pontesFiltradas, setPontesFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [indiceAtual, setIndiceAtual] = useState(-1);
  const [filtros, setFiltros] = useState({
    busca: '',
    situacao: '',
  });
  const markersRef = useRef({});

  // Centro padrão (Rondônia)
  const defaultCenter = [-10.9472, -62.8264];
  const defaultZoom = 7;
  const detailZoom = 13;

  useEffect(() => {
    loadPontes();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [pontes, filtros]);

  // Abrir popup da ponte selecionada e fechar os outros
  useEffect(() => {
    // Fechar todos os popups primeiro
    Object.values(markersRef.current).forEach((marker) => {
      if (marker && marker.closePopup) {
        marker.closePopup();
      }
    });

    // Abrir o popup da ponte selecionada
    if (indiceAtual >= 0 && markersRef.current[indiceAtual]) {
      const marker = markersRef.current[indiceAtual];
      if (marker && marker.openPopup) {
        setTimeout(() => {
          marker.openPopup();
        }, 100);
      }
    }
  }, [indiceAtual]);

  const loadPontes = async () => {
    try {
      const data = await ponteService.getAllWithCoordinates();
      // Filtrar apenas pontes com coordenadas válidas
      const pontesComCoordenadas = data.filter(
        (ponte) => ponte.latitude && ponte.longitude
      );
      setPontes(pontesComCoordenadas);
      setPontesFiltradas(pontesComCoordenadas);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar pontes');
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...pontes];

    // Filtro de busca (nome, rodovia, rio)
    if (filtros.busca) {
      const termoBusca = filtros.busca.toLowerCase();
      resultado = resultado.filter(ponte =>
        ponte.nome.toLowerCase().includes(termoBusca) ||
        ponte.rio.toLowerCase().includes(termoBusca) ||
        ponte.rodovia?.nome?.toLowerCase().includes(termoBusca)
      );
    }

    // Filtro de situação
    if (filtros.situacao) {
      resultado = resultado.filter(ponte => ponte.situacao === filtros.situacao);
    }

    setPontesFiltradas(resultado);
    
    // Resetar índice se não houver mais resultados
    if (resultado.length === 0) {
      setIndiceAtual(-1);
    } else if (indiceAtual >= resultado.length) {
      setIndiceAtual(0);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
    setIndiceAtual(-1); // Resetar seleção ao mudar filtros
  };

  const handleLimparFiltros = () => {
    setFiltros({
      busca: '',
      situacao: '',
    });
    setIndiceAtual(-1);
  };

  const handleProximaPonte = () => {
    if (pontesFiltradas.length === 0) return;
    
    const novoIndice = indiceAtual < pontesFiltradas.length - 1 ? indiceAtual + 1 : 0;
    setIndiceAtual(novoIndice);
  };

  const handlePonteAnterior = () => {
    if (pontesFiltradas.length === 0) return;
    
    const novoIndice = indiceAtual > 0 ? indiceAtual - 1 : pontesFiltradas.length - 1;
    setIndiceAtual(novoIndice);
  };

  const handleSelecionarPonte = (index) => {
    setIndiceAtual(index);
  };

  const ponteAtual = indiceAtual >= 0 ? pontesFiltradas[indiceAtual] : null;
  const centerAtual = ponteAtual 
    ? [parseFloat(ponteAtual.latitude), parseFloat(ponteAtual.longitude)]
    : defaultCenter;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">🗺️ Mapa de Pontes</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Painel de Filtros */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="filter-panel">
          <div className="filter-row">
            <div className="filter-group" style={{ flex: 2 }}>
              <label className="filter-label">🔍 Buscar</label>
              <input
                type="text"
                name="busca"
                className="form-control"
                placeholder="Nome da ponte, rodovia ou rio..."
                value={filtros.busca}
                onChange={handleFiltroChange}
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">📊 Situação</label>
              <select
                name="situacao"
                className="form-control"
                value={filtros.situacao}
                onChange={handleFiltroChange}
              >
                <option value="">Todas</option>
                <option value="boa">Boa</option>
                <option value="regular">Regular</option>
                <option value="ruim">Ruim</option>
                <option value="interditada">Interditada</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label" style={{ opacity: 0 }}>.</label>
              <button
                onClick={handleLimparFiltros}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                🗑️ Limpar
              </button>
            </div>
          </div>

          <div className="filter-info">
            <span className="info-badge">
              📍 {pontesFiltradas.length} de {pontes.length} pontes
            </span>
            {ponteAtual && (
              <span className="info-badge info-badge-active">
                ⭐ {ponteAtual.nome}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="map-layout">
        {/* Lista de Pontes Lateral */}
        <div className="pontes-sidebar">
          <div className="sidebar-header">
            <h3>🌉 Pontes Encontradas</h3>
            <span className="total-counter">{pontesFiltradas.length} {pontesFiltradas.length === 1 ? 'ponte' : 'pontes'}</span>
          </div>

          {pontesFiltradas.length > 0 && (
            <div className="navigation-panel">
              <div className="nav-info">
                <span className="nav-label">Navegação:</span>
                <span className="nav-current">
                  Ponte {indiceAtual >= 0 ? indiceAtual + 1 : '-'} de {pontesFiltradas.length}
                </span>
              </div>
              <div className="nav-buttons">
                <button
                  onClick={handlePonteAnterior}
                  className={`nav-btn nav-btn-prev ${indiceAtual <= 0 ? 'nav-btn-disabled' : ''}`}
                  disabled={indiceAtual <= 0}
                  title="Ir para ponte anterior"
                >
                  <span className="nav-icon">
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </span>
                  <span className="nav-text">Anterior</span>
                </button>
                <button
                  onClick={handleProximaPonte}
                  className={`nav-btn nav-btn-next ${indiceAtual >= pontesFiltradas.length - 1 ? 'nav-btn-disabled' : ''}`}
                  disabled={indiceAtual >= pontesFiltradas.length - 1}
                  title="Ir para próxima ponte"
                >
                  <span className="nav-text">Próxima</span>
                  <span className="nav-icon">
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </span>
                </button>
              </div>
              <div className="nav-progress">
                <div 
                  className="nav-progress-bar" 
                  style={{ width: `${((indiceAtual + 1) / pontesFiltradas.length) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="pontes-list">
            {pontesFiltradas.length === 0 ? (
              <div className="empty-results">
                <p>🔍 Nenhuma ponte encontrada</p>
                <small>Tente ajustar os filtros</small>
              </div>
            ) : (
              pontesFiltradas.map((ponte, index) => (
                <div
                  key={ponte.id}
                  className={`ponte-item ${index === indiceAtual ? 'ponte-item-active' : ''}`}
                  onClick={() => handleSelecionarPonte(index)}
                >
                  <div className="ponte-item-header">
                    <h4>{ponte.nome}</h4>
                    <span className={`badge badge-${ponte.situacao?.toLowerCase()}`}>
                      {ponte.situacao}
                    </span>
                  </div>
                  <div className="ponte-item-info">
                    <p>🛣️ {ponte.rodovia?.nome || 'N/A'} - KM {ponte.km}</p>
                    <p>🌊 {ponte.rio}</p>
                    <p>📍 {parseFloat(ponte.latitude).toFixed(4)}, {parseFloat(ponte.longitude).toFixed(4)}</p>
                  </div>
                  {index === indiceAtual && (
                    <div className="ponte-item-actions">
                      <Link
                        to={`/pontes/${ponte.id}`}
                        className="btn btn-sm btn-primary"
                        style={{ width: '100%' }}
                      >
                        <Eye size={16} /> Ver Detalhes
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mapa */}
        <div className="map-wrapper">
          <div className="map-container">
            {pontes.length === 0 ? (
              <div className="empty-map-message">
                <p>Nenhuma ponte com coordenadas cadastradas ainda.</p>
                <Link to="/pontes/nova" className="btn btn-primary">
                  Cadastrar Ponte
                </Link>
              </div>
            ) : (
              <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                style={{ height: '100%', width: '100%', borderRadius: '8px' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <MapController 
                  center={centerAtual} 
                  zoom={ponteAtual ? detailZoom : defaultZoom}
                  ponteAtual={ponteAtual}
                />
                
                {pontesFiltradas.map((ponte, index) => {
                  const isSelecionada = index === indiceAtual;
                  
                  return (
                    <Marker
                      key={ponte.id}
                      position={[parseFloat(ponte.latitude), parseFloat(ponte.longitude)]}
                      eventHandlers={{
                        click: () => handleSelecionarPonte(index),
                      }}
                      ref={(ref) => {
                        if (ref) {
                          markersRef.current[index] = ref;
                        }
                      }}
                    >
                      <Popup
                        autoClose={false}
                        closeOnClick={false}
                      >
                        <div className={`map-popup ${isSelecionada ? 'map-popup-selected' : ''}`}>
                          <h3>{ponte.nome}</h3>
                          {isSelecionada && (
                            <div className="selected-badge">
                              ⭐ Ponte Selecionada
                            </div>
                          )}
                          
                          {/* Exibir foto da ponte se existir */}
                          {ponte.foto_url && (
                            <div className="popup-image">
                              <img 
                                src={ponte.foto_url} 
                                alt={ponte.nome}
                                style={{
                                  width: '100%',
                                  maxHeight: '150px',
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  marginBottom: '12px',
                                  cursor: 'pointer',
                                  border: '2px solid #e5e7eb'
                                }}
                                onClick={() => window.open(ponte.foto_url, '_blank')}
                                title="Clique para ver em tamanho maior"
                              />
                            </div>
                          )}
                          
                          <div className="popup-info">
                            <p><strong>Rodovia:</strong> {ponte.rodovia?.nome || 'N/A'}</p>
                            <p><strong>Rio:</strong> {ponte.rio}</p>
                            <p><strong>KM:</strong> {ponte.km}</p>
                            <p><strong>Material:</strong> {ponte.material}</p>
                            <p>
                              <strong>Situação:</strong>{' '}
                              <span className={`badge badge-${ponte.situacao?.toLowerCase()}`}>
                                {ponte.situacao}
                              </span>
                            </p>
                          </div>
                          <Link to={`/pontes/${ponte.id}`} className="btn btn-sm btn-primary" style={{ width: '100%' }}>
                            <Eye size={16} /> Ver Detalhes Completos
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            )}
          </div>

          {/* Controles de Navegação Flutuantes */}
          {pontesFiltradas.length > 0 && (
            <div className="floating-controls">
              <button
                onClick={handlePonteAnterior}
                className="floating-btn floating-btn-left"
                title="Ponte Anterior (←)"
              >
                ⬅️
              </button>
              <div className="floating-info">
                {indiceAtual >= 0 ? (
                  <>
                    <strong>{indiceAtual + 1}</strong> / {pontesFiltradas.length}
                    <br />
                    <small>{ponteAtual?.nome}</small>
                  </>
                ) : (
                  <small>Selecione uma ponte</small>
                )}
              </div>
              <button
                onClick={handleProximaPonte}
                className="floating-btn floating-btn-right"
                title="Próxima Ponte (→)"
              >
                ➡️
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
