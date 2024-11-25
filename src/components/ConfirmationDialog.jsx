import React from "react";
import "/src/styles/ConfirmationDialog.css";

const ConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <div className="dialog-content">
        <p>Are you sure you want to delete this note?</p>
        <div className="dialog-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel-button" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
