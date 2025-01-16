import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../../config.json";
import Popup from "../Popup/Popup.tsx"; // Importiere die Popup-Komponente
import StarRating from "../StarRating/StarRating.tsx";
import './FilmDetail.css';

interface Film {
    _id: string;
    title: string;
    thumb: string;
    poster: string;
    appetizer: string;
    description: string;
    year: number;
    director: string;
    stars: number;
}

function FilmDetail() {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingSent, setRatingSent] = useState(false); // Neuer Zustand

  const handleRatingSubmit = async () => {
    if (currentRating === 0) {
        alert("Bitte gib eine Bewertung ab."); // Oder eine bessere Fehleranzeige
        return;
    }

    try {
        const response = await fetch(`${config.serverUrl}/api/films/${id}/rating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating: currentRating, userId: "677fdf78180cc8d5f1f6d8cd" }),
        });

        if (!response.ok) {
            const errorData = await response.json(); // Versuche, Fehler vom Server zu parsen
            throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        console.log('Bewertung erfolgreich gesendet');
        setRatingSent(true); // Setze den Zustand, um den Erfolg anzuzeigen
        closePopup(); // Schließe das Popup nach erfolgreicher Bewertung
        // Optional: Film neu laden, um die aktualisierte Bewertung anzuzeigen
        // fetchFilm();
    } catch (error: any) {
        console.error('Fehler beim Senden der Bewertung:', error);
        alert(`Fehler beim Senden der Bewertung: ${error.message}`); // Bessere Fehleranzeige
    }
};


  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchFilm = async () => {
      try {
        const response = await fetch(`${config.serverUrl}/api/films/${id}`, { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Film = await response.json();
        
        setFilm(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (isLoading) {
    return <div>Film wird geladen...</div>;
  }

  if (error) {
    return <div>Fehler beim Laden des Films: {error}</div>;
  }

  if (!film) {
    return <div>Film nicht gefunden</div>;
  }

  return (
    <div>
      <h1>{film.title}</h1>
      {film.poster && <img src={`${config.serverUrl}/posters/${film.poster}`} height="auto" width="300px" alt={film.title}  />}
      <p>{film.description}</p>
      <p>Erscheinungsjahr: {film.year}</p>
      <p>Bewertung: {film.stars}</p>
      <button onClick={openPopup}>Rate</button>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <div className="App">
            <h1>Filmbewertung</h1>
            <StarRating rating={currentRating} onChange={setCurrentRating} interactive/>
            <p>Aktuelle Bewertung: {currentRating}</p>
            {ratingSent && <p style={{ color: 'green' }}>Bewertung erfolgreich gesendet!</p>} {/* Erfolgsmeldung */}
            <button onClick={handleRatingSubmit} disabled={ratingSent}>Bewertung senden</button> {/* Button zum Senden */}
         </div>
      </Popup>
    </div>
  );
}

export default FilmDetail;