import React from 'react';
import { useNotes } from './NotesContext';
import '../styles/NavBar.css';

const Navbar = () => {
  const { notes } = useNotes();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {notes.length > 0 ? (
            <ul className="navbar-nav flex-row">
              {notes.map((note) => (
                <li key={note.id} className="nav-item me-3">
                  <a className="nav-link text-primary nav-hover" href={`/${note.id}`}>
                    <i className="bi bi-pencil-square"></i> {note.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <span className="navbar-text">Welcome</span>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
