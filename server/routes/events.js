const express = require('express');
const router = express.Router();
const {getEvents, getEvent, createEvent, updateEvent, deleteEvent} = require('../controllers/eventController.js');


// GET all events
router.get('/', getEvents);

// GET event by ID
router.get('/:_id', getEvent); 

// Create an event
router.post('/', createEvent);

// Edit an event
router.put('/:_id', updateEvent);

// Delete an event
router.delete('/:_id', deleteEvent);

module.exports = router;
