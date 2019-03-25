const eventModel = require('../models/events');

module.exports = {
    getAll: async function (req, res, next) {
        let eventsList = [];
        eventModel.find({}, function (err, events) {
            if (err) {
                next(err);
            } else {
                for (let event of events) {
                    eventsList.push({ id: event._id, date: event.date, description: event.description, startTime: event.startTime, endTime: event.endTime, userID: event.userID });
                }
                res.json({ status: "success", message: "Events list found!!!", data: { events: eventsList } });
            }
        });
    },
    updateById: async function (req, res, next) {
        eventModel.findByIdAndUpdate(req.params.eventId, { date: req.body.date, description: req.body.description, startTime: req.body.startTime, endTime: req.body.endTime }, function (err, eventInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Event updated successfully!!!", data: null });
            }
        });
    },
    deleteById: async function (req, res, next) {
        eventModel.findByIdAndRemove(req.params.eventId, function (err, eventInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: "success", message: "Event deleted successfully!!!", data: null });
            }
        });
    },
    create: async function (req, res, next) {
        eventModel.findOne({ date: req.body.date, userID: req.body.userID }, function (err, eventInfo) {
            if (err) {
                next(err);
            } else if (eventInfo !== null) {
                if ((req.body.startTime >= eventInfo.startTime && req.body.startTime < eventInfo.endTime) ||
                    (req.body.endTime > eventInfo.startTime && req.body.endTime <= eventInfo.endTime) ||
                    (req.body.startTime === eventInfo.startTime && req.body.endTime === eventInfo.endTime)) {
                    res.json({ status: "error", message: "Event already exists", data: { eventID: eventInfo._id } });
                } else {
                    eventModel.create({ date: req.body.date, description: req.body.description, startTime: req.body.startTime, endTime: req.body.endTime, userID: req.body.userID }, function (err, result) {
                        if (err)
                            next(err);
                        else
                            res.json({ status: "success", message: "Event added successfully!!!", data: null });
                    });
                }
            } else {
                eventModel.create({ date: req.body.date, description: req.body.description, startTime: req.body.startTime, endTime: req.body.endTime, userID: req.body.userID }, function (err, result) {
                    if (err)
                        next(err);
                    else
                        res.json({ status: "success", message: "Event added successfully!!!", data: null });
                });
            }
        })
    },
}