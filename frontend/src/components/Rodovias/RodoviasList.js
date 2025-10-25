import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import rodoviaService from '../../services/rodoviaService';
import ConfirmDeleteModal from '../Modal/ConfirmDeleteModal';
import './Rodovias.css';

const RodoviasList = () => {
  const toast = useToast();
  const [rodovias, setRodovias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, rodovia: null });

  useEffect(() => {
    loadRodovias();
  }, []);

  const loadRodovias = async () => {
    try {
      const data = await rodoviaService.getAll();
      setRodovias(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar rodovias');
      setLoading(false);
    }
  };

  const handleDeleteClick = (rodovia) => {
    setDeleteModal({ isOpen: true, rodovia });
  };

  const handleConfirmDelete = async () => {
    try {
      await rodoviaService.delete(deleteModal.rodovia.id);
      toast.success('Rodovia excluída com sucesso!');
      setDeleteModal({ isOpen: false, rodovia: null });
      loadRodovias();
    } catch (err) {
      const errorMsg = 'Erro ao excluir rodovia';
      setError(errorMsg);
      toast.error(errorMsg);
      setDeleteModal({ isOpen: false, rodovia: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, rodovia: null });
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
        <h1 className="page-title">Rodovias</h1>
        <Link to="/rodovias/nova" className="btn btn-primary">
          + Nova Rodovia
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Rodovia</th>
                <th>Trecho Inicial</th>
                <th>Trecho Final</th>
                <th>Extensão (km)</th>
                <th>Situação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {rodovias.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Nenhuma rodovia cadastrada
                  </td>
                </tr>
              ) : (
                rodovias.map((rodovia) => (
                  <tr key={rodovia.id}>
                    <td>
                      <strong>{rodovia.nome}</strong>
                    </td>
                    <td>{rodovia.trecho_inicial || '-'}</td>
                    <td>{rodovia.trecho_final || '-'}</td>
                    <td>{rodovia.extensao_km ? `${rodovia.extensao_km} km` : '-'}</td>
                    <td>
                      <span className={`badge badge-${rodovia.situacao?.toLowerCase()}`}>
                        {rodovia.situacao}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons-grid-rodovia">
                        <Link
                          to={`/rodovias/${rodovia.id}`}
                          className="btn btn-sm btn-info btn-ver-full btn-icon-only"
                          title="Ver detalhes"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/rodovias/${rodovia.id}/editar`}
                          className="btn btn-sm btn-primary btn-icon-only"
                          title="Editar rodovia"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(rodovia)}
                          className="btn btn-sm btn-danger btn-icon-only"
                          title="Excluir rodovia"
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
        itemName={deleteModal.rodovia?.nome || ''}
        itemType="rodovia"
      />
    </div>
  );
};

export default RodoviasList;

