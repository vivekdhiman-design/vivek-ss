export default class NoteView {
  constructor() {
    this.titleInput = document.getElementById("note-title");
    this.contentInput = document.getElementById("note-content");
    this.saveButton = document.getElementById("save-note");
    this.clearButton = document.getElementById("clear-form");
    this.notesList = document.getElementById("notes-list");
    this.editingNoteId = null;
  }

  getFormData() {
    return {
      title: this.titleInput.value.trim(),
      content: this.contentInput.value.trim()
    };
  }

  clearForm() {
    this.titleInput.value = "";
    this.contentInput.value = "";
    this.editingNoteId = null;
    this.saveButton.textContent = "Save Note";
  }

  fillForm(note) {
    this.titleInput.value = note.title;
    this.contentInput.value = note.content;
    this.editingNoteId = note.id;
    this.saveButton.textContent = "Update Note";
  }

  renderNotes(notes) {
    if (notes.length === 0) {
      this.notesList.innerHTML = `<div class="empty-state">No notes yet. Write your first note above.</div>`;
      return;
    }

    this.notesList.innerHTML = notes
      .map(
        (note) => `
          <article class="note-card" data-id="${note.id}">
            <h3>${this.escapeHTML(note.title)}</h3>
            <p>${this.escapeHTML(note.content)}</p>
            <small>Created: ${note.createdAt}</small>
            ${note.updatedAt ? `<br><small>Updated: ${note.updatedAt}</small>` : ""}
            <div class="note-card-actions">
              <button class="edit-note">Edit</button>
              <button class="delete-note danger">Delete</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  bindSaveNote(handler) {
    this.saveButton.addEventListener("click", handler);
  }

  bindClearForm(handler) {
    this.clearButton.addEventListener("click", handler);
  }

  bindNoteActions(editHandler, deleteHandler) {
    this.notesList.addEventListener("click", (event) => {
      const noteCard = event.target.closest(".note-card");

      if (!noteCard) return;

      const noteId = noteCard.dataset.id;

      if (event.target.classList.contains("edit-note")) {
        editHandler(noteId);
      }

      if (event.target.classList.contains("delete-note")) {
        deleteHandler(noteId);
      }
    });
  }

  escapeHTML(text) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
}
