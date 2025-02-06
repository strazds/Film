import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from "../../config.json";
import RatingViewer from "../RatingViewer/RatingViewer.tsx";
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
    <div className='film-detail'>
      <h1 className='title'>{film.title}</h1>
      <p className='year'>{film.year}</p>
      {film.poster && <img src={`${config.serverUrl}/posters/${film.poster}`} height="auto" width="100%" alt={film.title}  />}
      <p className='description'>{film.description}</p>
      <RatingViewer totalRating={film.stars} ratingButtonVisible={true} />
    </div>
  );
}

export default FilmDetail;