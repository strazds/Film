import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './RatingViewer.css';
import Popup from "../Popup/Popup.tsx";
import StarRating from "../StarRating/StarRating.tsx";
import config from "../../config.json";

interface RatingViewerProps {
  totalRating: number;
  ratingButtonVisible: boolean;
  interactive?: boolean;
}

const RatingViewer: React.FC<RatingViewerProps> = ({ totalRating, ratingButtonVisible = false }) => {
  const { id } = useParams<{ id: string }>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const [currentRating, setCurrentRating] = useState(0);
  const [ratingSent, setRatingSent] = useState(false);

  const handleRatingSubmit = async () => {
    if (currentRating === 0) {
        alert("Bitte gib eine Bewertung ab.");
        return;
    }

    try {
        const response = await fetch(`${config.serverUrl}/api/ratings/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: currentRating, userId: config.users.bob }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        console.log('Bewertung erfolgreich gesendet');
        setRatingSent(true);
        closePopup();
    } catch (error: any) {
        console.error('Fehler beim Senden der Bewertung:', error);
        alert(`Fehler beim Senden der Bewertung: ${error.message}`);
    }
};

  const ratingView = 
    <div className='rating'>
      <span
        className={`star filled`}
      >
        ★
      </span>
      <span className="value">{totalRating}</span>

      {
        ratingButtonVisible && 
        <span className='rating'>
          <span className={`star`}>★</span>
          <span className="value" onClick={openPopup}>Bewerten</span>
        </span>
      }

      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="rating-viewer">
            <h1>Filmbewertung</h1>
            <StarRating rating={currentRating} onChange={setCurrentRating} interactive/>
            <p>Aktuelle Bewertung: {currentRating}</p>
            {ratingSent && <p style={{ color: 'green' }}>Bewertung erfolgreich gesendet!</p>}
            <button onClick={handleRatingSubmit} disabled={ratingSent}>Bewerten</button>
         </div>
      </Popup>
    </div>
  ;
  return <div className="rating-viewer">{ratingView}</div>;
};

export default RatingViewer;