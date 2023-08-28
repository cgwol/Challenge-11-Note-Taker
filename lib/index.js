const fs = require('fs');
const path = require('path');

function createNote(note, db){
    db.push(note);

    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if(err){
            console.error('ERROR writing to db.json', err);
            res.status(500).json({ message: 'Server error' });
        }
    });
}

function editNote(note, db){
    const index = db.findIndex(editedNote => editedNote.id == note.id);
    db.splice(index, 1);
    db.splice(index, 0, note);

    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if(err){
            console.error('ERROR writing to db.json', err);
            res.status(500).json({ message: 'Server error' });
        }
    });
}

function deleteNote(note, db){
    const index = db.findIndex(removedNote => removedNote.id == note.id);
    db.splice(index, 1);

    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if(err){
            console.error('ERROR writing to db.json', err);
            res.status(500).json({ message: 'Server error' });
        }
    });
}

function getNote(id, db){
    const result = db.filter(note => note.id === id)[0];
    return result;
}

module.exports = { createNote, editNote, deleteNote, getNote };