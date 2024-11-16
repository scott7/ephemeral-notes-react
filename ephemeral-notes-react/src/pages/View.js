import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotes } from './NotesContext';

export default function View() {
    const { refreshNotes, notes } = useNotes();

    const navigate = useNavigate();

    const handleRefresh = () => {
      refreshNotes();
    };

    // implement delete note logic 
    const deleteNote = async (noteId) => {
      try {
        const response = await fetch(`http://localhost:8000/api/delete/${noteId}`, {
          method: 'GET',
        });
        if (response.ok) {
          console.log('completed');
          handleRefresh();
        } else {
          throw new Error('Failed to delete the note.');
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    };

    // handle delete
    const onDelete = (noteId) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this note?');
      if (isConfirmed) {
        deleteNote(noteId);
      }
    };
  
    return (
      <>
        <h3>Notes List</h3>
        <br />
        {notes.length > 0 ? (
          <ul className='no-bullets'>
            {notes.map(note => (
              <li key={note._id} className="nav-item">
                <span className="nav-link text bg-light">
                  {note.title}
                </span>
                <button onClick={() => navigate(`/${note._id}`)} className="btn btn-primary">
                  Edit
                </button>
                <button onClick={() => onDelete(note._id)} className="btn btn-danger">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className='no-bullets'><li>Nothing found.</li></ul>
        )}
      </>
    );
  };