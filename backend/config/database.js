const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/calendar';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;