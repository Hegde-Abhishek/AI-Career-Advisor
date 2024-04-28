const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController'); // Import userController
const jobController = require('./controllers/jobController'); // Import jobController
const eventController = require('./controllers/eventController'); // Import eventController
const userRoutes = require('./routes/user')
// const tipsRoutes = require('./routes/tips');
const tipsController = require('./controllers/tipsController');
const visaController = require('./controllers/visaController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
// app.use('/api', tipsRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/career-advisor', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Use userController functions as middleware for corresponding routes
app.post('/api/login', userController.login);
app.post('/api/register', userController.register);
app.get('/api/jobs', jobController.getJobs);
app.get('/api/personalized-events', eventController.getEvents);
app.post('/api/personalized-tips', tipsController.generatePersonalizedTips);
app.get('/api/visa-advice/:userId', visaController.getVisaAdvice);


