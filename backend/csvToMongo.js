// In your backend, create a script file: csvToMongo.js

const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const EventData = require('./models/EventData'); // Adjust the path as necessary

const csvFilePath = "C:/Users/Abhishek/Downloads/eventbrite (1).csv"; // Update this path

mongoose.connect('mongodb://127.0.0.1:27017/career-advisor', { useNewUrlParser: true, useUnifiedTopology: true });

const importEventsFromCSV = async () => {
    const events = [];
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => events.push(row))
        .on('end', () => {
            EventData.insertMany(events)
                .then(() => console.log('Events Inserted'))
                .catch((error) => console.error('Insertion error:', error));
        });
};

importEventsFromCSV();
