import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import rodoviaService from '../../services/rodoviaService';
import './Rodovias.css';

const RodoviaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rodovia, setRodovia] = useState(null);
  const [pontes, setPontes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRodovia();
    loadPontes();
  }, [id]);

  const loadRodovia = async () => {
    try {
      const data = await rodoviaService.getById(id);
      setRodovia(data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar rodovia');
      setLoading(false);
    }
  };

  const loadPontes = async () => {
    try {
      const data = await rodoviaService.getRodoviaWithPontes(id);
      setPontes(data.pontes || []);
    } catch (err) {
      console.error('Erro ao carregar pontes:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta rodovia?')) {
      try {
        await rodoviaService.delete(id);
        navigate('/rodovias');
      } catch (err) {
        setError('Erro ao excluir rodovia');
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

  if (!rodovia) {
    return <div className="container">Rodovia não encontrada</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Detalhes da Rodovia</h1>
        <div className="action-buttons">
          <Link to={`/rodovias/${id}/editar`} className="btn btn-primary">
            Editar
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Excluir
          </button>
          <Link to="/rodovias" className="btn btn-secondary">
            Voltar
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="detail-grid">
          <div className="detail-item">
            <label>Rodovia</label>
            <p>{rodovia.nome}</p>
          </div>
          <div className="detail-item">
            <label>Extensão</label>
            <p>{rodovia.extensao_km ? `${rodovia.extensao_km} km` : '-'}</p>
          </div>
          <div className="detail-item">
            <label>Trecho Inicial</label>
            <p>{rodovia.trecho_inicial || '-'}</p>
          </div>
          <div className="detail-item">
            <label>Trecho Final</label>
            <p>{rodovia.trecho_final || '-'}</p>
          </div>
          <div className="detail-item">
            <label>Situação</label>
            <p>
              <span className={`badge badge-${rodovia.situacao?.toLowerCase()}`}>
                {rodovia.situacao}
              </span>
            </p>
          </div>
          {rodovia.municipios && rodovia.municipios.length > 0 && (
            <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
              <label>Municípios</label>
              <p>
                {rodovia.municipios.map(municipio => (
                  <span key={municipio.id} className="badge badge-info" style={{ marginRight: '8px', marginBottom: '4px' }}>
                    {municipio.nome}{municipio.estado ? ` (${municipio.estado.sigla})` : ''}
                  </span>
                ))}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header flex-between">
          <h2>Pontes ({pontes.length})</h2>
          <Link to={`/pontes/nova?rodovia_id=${id}`} className="btn btn-primary btn-sm">
            + Adicionar Ponte
          </Link>
        </div>

        {pontes.length === 0 ? (
          <p>Nenhuma ponte cadastrada para esta rodovia.</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Rio</th>
                  <th>KM</th>
                  <th>Material</th>
                  <th>Situação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pontes.map((ponte) => (
                  <tr key={ponte.id}>
                    <td>{ponte.nome}</td>
                    <td>{ponte.rio}</td>
                    <td>{ponte.km}</td>
                    <td>{ponte.material}</td>
                    <td>
                      <span className={`badge badge-${ponte.situacao?.toLowerCase()}`}>
                        {ponte.situacao}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/pontes/${ponte.id}`}
                        className="btn btn-sm btn-secondary"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RodoviaDetail;

