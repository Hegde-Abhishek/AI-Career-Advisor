const JobData = require('../models/JobData');
const EventData = require('../models/EventData');
const VisaRulesData = require('../models/VisaRulesData');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobData.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job listings' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await EventData.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching event listings' });
  }
};

exports.getVisaRulesData = async (req, res) => {
  try {
    const VisaRulesData = await VisaRulesData.find();
    res.json(VisaRulesData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visa rules' });
  }
};
