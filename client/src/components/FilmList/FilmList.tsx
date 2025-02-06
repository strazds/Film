import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import filmsData from "./films.json";
import RatingViewer from "../RatingViewer/RatingViewer.tsx";
import config from "../../config.json";
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

  const FilmItem: React.FC<Film> = ({_id, title, thumb, description, stars}) => {
    return (
      <div className="film-item">
        <div className="film-meta">
          <Link to={`/api/films/${_id}`}><span className="thumb"><img src={`${config.serverUrl}/images/${thumb}`} height="auto" width="133px" /></span></Link>
          <span>
            <RatingViewer totalRating={stars} />
          </span>
          <span>
            <Link to={`/api/films/${_id}`}>{title}</Link>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className='button-add-films' onClick={addFilm}>Add Films</button>
      <ul className='film-list'>
        {films.map((film, index) => (
          <FilmItem key={index} {...film} />
        ))}
      </ul>
    </div>
  );
};

export default FilmList;