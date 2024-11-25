import React, { useState, useEffect } from "react";
import "/src/styles/NoteModal.css";

const NoteModal = ({ note, isOpen, onClose, onSave }) => {
  const [noteData, setNoteData] = useState({ title: "", tagline: "", body: "" });

  useEffect(() => {
    if (note) {
      setNoteData(note);
    } else {
      // Reset fields when adding a new note
      setNoteData({ title: "", tagline: "", body: "" });
    }
  }, [note]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{note ? "Edit Note" : "Add Note"}</h2>
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter Title"
            value={noteData.title}
            onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter Tagline"
            value={noteData.tagline}
            onChange={(e) => setNoteData({ ...noteData, tagline: e.target.value })}
          />
          <textarea
            placeholder="Enter Body"
            value={noteData.body}
            onChange={(e) => setNoteData({ ...noteData, body: e.target.value })}
          ></textarea>
        </div>
        <button className="button"onClick={() => onSave(noteData)}>Save</button>
        <button className="button-cancle"onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NoteModal;
