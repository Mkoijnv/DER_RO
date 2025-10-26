import React, { useState, useEffect } from 'react';
import './Modal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName, itemType, relatedItems = [] }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset do loading quando o modal abrir/fechar
  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setProgress(0);
    }
  }, [isOpen]);

  // Animação da barra de progresso (igual ao login)
  useEffect(() => {
    let interval;
    if (loading && progress < 90) {
      interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 15;
          return Math.min(prev + increment, 90);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [loading, progress]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setProgress(10);
    
    try {
      await onConfirm();
      setProgress(100);
    } catch (error) {
      setLoading(false);
      setProgress(0);
    }
  };

  const getItemLabel = () => {
    switch(itemType) {
      case 'rodovia': return '🛣️ Rodovia:';
      case 'ponte': return '🌉 Ponte:';
      default: return 'Item:';
    }
  };

  const getItemTypeText = () => {
    switch(itemType) {
      case 'rodovia': return 'esta rodovia';
      case 'ponte': return 'esta ponte';
      default: return 'este item';
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon modal-icon-warning">
            ⚠️
          </div>
          <div>
            <h2 className="modal-title">Confirmar Exclusão</h2>
          </div>
        </div>

        <div className="modal-body">
          <p className="modal-text">
            Você tem certeza que deseja excluir {getItemTypeText()}?
            Esta ação não poderá ser desfeita.
          </p>

          <div className="modal-highlight">
            <span>{getItemLabel()}</span>
            <strong>{itemName}</strong>
          </div>

          {/* Mostrar pontes relacionadas quando excluir rodovia */}
          {itemType === 'rodovia' && relatedItems && relatedItems.length > 0 && (
            <div className="modal-related-items">
              <div className="related-items-header">
                <span className="warning-icon">⚠️</span>
                <strong>Atenção: {relatedItems.length} ponte(s) também será(ão) excluída(s):</strong>
              </div>
              <div className="related-items-list">
                {relatedItems.map((ponte, index) => (
                  <div key={ponte.id || index} className="related-item">
                    <span className="related-item-icon">🌉</span>
                    <div className="related-item-info">
                      <strong>{ponte.nome}</strong>
                      <span className="related-item-detail">
                        {ponte.rio} - KM {ponte.km}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informar quando não há pontes */}
          {itemType === 'rodovia' && relatedItems && relatedItems.length === 0 && (
            <div className="modal-info-box">
              <span className="info-icon">ℹ️</span>
              <span>Esta rodovia não possui pontes associadas.</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button 
            className="modal-btn modal-btn-cancel" 
            onClick={onClose}
            disabled={loading}
          >
            <span className="btn-content-modal">
              ✕ Cancelar
            </span>
          </button>
          <button 
            className={`modal-btn modal-btn-confirm ${loading ? 'btn-loading' : ''}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            <span className="btn-content-modal">
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  <span>Excluindo... {Math.round(progress)}%</span>
                </>
              ) : (
                <>
                  <span>🗑️ Sim, Excluir</span>
                </>
              )}
            </span>
            {loading && (
              <div 
                className="btn-progress-bar-modal" 
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

