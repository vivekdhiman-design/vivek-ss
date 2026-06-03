export default class NoteModel {
  constructor(storageKey = "mvc-notepad-notes") {
    this.storageKey = storageKey;
    this.notes = this.loadNotes();
  }

  loadNotes() {
    const savedNotes = localStorage.getItem(this.storageKey);
    return savedNotes ? JSON.parse(savedNotes) : [];
  }

  saveNotes() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }

  getNotes() {
    return this.notes;
  }

  addNote(title, content) {
    const note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toLocaleString()
    };

    this.notes.unshift(note);
    this.saveNotes();
    return note;
  }

  updateNote(id, updatedTitle, updatedContent) {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: updatedTitle,
          content: updatedContent,
          updatedAt: new Date().toLocaleString()
        };
      }

      return note;
    });

    this.saveNotes();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveNotes();
  }
}
