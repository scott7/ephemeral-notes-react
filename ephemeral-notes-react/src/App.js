import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';
import View from './pages/View';
import { NotesProvider } from './pages/NotesContext';
import NavBar from './pages/NavBar';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
  return (
    <Router>
      <NotesProvider>
        <div>
          <NavBar />

          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/:noteId" element={<Notes />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </div>
      </NotesProvider>
    </Router>
  );
};

export default App;
