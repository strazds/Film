import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmList from './components/FilmList/FilmList.tsx';
import FilmDetail from './components/FilmDetail/FilmDetail.tsx';
import UserList from './components/UserList/UserList.tsx';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FilmList />} />
          <Route path="/api/films/:id" element={<FilmDetail />} />
          <Route path="/api/users/" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;