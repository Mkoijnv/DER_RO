import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import ponteService from '../../services/ponteService';
import 'leaflet/dist/leaflet.css';
import './MapView.css';
import L from 'leaflet';

// Fix para ícones do Leaflet não aparecerem
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const [pontes, setPontes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Centro do Brasil como posição padrão
  const defaultCenter = [-14.235004, -51.92528];
  const defaultZoom = 4;

  useEffect(() => {
    loadPontes();
  }, []);

  const loadPontes = async () => {
    try {
      const data = await ponteService.getAllWithCoordinates();
      // Filtrar apenas pontes com coordenadas válidas
      const pontesComCoordenadas = data.filter(
        (ponte) => ponte.latitude && ponte.longitude
      );
      setPontes(pontesComCoordenadas);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar pontes');
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
      <div className="page-header">
        <h1 className="page-title">Mapa de Pontes</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="map-info-bar">
          <div className="map-stats">
            <span className="stat-item">
              📍 <strong>{pontes.length}</strong> pontes localizadas
            </span>
          </div>
          <div className="map-legend">
            <span className="legend-item">
              <span className="legend-marker"></span>
              Localização das pontes
            </span>
          </div>
        </div>

        <div className="map-container">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            style={{ height: '600px', width: '100%', borderRadius: '8px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {pontes.map((ponte) => (
              <Marker
                key={ponte.id}
                position={[parseFloat(ponte.latitude), parseFloat(ponte.longitude)]}
              >
                <Popup>
                  <div className="map-popup">
                    <h3>{ponte.nome}</h3>
                    <div className="popup-info">
                      <p><strong>Rodovia:</strong> {ponte.rodovia?.rodovia || 'N/A'}</p>
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
                    <Link to={`/pontes/${ponte.id}`} className="btn btn-sm btn-primary">
                      Ver Detalhes
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {pontes.length === 0 && (
          <div className="empty-map-message">
            <p>Nenhuma ponte com coordenadas cadastradas ainda.</p>
            <Link to="/pontes/nova" className="btn btn-primary">
              Cadastrar Ponte
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;

