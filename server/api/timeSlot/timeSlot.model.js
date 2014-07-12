'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TimeSlotSchema = new Schema({
  beginDate: Date,
  endDate: Date,
  task: String
});

module.exports = mongoose.model('TimeSlot', TimeSlotSchema);