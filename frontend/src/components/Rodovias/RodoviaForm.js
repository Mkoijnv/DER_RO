import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import rodoviaService from '../../services/rodoviaService';
import municipioService from '../../services/municipioService';
import './Rodovias.css';

const RodoviaForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    trecho_inicial: '',
    trecho_final: '',
    extensao_km: '',
    situacao: 'boa',
    municipios: [],
  });

  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMunicipios();
    if (isEdit) {
      loadRodovia();
    }
  }, [id]);

  const loadMunicipios = async () => {
    try {
      // Carregar todos os municípios (sem filtro de estado)
      const data = await municipioService.getAll();
      setMunicipios(data);
      setLoadingData(false);
    } catch (err) {
      setError('Erro ao carregar municípios');
      toast.error('Erro ao carregar municípios');
      setLoadingData(false);
    }
  };

  const loadRodovia = async () => {
    try {
      const data = await rodoviaService.getById(id);
      
      setFormData({
        nome: data.nome || '',
        trecho_inicial: data.trecho_inicial || '',
        trecho_final: data.trecho_final || '',
        extensao_km: data.extensao_km || '',
        situacao: data.situacao || 'boa',
        municipios: data.municipios ? data.municipios.map(m => m.id) : [],
      });
    } catch (err) {
      setError('Erro ao carregar rodovia');
      toast.error('Erro ao carregar rodovia');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMunicipioToggle = (municipioId) => {
    const currentMunicipios = [...formData.municipios];
    const index = currentMunicipios.indexOf(municipioId);
    
    if (index > -1) {
      // Remove se já está selecionado
      currentMunicipios.splice(index, 1);
    } else {
      // Adiciona se não está selecionado
      currentMunicipios.push(municipioId);
    }
    
    setFormData({
      ...formData,
      municipios: currentMunicipios,
    });
  };

  const handleSelectAll = () => {
    if (formData.municipios.length === municipios.length) {
      // Se todos estão selecionados, desmarcar todos
      setFormData({
        ...formData,
        municipios: [],
      });
    } else {
      // Selecionar todos
      setFormData({
        ...formData,
        municipios: municipios.map(m => m.id),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validar se pelo menos um município foi selecionado
    if (formData.municipios.length === 0) {
      setError('Selecione pelo menos um município');
      toast.error('Selecione pelo menos um município');
      return;
    }
    
    setLoading(true);

    try {
      if (isEdit) {
        await rodoviaService.update(id, formData);
        toast.success('Rodovia atualizada com sucesso!');
      } else {
        await rodoviaService.create(formData);
        toast.success('Rodovia criada com sucesso!');
      }
      setTimeout(() => navigate('/rodovias'), 500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erro ao salvar rodovia';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  // Agrupar municípios por estado para melhor visualização
  const municipiosPorEstado = municipios.reduce((acc, municipio) => {
    const estadoNome = municipio.estado?.nome || 'Sem Estado';
    if (!acc[estadoNome]) {
      acc[estadoNome] = [];
    }
    acc[estadoNome].push(municipio);
    return acc;
  }, {});

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">
          {isEdit ? 'Editar Rodovia' : 'Nova Rodovia'}
        </h1>
      </div>

      <div className="card">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Rodovia *</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Ex: BR-364"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Extensão (km)</label>
              <input
                type="number"
                name="extensao_km"
                className="form-control"
                value={formData.extensao_km}
                onChange={handleChange}
                step="0.01"
                placeholder="Ex: 120.5"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Trecho Inicial</label>
              <input
                type="text"
                name="trecho_inicial"
                className="form-control"
                value={formData.trecho_inicial}
                onChange={handleChange}
                placeholder="Ex: Divisa AC/RO"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Trecho Final</label>
              <input
                type="text"
                name="trecho_final"
                className="form-control"
                value={formData.trecho_final}
                onChange={handleChange}
                placeholder="Ex: Divisa RO/MT"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Situação *</label>
            <select
              name="situacao"
              className="form-control"
              value={formData.situacao}
              onChange={handleChange}
              required
            >
              <option value="boa">Boa</option>
              <option value="regular">Regular</option>
              <option value="ruim">Ruim</option>
              <option value="interditada">Interditada</option>
            </select>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                Municípios * ({formData.municipios.length} selecionados)
              </label>
              {municipios.length > 0 && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="btn btn-sm"
                  style={{
                    padding: '4px 12px',
                    fontSize: '13px',
                    backgroundColor: 'var(--gray-10)',
                    border: '1px solid var(--gray-30)',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {formData.municipios.length === municipios.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                </button>
              )}
            </div>
            
            {municipios.length === 0 ? (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                backgroundColor: 'var(--blue-warm-10)',
                border: '2px dashed var(--blue-warm-30)',
                borderRadius: '8px',
                color: 'var(--gray-60)'
              }}>
                Carregando municípios...
              </div>
            ) : (
              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                border: '1px solid var(--gray-30)',
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: '#fff'
              }}>
                {Object.entries(municipiosPorEstado).map(([estadoNome, municipiosDoEstado]) => (
                  <div key={estadoNome} style={{ marginBottom: '20px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: 'var(--blue-warm-vivid-70)',
                      marginBottom: '10px',
                      padding: '8px',
                      backgroundColor: 'var(--blue-warm-5)',
                      borderRadius: '4px',
                      borderLeft: '4px solid var(--blue-warm-vivid-70)'
                    }}>
                      {estadoNome} ({municipiosDoEstado.length} municípios)
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '8px'
                    }}>
                      {municipiosDoEstado.map((municipio) => (
                        <label
                          key={municipio.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 12px',
                            backgroundColor: formData.municipios.includes(municipio.id) 
                              ? 'var(--blue-warm-10)' 
                              : 'var(--gray-5)',
                            border: `2px solid ${formData.municipios.includes(municipio.id) 
                              ? 'var(--blue-warm-vivid-70)' 
                              : 'var(--gray-20)'}`,
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontSize: '14px'
                          }}
                          onMouseEnter={(e) => {
                            if (!formData.municipios.includes(municipio.id)) {
                              e.currentTarget.style.backgroundColor = 'var(--gray-10)';
                              e.currentTarget.style.borderColor = 'var(--gray-40)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!formData.municipios.includes(municipio.id)) {
                              e.currentTarget.style.backgroundColor = 'var(--gray-5)';
                              e.currentTarget.style.borderColor = 'var(--gray-20)';
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.municipios.includes(municipio.id)}
                            onChange={() => handleMunicipioToggle(municipio.id)}
                            style={{
                              marginRight: '8px',
                              width: '16px',
                              height: '16px',
                              cursor: 'pointer'
                            }}
                          />
                          <span style={{ 
                            fontWeight: formData.municipios.includes(municipio.id) ? '600' : '400',
                            color: formData.municipios.includes(municipio.id) 
                              ? 'var(--blue-warm-vivid-70)' 
                              : 'var(--gray-80)'
                          }}>
                            {municipio.nome}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <small className="form-text" style={{ marginTop: '8px', display: 'block' }}>
              {municipios.length > 0 
                ? `${municipios.length} municípios disponíveis. Selecione pelos quais a rodovia passa.`
                : 'Carregando...'}
            </small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/rodovias')}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RodoviaForm;
