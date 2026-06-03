# MVC Notepad Application Structure

This project uses a simple MVC pattern for a beginner-friendly notepad application.

## Folder Structure

```text
vivek-ss/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── app.js
    ├── models/
    │   └── NoteModel.js
    ├── views/
    │   └── NoteView.js
    └── controllers/
        └── NoteController.js
```

## MVC Responsibilities

- **Model:** Handles note data and local browser storage.
- **View:** Handles the page elements, form, and note rendering.
- **Controller:** Connects the model and view, and manages user actions.

## Current Features

- Create notes
- View saved notes
- Edit notes
- Delete notes
- Save notes in localStorage
