import React from 'react';
import './Popup.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="popup-close" onClick={onClose}>
          Schließen
        </button>
        <div className="popup-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;