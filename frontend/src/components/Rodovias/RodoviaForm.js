import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import rodoviaService from '../../services/rodoviaService';
import estadoService from '../../services/estadoService';
import municipioService from '../../services/municipioService';
import './Rodovias.css';

const RodoviaForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    estado_id: '',
    trecho_inicial: '',
    trecho_final: '',
    extensao_km: '',
    situacao: 'boa',
    municipios: [],
  });

  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [alterarEstado, setAlterarEstado] = useState(false);

  useEffect(() => {
    loadEstados();
  }, []);

  useEffect(() => {
    if (isEdit && estados.length > 0) {
      loadRodovia();
    }
  }, [id, estados]);

  useEffect(() => {
    if (formData.estado_id) {
      loadMunicipios(formData.estado_id);
    } else {
      setMunicipios([]);
    }
  }, [formData.estado_id]);

  const loadEstados = async () => {
    try {
      const data = await estadoService.getAll();
      setEstados(data);
      
      // Se não houver estado selecionado, definir Rondônia como padrão
      if (!formData.estado_id && !isEdit) {
        const rondonia = data.find(estado => estado.sigla === 'RO');
        if (rondonia) {
          setFormData(prev => ({ ...prev, estado_id: rondonia.id }));
        }
      }
      
      setLoadingData(false);
    } catch (err) {
      setError('Erro ao carregar estados');
      toast.error('Erro ao carregar estados');
      setLoadingData(false);
    }
  };

  const loadMunicipios = async (estadoId) => {
    try {
      const data = await municipioService.getAll(estadoId);
      setMunicipios(data);
      if (data.length === 0) {
        toast.error('Nenhum município encontrado para este estado');
      }
    } catch (err) {
      toast.error('Erro ao carregar municípios');
    }
  };

  const loadRodovia = async () => {
    try {
      const data = await rodoviaService.getById(id);
      
      // Verificar se o estado não é Rondônia
      const rondonia = estados.find(estado => estado.sigla === 'RO');
      if (rondonia && data.estado_id && data.estado_id !== rondonia.id) {
        setAlterarEstado(true);
      }
      
      setFormData({
        nome: data.nome || '',
        estado_id: data.estado_id || (rondonia ? rondonia.id : ''),
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
    
    // Se mudou o estado, limpar os municípios selecionados
    if (name === 'estado_id') {
      setFormData({
        ...formData,
        [name]: value,
        municipios: [],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAlterarEstadoChange = (e) => {
    const checked = e.target.checked;
    setAlterarEstado(checked);
    
    // Se desmarcou, voltar para Rondônia
    if (!checked) {
      const rondonia = estados.find(estado => estado.sigla === 'RO');
      if (rondonia) {
        setFormData({
          ...formData,
          estado_id: rondonia.id,
          municipios: [],
        });
      }
    }
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
              <label className="form-label">Extensão (km) *</label>
              <input
                type="number"
                name="extensao_km"
                className="form-control"
                value={formData.extensao_km}
                onChange={handleChange}
                required
                step="0.01"
                placeholder="Ex: 120.5"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Trecho Inicial *</label>
              <input
                type="text"
                name="trecho_inicial"
                className="form-control"
                value={formData.trecho_inicial}
                onChange={handleChange}
                required
                placeholder="Ex: Divisa AC/RO"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Trecho Final *</label>
              <input
                type="text"
                name="trecho_final"
                className="form-control"
                value={formData.trecho_final}
                onChange={handleChange}
                required
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
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={alterarEstado}
                  onChange={handleAlterarEstadoChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: '500' }}>Alterar estado (padrão: Rondônia)</span>
              </label>
            </div>

            {alterarEstado && (
              <div style={{ marginBottom: '20px' }}>
                <label className="form-label">Estado *</label>
                <select
                  name="estado_id"
                  className="form-control"
                  value={formData.estado_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione um estado</option>
                  {estados.map((estado) => (
                    <option key={estado.id} value={estado.id}>
                      {estado.nome} ({estado.sigla})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                Municípios * ({formData.municipios.length} selecionados)
                {!alterarEstado && <span style={{ color: 'var(--blue-warm-vivid-70)', fontWeight: '600', marginLeft: '8px' }}>(Rondônia)</span>}
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
            
            {!formData.estado_id ? (
              <div style={{
                padding: '20px',
                textAlign: 'center',
                backgroundColor: 'var(--gray-5)',
                border: '2px dashed var(--gray-30)',
                borderRadius: '8px',
                color: 'var(--gray-60)'
              }}>
                Selecione um estado primeiro
              </div>
            ) : municipios.length === 0 ? (
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
                maxHeight: '300px',
                overflowY: 'auto',
                border: '1px solid var(--gray-30)',
                borderRadius: '8px',
                padding: '12px',
                backgroundColor: '#fff'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '8px'
                }}>
                  {municipios.map((municipio) => (
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
            )}
            
            <small className="form-text" style={{ marginTop: '8px', display: 'block' }}>
              {municipios.length > 0 
                ? `${municipios.length} municípios disponíveis. Esta rodovia passará pelos municípios selecionados.`
                : formData.estado_id ? 'Carregando...' : 'Selecione um estado'}
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
