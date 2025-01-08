import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../../config.json";

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
    </div>
  );
}

export default FilmDetail;