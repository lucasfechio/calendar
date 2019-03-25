const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    date: {
        type: Date,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    startTime: {
        type: String,
        trim: true,
        required: true
    },
    endTime: {
        type: String,
        trim: true,
        required: true
    },
    userID: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Event', EventSchema)