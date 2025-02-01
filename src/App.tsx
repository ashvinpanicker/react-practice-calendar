import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Calendar } from './components/Calendar';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { PublicHolidaysPage } from './pages/PublicHolidaysPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/holidays" element={<PublicHolidaysPage />} />
        <Route path="/accordion" element={<PlaceholderPage />} />
        <Route path="/local-storage-hook" element={<PlaceholderPage />} />
        <Route path="/memory-game" element={<PlaceholderPage />} />
        <Route path="/hacker-news" element={<PlaceholderPage />} />
        <Route path="/todo-list" element={<PlaceholderPage />} />
        <Route path="/movie-search" element={<PlaceholderPage />} />
        <Route path="/timer" element={<PlaceholderPage />} />
        <Route path="/pokemon-list" element={<PlaceholderPage />} />
        <Route path="/contact-book" element={<PlaceholderPage />} />
        <Route path="/typewriter" element={<PlaceholderPage />} />
        <Route path="/reservation" element={<PlaceholderPage />} />
        <Route path="/github-issues" element={<PlaceholderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;