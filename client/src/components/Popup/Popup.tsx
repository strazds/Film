import React from 'react';
import './Popup.css'; // Optionale CSS-Datei

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {

  if (!isOpen) {
    return null; // Popup nicht anzeigen, wenn isOpen false ist
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