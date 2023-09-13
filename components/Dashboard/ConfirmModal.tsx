import React, { useState } from 'react';

const ConfirmDialog =
    ({ isOpen, title, message, button, onAction, onClose }
        : { isOpen: boolean; title: string; message: string; button: string; onAction: () => void; onClose: () => void }) => {
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              No
            </button>
            <button type="button" className={`btn ${button}`} onClick={onAction}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
