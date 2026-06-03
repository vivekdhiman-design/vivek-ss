import NoteModel from './models/NoteModel.js';
import NoteView from './views/NoteView.js';
import NoteController from './controllers/NoteController.js';

const model = new NoteModel();
const view = new NoteView();

new NoteController(model, view);
