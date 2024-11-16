import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/notes`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Exposed function to refresh notes by re-calling fetchNotes
  const refreshNotes = () => {
    fetchNotes();
  };

  
  return (
    <NotesContext.Provider value={{ notes, refreshNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
