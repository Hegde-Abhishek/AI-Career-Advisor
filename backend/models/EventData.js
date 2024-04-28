const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // description: { type: String, required: true },
  dateTime: { type: String, required: true },
  location: { type: String, required: true },
  // skills: [String], // Skills related to the event
  fees: { type: String, required: false },
  category: { type: String, required: false },
  eventLink: { type: String, required: true },
  shareLink: { type: String, required: true },
});

module.exports = mongoose.model('EventData', eventSchema);
