import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import ponteService from '../../services/ponteService';
import './Pontes.css';

const PontesList = () => {
  const toast = useToast();
  const [pontes, setPontes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta ponte?')) {
      try {
        await ponteService.delete(id);
        toast.success('Ponte excluída com sucesso!');
        loadPontes();
      } catch (err) {
        const errorMsg = 'Erro ao excluir ponte';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    }
  };

  const handleViewPhotos = (ponte) => {
    // Por enquanto, apenas uma mensagem informativa
    // Futuramente aqui abrirá uma galeria de fotos
    if (ponte.foto) {
      toast.info('Visualizando fotos da ponte');
      // TODO: Implementar galeria de fotos
    } else {
      toast.info('Esta ponte ainda não possui fotos cadastradas');
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
                  <td colSpan="8" className="text-center">
                    Nenhuma ponte cadastrada
                  </td>
                </tr>
              ) : (
                pontes.map((ponte) => (
                  <tr key={ponte.id}>
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
                          className="btn btn-sm btn-secondary"
                          title="Ver detalhes da ponte"
                        >
                          Ver
                        </Link>
                        <button
                          onClick={() => handleViewPhotos(ponte)}
                          className="btn btn-sm btn-info"
                          title="Ver fotos da ponte"
                        >
                          📷 Fotos
                        </button>
                        <Link
                          to={`/pontes/${ponte.id}/editar`}
                          className="btn btn-sm btn-primary"
                          title="Editar ponte"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(ponte.id)}
                          className="btn btn-sm btn-danger"
                          title="Excluir ponte"
                        >
                          Excluir
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
    </div>
  );
};

export default PontesList;

