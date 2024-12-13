import React, { useState, useEffect } from 'react';
import './filmList.css';

interface Film {
  _id: string;
  title: string;
  poster: string;
  appetizer: string;
  description: string;
  year: string;
  director: string;
  stars: number;
}

const FilmList: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [newDescription, setNewDescription] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPoster, setNewPoster] = useState('');
  const [newAppetizer, setNewAppetizer] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [newStars, setNewStars] = useState('');

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/films');
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
      const response = await fetch('http://localhost:5000/api/films', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newDescription, poster: newPoster, title: newTitle }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewDescription('');
      setNewPoster('');
      setNewTitle('');
      fetchFilms();
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  const FilmItem: React.FC<Film> = ({title, poster, description}) => {
    return (
      <div className="film-item">
        <div className="film-meta">
          <span className="poster"><img src={"http://localhost:5000/images/" + poster} height="auto" width="133px" /></span>
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
      <div className="film-form">
        <h1>Film List</h1>
        <div className="form-group">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="appetizerInput">Appetizer: </label>
          <textarea
            id="appetizerInput"
            rows={2}
            value={newAppetizer}
            onChange={(e) => setNewAppetizer(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput">Description: </label>
          <textarea
            id="descriptionInput"
            rows={5}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="directorInput">Director: </label>
          <input
            id="directorInput"
            type="text"
            value={newDirector}
            onChange={(e) => setNewDirector(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearInput">Year: </label>
          <input
            id="yearInput"
            type="number"
            value={newYear}
            onChange={(e) => setNewYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="posterInput">Poster: </label>
          <input
            id="posterInput"
            type="text"
            value={newPoster}
            onChange={(e) => setNewPoster(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="StarsInput">Stars: </label>
          <input
            id="starsInput"
            type="number"
            value={newStars}
            onChange={(e) => setNewStars(e.target.value)}
          />
        </div>
        <button onClick={addFilm}>Add Film</button>
      </div>

      <ul>
        {films.map((film, index) => (
          <FilmItem key={index} {...film} />
        ))}
      </ul>
    </div>
  );
};

export default FilmList;