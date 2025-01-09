import React, { useState } from 'react';
import './Popup.css'; // Optionale CSS-Datei
import StarRating from "../StarRating/StarRating.tsx";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const [currentRating, setCurrentRating] = useState(3);

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
          {/* {children} */}
          <div className="App">
            <h1>Filmbewertung</h1>
            <StarRating rating={currentRating} onChange={setCurrentRating} interactive/>
            <p>Aktuelle Bewertung: {currentRating}</p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;