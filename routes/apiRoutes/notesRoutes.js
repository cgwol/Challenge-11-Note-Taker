const router = require('express').Router();
const db = require('./../../db/db.json');
const { createNote, deleteNote, getNote } = require('../../lib/index')
const { v4: uuidv4 } = require('uuid');
const middle = require('./../../middleware/middle');

router.use(middle);

router.get('/notes', (req, res) => {
    res.status(200).json(db);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4();
    createNote(req.body, db);
    res.status(200).json(req.body);
});

router.delete('/notes/:id', (req, res) => {
    const note = getNote(req.params.id, db);
    deleteNote(note, db);
    res.json();
})

module.exports = router;