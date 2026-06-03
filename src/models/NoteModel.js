export default class NoteModel {
  constructor() {
    this.storageKey = 'mvc-notepad-notes';
    this.notes = this.loadNotes();
  }

  loadNotes() {
    const savedNotes = localStorage.getItem(this.storageKey);
    return savedNotes ? JSON.parse(savedNotes) : [];
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }

  getNotes() {
    return this.notes;
  }

  addNote(title, content) {
    const note = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toLocaleString()
    };

    this.notes.unshift(note);
    this.saveToStorage();
    return note;
  }

  deleteNote(noteId) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
    this.saveToStorage();
  }
}
