const Event = require('../models/EventData');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching event listings:', error);
    res.status(500).json({ error: 'Error fetching event listings' });
  }
};
