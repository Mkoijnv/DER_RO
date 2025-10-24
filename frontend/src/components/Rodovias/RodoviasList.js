import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import rodoviaService from '../../services/rodoviaService';
import './Rodovias.css';

const RodoviasList = () => {
  const toast = useToast();
  const [rodovias, setRodovias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta rodovia?')) {
      try {
        await rodoviaService.delete(id);
        toast.success('Rodovia excluída com sucesso!');
        loadRodovias();
      } catch (err) {
        const errorMsg = 'Erro ao excluir rodovia';
        setError(errorMsg);
        toast.error(errorMsg);
      }
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
                      <div className="action-buttons">
                        <Link
                          to={`/rodovias/${rodovia.id}`}
                          className="btn btn-sm btn-secondary"
                        >
                          Ver
                        </Link>
                        <Link
                          to={`/rodovias/${rodovia.id}/editar`}
                          className="btn btn-sm btn-primary"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(rodovia.id)}
                          className="btn btn-sm btn-danger"
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

export default RodoviasList;

