const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const { title } = require('process');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Get Method to see the all the notes
app.get('/db', (req, res) => {
    console.info(`${req.method} request recived to see notes`);

    return res.status(200).json(db);
});

// Post method to add a note
app.post('/db', (req, res) => {
    console.info(`${req.method} request recieved to add a note`);

    const newNote = req.body;
    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if (err) {
            console.error('ERROR writing to db.json', err);
            return res.status(500).json({ message: 'Server error' });
        }

        console.log('Note added successfully');
        return res.status(200).json(db);
    })
});

// Delete Method to delete a note from db
app.delete('/db/:title', (req, res) => {

    const titleEncoded = req.params.title.trim();
    const titleDel = decodeURIComponent(titleEncoded);

    const index = db.findIndex(note => note.title == titleDel);

    if (index == -1) { 
        console.log('Note Not Found');
        return res.status(404).json({ message: 'Note not found' }); 
    }

    db.splice(index, 1);

    fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
        if(err){
            console.error('Error writing to db.json:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        console.log('Note Successfully Deleted');
        return res.status(200).json(db);
    });
});

app.listen(PORT, () =>
    console.log(`📝 Note Taker running at http://localhost:${PORT} 📝`)
);