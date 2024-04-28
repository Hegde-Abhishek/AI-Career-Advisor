const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  // title: { type: String, required: true },
  // description: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  applicationLink: { type: String, required: false },
  datePosted: { type: Date, required: false },
});

module.exports = mongoose.model('JobData', jobSchema);
