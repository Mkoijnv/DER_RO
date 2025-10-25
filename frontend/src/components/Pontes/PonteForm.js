import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import ponteService from '../../services/ponteService';
import rodoviaService from '../../services/rodoviaService';
import './Pontes.css';

const PonteForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    rodovia_id: searchParams.get('rodovia_id') || '',
    nome: '',
    rio: '',
    km: '',
    latitude: '',
    longitude: '',
    material: 'concreto',
    situacao: 'boa',
  });

  const [rodovias, setRodovias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [fotoExistente, setFotoExistente] = useState(null);

  useEffect(() => {
    loadRodovias();
    if (isEdit) {
      loadPonte();
    }
  }, [id]);

  const loadRodovias = async () => {
    try {
      const data = await rodoviaService.getAll();
      setRodovias(data);
    } catch (err) {
      setError('Erro ao carregar rodovias');
    }
  };

  const loadPonte = async () => {
    try {
      const data = await ponteService.getById(id);
      setFormData({
        rodovia_id: data.rodovia_id || '',
        nome: data.nome || '',
        rio: data.rio || '',
        km: data.km || '',
        latitude: data.latitude || '',
        longitude: data.longitude || '',
        material: data.material || 'concreto',
        situacao: data.situacao || 'boa',
      });
      
      // Carregar foto existente se houver
      if (data.foto_url) {
        setFotoExistente(data.foto_url);
      }
    } catch (err) {
      setError('Erro ao carregar ponte');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('A imagem deve ter no máximo 5MB');
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor, selecione uma imagem válida');
        return;
      }

      setFotoFile(file);

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoverFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
    // Limpar o input file
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = { ...formData };
      
      // Adicionar foto se houver
      if (fotoFile) {
        dataToSend.foto = fotoFile;
      }

      if (isEdit) {
        await ponteService.update(id, dataToSend);
        toast.success('Ponte atualizada com sucesso!');
      } else {
        await ponteService.create(dataToSend);
        toast.success('Ponte criada com sucesso!');
      }
      setTimeout(() => navigate('/pontes'), 500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erro ao salvar ponte';
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">
          {isEdit ? 'Editar Ponte' : 'Nova Ponte'}
        </h1>
      </div>

      <div className="card">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Rodovia *</label>
              <select
                name="rodovia_id"
                className="form-control"
                value={formData.rodovia_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma rodovia</option>
                {rodovias.map((rodovia) => (
                  <option key={rodovia.id} value={rodovia.id}>
                    {rodovia.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Nome da Ponte *</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Ex: Ponte Rio Grande"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Rio *</label>
              <input
                type="text"
                name="rio"
                className="form-control"
                value={formData.rio}
                onChange={handleChange}
                required
                placeholder="Ex: Rio Tietê"
              />
            </div>

            <div className="form-group">
              <label className="form-label">KM *</label>
              <input
                type="number"
                name="km"
                className="form-control"
                value={formData.km}
                onChange={handleChange}
                required
                step="0.01"
                placeholder="Ex: 45.5"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Latitude</label>
              <input
                type="number"
                name="latitude"
                className="form-control"
                value={formData.latitude}
                onChange={handleChange}
                step="0.000001"
                placeholder="Ex: -23.550520"
              />
              <small className="form-text">Coordenada para visualização no mapa</small>
            </div>

            <div className="form-group">
              <label className="form-label">Longitude</label>
              <input
                type="number"
                name="longitude"
                className="form-control"
                value={formData.longitude}
                onChange={handleChange}
                step="0.000001"
                placeholder="Ex: -46.633308"
              />
              <small className="form-text">Coordenada para visualização no mapa</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Material *</label>
              <select
                name="material"
                className="form-control"
                value={formData.material}
                onChange={handleChange}
                required
              >
                <option value="concreto">Concreto</option>
                <option value="aço">Aço</option>
                <option value="madeira">Madeira</option>
                <option value="misto">Misto</option>
              </select>
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
          </div>

          <div className="form-group">
            <label className="form-label">Foto da Ponte</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFotoChange}
            />
            <small className="form-text">
              Formatos aceitos: JPG, PNG, GIF, WebP. Tamanho máximo: 5MB
            </small>

            {/* Preview da foto nova */}
            {fotoPreview && (
              <div className="image-preview-container" style={{ marginTop: '15px' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={fotoPreview}
                    alt="Preview"
                    style={{
                      maxWidth: '300px',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      border: '2px solid #ddd',
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoverFoto}
                    className="btn btn-sm btn-danger"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                    }}
                  >
                    ✕ Remover
                  </button>
                </div>
              </div>
            )}

            {/* Foto existente (apenas no modo edição) */}
            {!fotoPreview && fotoExistente && isEdit && (
              <div className="image-preview-container" style={{ marginTop: '15px' }}>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
                  Foto atual:
                </p>
                <img
                  src={fotoExistente}
                  alt="Foto atual da ponte"
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/pontes')}
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

export default PonteForm;

