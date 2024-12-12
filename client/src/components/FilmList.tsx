import React, { useState, useEffect } from 'react';
import './filmList.css';

interface Film {
  _id: string;
  title: string;
  poster: string;
  description: string;
}

const FilmList: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [newDescription, setNewDescription] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPoster, setNewPoster] = useState('');

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
      <h1>Film List</h1>
      <div>
        <label htmlFor="descriptionInput">Description: </label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="posterInput">Poster: </label>
        <input
          type="text"
          value={newPoster}
          onChange={(e) => setNewPoster(e.target.value)}
        />
      </div>
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