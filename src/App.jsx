import React, { useState, useEffect } from "react";
import NotesGrid from "./components/NotesGrid";
import NoteModal from "./components/NoteModal";
import Pagination from "./components/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import "/src/styles/App.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const notesPerPage = 6;

  const fetchNotes = async () => {
    try {
      const notesCollection = collection(db, "notes");
      const notesSnapshot = await getDocs(notesCollection);
      const notesList = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedNotes = notesList.sort((a, b) => b.pinned - a.pinned);
      setNotes(sortedNotes);
    } catch (error) {
      toast.error("Failed to fetch notes!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = async (note) => {
    try {
      if (note.id) {
        const noteRef = doc(db, "notes", note.id);
        await updateDoc(noteRef, note);
      } else {
        const notesCollection = collection(db, "notes");
        await addDoc(notesCollection, { ...note, tagline: "", pinned: false });
      }
      toast.success("Note saved successfully!");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to save note!");
      console.error(error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const noteRef = doc(db, "notes", noteId);
      await deleteDoc(noteRef);
      toast.success("Note deleted successfully!");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to delete note!");
      console.error(error);
    }
  };

  const togglePin = async (noteId) => {
    try {
      const note = notes.find((note) => note.id === noteId);
      const noteRef = doc(db, "notes", noteId);
      await updateDoc(noteRef, { pinned: !note.pinned });
      toast.success("Note updated successfully!");
      fetchNotes();
    } catch (error) {
      toast.error("Failed to update note!");
      console.error(error);
    }
  };

  const changePage = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(notes.length / notesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleAddNote = () => {
    setCurrentNote(null); // Reset currentNote to null
    setModalOpen(true); // Open the modal
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div className="app">
      <header>
        <h1>Notekeeper</h1>
      </header>
      <ToastContainer />
      <div className="main-content">
        <aside className="sidebar">
          <button onClick={handleAddNote} className="add-note-btn">
            Add Note
          </button>
        </aside>
        <div className="content">
          <NotesGrid
            notes={currentNotes}
            onOpen={(note) => {
              setCurrentNote(note);
              setModalOpen(true);
            }}
            onPin={togglePin}
            onDelete={deleteNote}
          />
          <Pagination
            totalNotes={notes.length}
            notesPerPage={notesPerPage}
            currentPage={currentPage}
            onChangePage={changePage}
          />
          <NoteModal
            note={currentNote}
            isOpen={isModalOpen}
            onClose={() => {
              setModalOpen(false);
              setCurrentNote(null);
            }}
            onSave={(note) => {
              saveNote(note);
              setModalOpen(false);
              setCurrentNote(null);
            }}
          />
        </div>
      </div>
      <footer>
        <p>© 2024 Notekeeper | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
