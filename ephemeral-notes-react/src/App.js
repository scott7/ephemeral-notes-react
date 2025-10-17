import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Notes from './pages/Notes';
import View from './pages/View';
import { NotesProvider } from './pages/NotesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import NavBar from './pages/NavBar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/theme.css';
import './styles/NavBar.css';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
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
      </ThemeProvider>
    </Router>
  );
};

export default App;
