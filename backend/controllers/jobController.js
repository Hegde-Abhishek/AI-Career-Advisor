const Job = require('../models/JobData');
const User = require('../models/User');

exports.getJobs = async (req, res) => {
  try {
    let { preferences, location, page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    let queryConditions = {};
    if (preferences) {
      const preferencesArray = preferences.split(',');
      queryConditions.title = { $in: preferencesArray.map(pref => new RegExp(pref, 'i')) };
    }
    if (location === 'Remote') {
      queryConditions.location = new RegExp('Remote', 'i'); // Adjust as necessary to match your data
    }

    const jobs = await Job.find(queryConditions).skip(skip).limit(limit);
    const totalJobs = await Job.countDocuments(queryConditions);

    const jobsWithExplanation = jobs.map(job => {
      const matchedPreferences = preferences.split(',').filter(pref => job.title.toLowerCase().includes(pref.toLowerCase()));
      const explanation = matchedPreferences.length > 0
        ? `Matched based on your interest in ${matchedPreferences.join(', ')}`
        : `Listed because it might be of interest to you.`;
      return { ...job._doc, explanation };
    });

    res.json({
      jobs: jobsWithExplanation,
      total: totalJobs,
      page,
      totalPages: Math.ceil(totalJobs / limit),
    });
  } catch (error) {
    console.error('Error fetching job listings:', error);
    res.status(500).json({ error: 'Error fetching job listings' });
  }
};

