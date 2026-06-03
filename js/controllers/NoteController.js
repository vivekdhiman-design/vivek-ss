export default class NoteController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindSaveNote(this.handleSaveNote.bind(this));
    this.view.bindClearForm(this.handleClearForm.bind(this));
    this.view.bindNoteActions(
      this.handleEditNote.bind(this),
      this.handleDeleteNote.bind(this)
    );

    this.render();
  }

  render() {
    this.view.renderNotes(this.model.getNotes());
  }

  handleSaveNote() {
    const { title, content } = this.view.getFormData();

    if (!title || !content) {
      alert("Please add both a title and note content.");
      return;
    }

    if (this.view.editingNoteId) {
      this.model.updateNote(this.view.editingNoteId, title, content);
    } else {
      this.model.addNote(title, content);
    }

    this.view.clearForm();
    this.render();
  }

  handleClearForm() {
    this.view.clearForm();
  }

  handleEditNote(id) {
    const note = this.model.getNotes().find((item) => item.id === id);

    if (note) {
      this.view.fillForm(note);
    }
  }

  handleDeleteNote(id) {
    const shouldDelete = confirm("Delete this note?");

    if (!shouldDelete) return;

    this.model.deleteNote(id);
    this.render();
  }
}
