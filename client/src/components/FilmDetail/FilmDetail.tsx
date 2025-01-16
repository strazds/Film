import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../../config.json";
import Popup from "../Popup/Popup.tsx"; // Importiere die Popup-Komponente
import StarRating from "../StarRating/StarRating.tsx";

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

  const showRatingDialog = async () => {
    // try {
    //   const response = await fetch(`${config.serverUrl}/api/films`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(filmsData)
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    // } catch (error) {
    //   console.error('Error adding film:', error);
    // }
  };

  return (
    <div>
      <h1>{film.title}</h1>
      {film.poster && <img src={`${config.serverUrl}/posters/${film.poster}`} height="auto" width="300px" alt={film.title}  />}
      <p>{film.description}</p>
      <p>Erscheinungsjahr: {film.year}</p>
      <p>Bewertung: {film.stars}</p>
      <button onClick={openPopup}>Rate</button>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        <h2>Popup-Inhalt</h2>
        <p>Dies ist der Inhalt des Popup-Fensters.</p>
        {/* Hier kannst du beliebige Inhalte einfügen */}
      </Popup>
    </div>
  );
}

export default FilmDetail;