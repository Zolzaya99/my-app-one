const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET all events
router.get('/events', eventController.getAllEvents);

// GET event by ID
router.get('/events/:id', eventController.getEvent); 

// Create an event
router.post('/events', eventController.createEvent);

// Edit an event
router.put('/events/:id', eventController.updateEvent);

// Delete an event
router.delete('/events/:id', eventController.deleteEvent);

module.exports = router;
