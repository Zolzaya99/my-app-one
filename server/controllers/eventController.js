const Event = require('../models/event');

// get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get one event by ID
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Cannot find event' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// create a new event
exports.createEvent = async (req, res) => {
    const event = new Event({
        title: req.body.title,
        date: req.body.date,
        location: req.body.location,
        description: req.body.description
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    const eventId = req.params.id;
  
    try {
      // Find the event by ID
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Update the event with the new data
      event.title = req.body.title;
      event.date = req.body.date;
      event.location = req.body.location;
      event.description = req.body.description;
  
      // Save the updated event
      const updatedEvent = await event.save();
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// delete an event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Cannot find event' });
        }
        await event.remove();
        res.json({ message: 'Deleted Event' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
