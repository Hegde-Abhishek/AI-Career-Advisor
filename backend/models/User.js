const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Existing fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // New fields for additional user information
  workHistory: [{ company: String, position: String, startDate: Date, endDate: Date }],
  skills: [String],
  preferences: [String],
  careerGoal: String,
  workValue: String,
  internationalStudent: Boolean,
  // New fields for education
  education: {
    currentMajor: String,
    degree: String,
    programStartDate: Date,
    programEndDate: Date,
    semester: String,
    currentGPA: Number,
    lookingForSummerInternship: Boolean,
    lookingForCoop: Boolean,
    lookingForFullTimeJob: Boolean,
    // Add more fields as needed
  },
});

module.exports = mongoose.model('User', userSchema);