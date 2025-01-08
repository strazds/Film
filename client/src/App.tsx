import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmList from './components/FilmList/FilmList.tsx';
import FilmDetail from './components/FilmDetail/FilmDetail.tsx';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FilmList />} />
          <Route path="/api/films/:id" element={<FilmDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;