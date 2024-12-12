import React, { useState, useEffect } from 'react';

interface Film {
  _id: string;
  text: string;
  completed: boolean;
}

const FilmList: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [newFilm, setNewFilm] = useState('');

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
        body: JSON.stringify({ text: newFilm }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewFilm('');
      fetchFilms();
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  return (
    <div>
      <h1>Film List</h1>
      <input
        type="text"
        value={newFilm}
        onChange={(e) => setNewFilm(e.target.value)}
      />
      <button onClick={addFilm}>Add Film</button>
      <ul>
        {films.map((film) => (
          <li key={film._id}>{film.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;