import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Camera, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import ponteService from '../../services/ponteService';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import './Pontes.css';

const PontesList = () => {
  const toast = useToast();
  const [pontes, setPontes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, ponte: null });

  useEffect(() => {
    loadPontes();
  }, []);

  const loadPontes = async () => {
    try {
      const data = await ponteService.getAll();
      setPontes(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar pontes');
      setLoading(false);
    }
  };

  const handleDeleteClick = (ponte) => {
    setDeleteModal({ isOpen: true, ponte });
  };

  const handleConfirmDelete = async () => {
    try {
      await ponteService.delete(deleteModal.ponte.id);
      toast.success('Ponte excluída com sucesso!');
      setDeleteModal({ isOpen: false, ponte: null });
      loadPontes();
    } catch (err) {
      const errorMsg = 'Erro ao excluir ponte';
      setError(errorMsg);
      toast.error(errorMsg);
      setDeleteModal({ isOpen: false, ponte: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, ponte: null });
  };

  const handleViewPhotos = (ponte) => {
    if (ponte.foto_url) {
      // Abrir imagem em nova aba
      window.open(ponte.foto_url, '_blank');
    } else {
      toast.info('Esta ponte ainda não possui foto cadastrada');
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
        <h1 className="page-title">Pontes</h1>
        <Link to="/pontes/nova" className="btn btn-primary">
          + Nova Ponte
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Rodovia</th>
                <th>Rio</th>
                <th>KM</th>
                <th>Material</th>
                <th>Situação</th>
                <th>Coordenadas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pontes.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    Nenhuma ponte cadastrada
                  </td>
                </tr>
              ) : (
                pontes.map((ponte) => (
                  <tr key={ponte.id}>
                    <td>
                      {ponte.foto_url ? (
                        <img
                          src={ponte.foto_url}
                          alt={ponte.nome}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: '2px solid #ddd',
                          }}
                          onClick={() => handleViewPhotos(ponte)}
                          title="Clique para ver em tamanho maior"
                        />
                      ) : (
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '24px',
                          }}
                        >
                          🌉
                        </div>
                      )}
                    </td>
                    <td>
                      <strong>{ponte.nome}</strong>
                    </td>
                    <td>{ponte.rodovia?.nome || 'N/A'}</td>
                    <td>{ponte.rio}</td>
                    <td>{ponte.km}</td>
                    <td>{ponte.material}</td>
                    <td>
                      <span className={`badge badge-${ponte.situacao?.toLowerCase()}`}>
                        {ponte.situacao}
                      </span>
                    </td>
                    <td>
                      {ponte.latitude && ponte.longitude ? (
                        <span className="coordinates">
                          📍 {parseFloat(ponte.latitude).toFixed(4)}, {parseFloat(ponte.longitude).toFixed(4)}
                        </span>
                      ) : (
                        <span className="text-muted">Não definido</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons-grid">
                        <Link
                          to={`/pontes/${ponte.id}`}
                          className="btn btn-sm btn-info btn-icon-only"
                          title="Ver detalhes da ponte"
                        >
                          <Eye size={16} />
                        </Link>
                        <button
                          onClick={() => handleViewPhotos(ponte)}
                          className="btn btn-sm btn-success btn-icon-only"
                          title="Ver fotos da ponte"
                        >
                          <Camera size={16} />
                        </button>
                        <Link
                          to={`/pontes/${ponte.id}/editar`}
                          className="btn btn-sm btn-primary btn-icon-only"
                          title="Editar ponte"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(ponte)}
                          className="btn btn-sm btn-danger btn-icon-only"
                          title="Excluir ponte"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={deleteModal.ponte?.nome || ''}
        itemType="ponte"
      />
    </div>
  );
};

export default PontesList;

