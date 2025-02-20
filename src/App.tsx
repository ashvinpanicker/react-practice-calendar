import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Calendar } from './components/Calendar';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { PublicHolidaysPage } from './pages/PublicHolidaysPage';
import { AccordionPage } from './pages/AccordionPage';
import { LocalStorageHookPage } from './pages/LocalStorageHookPage';
import { MemoryGamePage } from './pages/MemoryGamePage';
import { HackerNewsPage } from './pages/HackerNewsPage';
import { TodoListPage } from './pages/TodoListPage';
import { MovieSearchPage } from './pages/MovieSearchPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/holidays" element={<PublicHolidaysPage />} />
        <Route path="/accordion" element={<AccordionPage />} />
        <Route path="/local-storage-hook" element={<LocalStorageHookPage />} />
        <Route path="/memory-game" element={<MemoryGamePage />} />
        <Route path="/hacker-news" element={<HackerNewsPage />} />
        <Route path="/todo-list" element={<TodoListPage />} />
        <Route path="/movie-search" element={<MovieSearchPage />} />
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