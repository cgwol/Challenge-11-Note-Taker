const router = require('express').Router();
const notes = require('./notesRoutes');

router.use(notes);

module.exports = router;