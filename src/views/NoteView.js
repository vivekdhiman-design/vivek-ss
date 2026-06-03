export default class NoteView {
  constructor() {
    this.titleInput = document.getElementById('noteTitle');
    this.contentInput = document.getElementById('noteContent');
    this.saveButton = document.getElementById('saveNoteBtn');
    this.clearButton = document.getElementById('clearFormBtn');
    this.notesList = document.getElementById('notesList');
  }

  getFormData() {
    return {
      title: this.titleInput.value.trim(),
      content: this.contentInput.value.trim()
    };
  }

  clearForm() {
    this.titleInput.value = '';
    this.contentInput.value = '';
    this.titleInput.focus();
  }

  renderNotes(notes) {
    this.notesList.innerHTML = '';

    if (notes.length === 0) {
      this.notesList.innerHTML = '<p class="empty-state">No notes yet. Create your first note above.</p>';
      return;
    }

    notes.forEach((note) => {
      const noteCard = document.createElement('article');
      noteCard.className = 'note-card';
      noteCard.innerHTML = `
        <div>
          <h3>${this.escapeHTML(note.title)}</h3>
          <p>${this.escapeHTML(note.content)}</p>
          <small>Created: ${note.createdAt}</small>
        </div>
        <button class="delete-btn" data-id="${note.id}">Delete</button>
      `;

      this.notesList.appendChild(noteCard);
    });
  }

  bindSaveNote(handler) {
    this.saveButton.addEventListener('click', handler);
  }

  bindClearForm(handler) {
    this.clearButton.addEventListener('click', handler);
  }

  bindDeleteNote(handler) {
    this.notesList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const noteId = Number(event.target.dataset.id);
        handler(noteId);
      }
    });
  }

  showMessage(message) {
    alert(message);
  }

  escapeHTML(value) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}
