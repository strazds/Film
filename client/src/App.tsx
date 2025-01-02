import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmList from './components/FilmList/FilmList.tsx';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<FilmList />} />
          <Route path="/filme/:id" element={<FilmList />} /> {/* Dynamische Route mit ID */}
        </Routes>
      </Router>
      {/* <FilmList /> */}
    </div>
  );
};

export default App;