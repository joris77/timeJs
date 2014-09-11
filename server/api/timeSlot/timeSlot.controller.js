'use strict';

var _ = require('lodash');
var TimeSlot = require('./timeslot.model');
var service = require('./timeslot.service');
var moment = require('moment');

// Get list of things
exports.index = function (req, res) {
    TimeSlot.find(function (err, things) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, things);
    });
};


exports.recent = function(req,res) {
    var weekAgo = moment().subtract('days',10)
    TimeSlot.find({beginDate : { '$gte' : weekAgo}}).sort({ beginDate : -1}).exec(
        function (err, slots) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, service.groupByDay(slots));
        }
    );
}

exports.current = function (req, res) {
    TimeSlot.find({ endDate: { $exists: false } }, function (err, openTimeSlots) {
        var currentTimeSlot = openTimeSlots[0];
        if (currentTimeSlot) {
            return res.json(200, currentTimeSlot);

        } else {
            return res.json(204,null);
        }
    });
}

// Get a single thing
exports.show = function (req, res) {
    TimeSlot.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        return res.json(thing);
    });
};

// Creates a new thing in the DB.
exports.create = function (req, res) {
    TimeSlot.create(req.body, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, thing);
    });
};

// Updates an existing thing in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    TimeSlot.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(err);
        }
        if (!thing) {
            return res.send(404);
        }
        var updated = _.merge(thing, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(err);
            }
            return res.json(200, thing);
        });
    });
};

// Deletes a thing from the DB.
exports.destroy = function (req, res) {
    TimeSlot.findById(req.params.id, function (err, thing) {
        if (err) {
            return handleError(res, err);
        }
        if (!thing) {
            return res.send(404);
        }
        thing.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}