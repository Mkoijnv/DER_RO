import React from 'react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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
            Você tem certeza que deseja excluir {itemType === 'rodovia' ? 'esta rodovia' : 'esta ponte'}?
            Esta ação não poderá ser desfeita.
          </p>

          <div className="modal-highlight">
            <span>
              {itemType === 'rodovia' ? '🛣️ Rodovia:' : '🌉 Ponte:'}
            </span>
            <strong>{itemName}</strong>
          </div>
        </div>

        <div className="modal-actions">
          <button 
            className="modal-btn modal-btn-cancel" 
            onClick={onClose}
          >
            ✕ Cancelar
          </button>
          <button 
            className="modal-btn modal-btn-confirm" 
            onClick={onConfirm}
          >
            🗑️ Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

