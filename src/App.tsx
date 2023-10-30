import CalendarPage from './calendar/CalendarPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/about" element={<div>Odense LMU er en forening</div>} />
      <Route path="*" element={<div>404 - Denne side findes ikke</div>} />
    </Routes>
  );
}

export default App;
