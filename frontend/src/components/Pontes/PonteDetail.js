import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import ponteService from '../../services/ponteService';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import 'leaflet/dist/leaflet.css';
import './Pontes.css';
import L from 'leaflet';

// Fix para ícones do Leaflet não aparecerem
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Componente para fazer zoom animado
function FlyToLocation({ position, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      // Começa mais distante e faz zoom suave até o nível desejado
      map.flyTo(position, zoom, {
        duration: 2.5, // 2.5 segundos de animação
        easeLinearity: 0.25
      });
    }
  }, [map, position, zoom]);
  
  return null;
}

const PonteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ponte, setPonte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false });

  useEffect(() => {
    loadPonte();
  }, [id]);

  const loadPonte = async () => {
    try {
      const data = await ponteService.getById(id);
      setPonte(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar ponte');
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModal({ isOpen: true });
  };

  const handleConfirmDelete = async () => {
    try {
      await ponteService.delete(id);
      setDeleteModal({ isOpen: false });
      navigate('/pontes');
    } catch (err) {
      setError('Erro ao excluir ponte');
      setDeleteModal({ isOpen: false });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!ponte) {
    return <div className="container">Ponte não encontrada</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Detalhes da Ponte</h1>
        <div className="detail-actions">
          <Link to={`/pontes/${id}/editar`} className="btn-detail btn-detail-primary">
            <Pencil size={18} /> Editar
          </Link>
          <button onClick={handleDeleteClick} className="btn-detail btn-detail-danger">
            <Trash2 size={18} /> Excluir
          </button>
          <Link to="/pontes" className="btn-detail btn-detail-secondary">
            <ArrowLeft size={18} /> Voltar
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="detail-grid">
          <div className="detail-item">
            <label>Nome</label>
            <p>{ponte.nome}</p>
          </div>
          <div className="detail-item">
            <label>Rodovia</label>
            <p>
              {ponte.rodovia ? (
                <Link to={`/rodovias/${ponte.rodovia.id}`} className="link-rodovia">
                  {ponte.rodovia.nome}
                </Link>
              ) : (
                'N/A'
              )}
            </p>
          </div>
          <div className="detail-item">
            <label>Rio</label>
            <p>{ponte.rio}</p>
          </div>
          <div className="detail-item">
            <label>KM</label>
            <p>{ponte.km}</p>
          </div>
          <div className="detail-item">
            <label>Material</label>
            <p>{ponte.material}</p>
          </div>
          <div className="detail-item">
            <label>Situação</label>
            <p>
              <span className={`badge badge-${ponte.situacao?.toLowerCase()}`}>
                {ponte.situacao}
              </span>
            </p>
          </div>
        </div>
      </div>

      {ponte.latitude && ponte.longitude && (
        <div className="card">
          <h2 className="card-header">📍 Localização no Mapa</h2>
          <div className="detail-grid" style={{ marginBottom: '20px' }}>
            <div className="detail-item">
              <label>Latitude</label>
              <p>{parseFloat(ponte.latitude).toFixed(6)}</p>
            </div>
            <div className="detail-item">
              <label>Longitude</label>
              <p>{parseFloat(ponte.longitude).toFixed(6)}</p>
            </div>
          </div>
          <div className="map-container" style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <MapContainer
              center={[parseFloat(ponte.latitude), parseFloat(ponte.longitude)]}
              zoom={8}
              style={{ height: '450px', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FlyToLocation 
                position={[parseFloat(ponte.latitude), parseFloat(ponte.longitude)]} 
                zoom={13} 
              />
              <Marker position={[parseFloat(ponte.latitude), parseFloat(ponte.longitude)]}>
                <Popup>
                  <div className="map-popup">
                    <h3>{ponte.nome}</h3>
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
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div style={{ 
            marginTop: '12px', 
            padding: '12px', 
            backgroundColor: 'var(--blue-warm-10)', 
            borderRadius: '6px',
            fontSize: '14px',
            color: 'var(--gray-80)'
          }}>
            💡 Use a roda do mouse ou os botões +/- para ajustar o zoom. Arraste o mapa para navegar.
          </div>
        </div>
      )}

      {ponte.foto_url && (
        <div className="card">
          <h2 className="card-header">📷 Foto da Ponte</h2>
          <div className="ponte-foto" style={{ textAlign: 'center', padding: '20px' }}>
            <img 
              src={ponte.foto_url} 
              alt={ponte.nome}
              style={{
                maxWidth: '100%',
                maxHeight: '600px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={ponte?.nome || ''}
        itemType="ponte"
      />
    </div>
  );
};

export default PonteDetail;

