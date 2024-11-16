import React from 'react';
import { useNotes } from './NotesContext';

const Navbar = () => {
  const { notes } = useNotes();

  return (
    <nav className="navbar navbar-light bg-light">
      {notes.length > 0 ? (
        <ul className="navbar-nav">
          {notes.map((note) => (
            <li key={note._id} className="nav-item">
              <a className="nav-link text-primary bg-light" href={`/${note._id}`}>
                <i className="bi bi-pencil-square"></i> {note.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <span className="navbar-text">Welcome</span>
      )}
    </nav>
  );
};

export default Navbar;
