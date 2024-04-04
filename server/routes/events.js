const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET all events
router.get('/events', eventController.getAllEvents);

// GET one event
router.get('/events/:id', eventController.getEventById); 

// Create an event
router.post('/events', eventController.createEvent);

// Edit an event
router.put('/events/:id', eventController.editEventById);

// Delete an event
router.delete('/events/:id', eventController.deleteEventById);

module.exports = router;
