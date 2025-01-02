import React, { useState, useEffect } from 'react';
import filmsData from "./films.json";
import config from "../config.json";
import './FilmList.css';

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

const FilmList: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await fetch(`${config.serverUrl}/api/films`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilms(data);
    } catch (error) {
      console.error('Error fetching films:', error);
    }
  };

  const addFilm = async () => {
    try {
      const response = await fetch(`${config.serverUrl}/api/films`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filmsData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchFilms();
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  const FilmItem: React.FC<Film> = ({title, thumb, description}) => {
    return (
      <div className="film-item">
        <div className="film-meta">
          <span className="thumb"><img src={`${config.serverUrl}/images/${thumb}`} height="auto" width="133px" /></span>
          <span>
            <div className="title"><h2 title={title}>{title}</h2></div>
            <div className="description">{description}</div>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={addFilm}>Add Film</button>
      <ul>
        {films.map((film, index) => (
          <FilmItem key={index} {...film} />
        ))}
      </ul>
    </div>
  );
};

export default FilmList;