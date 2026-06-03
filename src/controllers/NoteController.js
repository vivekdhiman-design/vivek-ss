export default class NoteController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindSaveNote(this.handleSaveNote.bind(this));
    this.view.bindClearForm(this.handleClearForm.bind(this));
    this.view.bindDeleteNote(this.handleDeleteNote.bind(this));

    this.renderNotes();
  }

  handleSaveNote() {
    const { title, content } = this.view.getFormData();

    if (!title || !content) {
      this.view.showMessage('Please add both a title and note content.');
      return;
    }

    this.model.addNote(title, content);
    this.view.clearForm();
    this.renderNotes();
  }

  handleClearForm() {
    this.view.clearForm();
  }

  handleDeleteNote(noteId) {
    this.model.deleteNote(noteId);
    this.renderNotes();
  }

  renderNotes() {
    const notes = this.model.getNotes();
    this.view.renderNotes(notes);
  }
}
