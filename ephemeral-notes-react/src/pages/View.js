import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotes } from './NotesContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function View() {
    const { refreshNotes, notes } = useNotes();

    const navigate = useNavigate();

    const handleRefresh = () => {
      refreshNotes();
    };

    const deleteNote = async (noteId) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/delete/${noteId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          handleRefresh();
        } else {
          throw new Error('Failed to delete the note.');
        }
      } catch (error) {
        console.error('Error deleting note: ', error);
      }
    };

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
              <li key={note.id} className="nav-item">
                <span className="nav-link text bg-light">
                  {note.title}
                </span>
                <button onClick={() => navigate(`/${note.id}`)} className="btn btn-primary">
                  Edit
                </button>
                <button onClick={() => onDelete(note.id)} className="btn btn-danger">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes found.</p>
        )}
      </>
    );
  };