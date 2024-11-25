import React from "react";
import "/src/styles/NotesGrid.css";

const NotesGrid = ({ notes, onOpen, onDelete, onPin }) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} className="note" onClick={() => onOpen(note)}>
          <h3>{note.title}</h3>
          <p className="tagline">{note.tagline}</p>
          <p>{note.body}</p>
          <div className="note-actions">
            <button
              className="pin-btn"
              onClick={(e) => {
                e.stopPropagation();
                onPin(note.id);
              }}
            >
              {note.pinned ? "Pinned" : "Pin"}
            </button>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesGrid;
