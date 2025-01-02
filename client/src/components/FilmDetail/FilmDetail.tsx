import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import filmsData from "./films.json";
// import config from "../../config.json";
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

const FilmDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);
//   const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchFilm = async () => {
      const response = await fetch(`/api/filme/${id}`);
      if (!response.ok) {
        // Fehlerbehandlung, z.B. Weiterleitung zu einer Fehlerseite
        console.error("Fehler beim Laden des Films");
        return;
      }
      const data = await response.json();
      setFilm(data);
    };

    fetchFilm();
  }, [id]); // id als Dependency für useEffect

  if (!film) {
    return <div>Film wird geladen...</div>; // Ladeanzeige
  }

  return (
    <div>
      <h1>{film.title}</h1>
      <img src={film.poster} alt={film.title} />
      <p>{film.description}</p>
      <p>Erscheinungsjahr: {film.year}</p>
      <p>Bewertung: {film.stars}</p>
    </div>
  );

};

export default FilmDetail;