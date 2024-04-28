const mongoose = require('mongoose');

const visaRulesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('VisaRulesData', visaRulesSchema);
