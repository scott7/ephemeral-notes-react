import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from './NotesContext';
import ShowEditor from './ShowEditor';

const Notes = () => {
    const { refreshNotes } = useNotes();
    const [notes, setNotes] = useState([]);
    var [note, setNote] = useState({
      title: '',
      note_body: '',
      id: '',
    });

    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const { noteId } = useParams();
  
    const navigate = useNavigate();
  
    const handleRefresh = () => {
      refreshNotes();
    };

    // Fetch notes from the backend
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/notes`)
        .then(response => response.json())
        .then(data =>  {
          if (Array.isArray(data)) {
            setNotes(data);
        } else {
            console.error('Data is not an array', data);
            setNotes([]); 
        }
      })
        .catch(error => console.error('Error fetching notes:', error));
    }, []);

    useEffect(() => {
        if (!noteId) return
        const fetchNoteDetails = async () => {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/find/${noteId}`);
          const data = await response.json();
          setNote(data); // Assuming the API returns the note object
        };
    
        fetchNoteDetails();
      }, [noteId]); // Re-fetch if noteId changes
  
    // implement delete note logic 
    const deleteNote = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/delete/${note.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          console.log('completed');
          setMessage('Note deleted successfully.');
          setShowMessage(true);
          setNote({ title: '', note_body: '' }); // Reset form
          navigate('/');
          handleRefresh();
        } else {
          throw new Error('Failed to delete the note.');
        }
      } catch (error) {
        setMessage('Failed to delete the note.');
        setShowMessage(true);
      }
    };

    // handle delete
    const handleDelete = () => {
      const isConfirmed = window.confirm('Are you sure you want to delete this note?');
      if (isConfirmed) {
        deleteNote();
      }
    };

    // Handle input change
    const handleChange = (e) => {
      setNote({
        ...note,
        [e.target.name]: e.target.value
      });
    };
  
    // Handle form submission to add a new note / modify
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      })
        .then(response => response.json())
        .then(data => {
          setNotes([...notes, data]);
          setNote({ title: '', note_body: '' });
          setMessage('Submitted succesfully.');
          setShowMessage(true);
          navigate('/');
          handleRefresh(); 
        })
        .catch(error => console.error('Error adding note:', error));
    };

    if (!note) {
        note = {title: '', note_body: ''};
    }
  
    return (
      <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span id="inputGroup-sizing-default" className="input-group-text">Title</span>
            </div>
            <input className="form-control" type="text" aria-label="title input" aria-describedby="inputGroup-sizing-default" name="title" onChange={handleChange} placeholder='Title...' value={note.title || ''}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="note_body"></label>
          <ShowEditor 
            name="note_body"
            value={note.note_body || ''}
            onChange={(content) => handleChange({ target: { name: 'note_body', value: content } })} 
          /> 
        </div>
        <div className="expiration">
          <label htmlFor="expiration">Keep forever:</label>
          <input id="expiration" className="expiration" type="checkbox" name="expiration"/>
        </div>
        <div className="buttons-container">
          <button className="btn btn-primary bi bi-pencil" type="submit">Submit</button>
          <button className="btn btn-danger bi bi-trash" disabled={!note.id} type="button" onClick={handleDelete}>Delete</button>
          <p></p>
          {showMessage && <div>{message}</div>}
        </div>
        <br></br>
      </form>
      </div>
    );
  }
  
  export default Notes;