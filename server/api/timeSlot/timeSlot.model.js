'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');


var TimeSlotSchema = new Schema({
  beginDate: Date,
  endDate: Date,
  task: String
});

function dateToDay(beginDate) {
    return moment([beginDate.getFullYear(), beginDate.getMonth(), beginDate.getDate()]);
}
TimeSlotSchema.methods.getBeginDay = function(){
    var beginDate = this.beginDate;
    return dateToDay(beginDate);
}

TimeSlotSchema.methods.getEndDay = function(){
    var beginDate = this.beginDate;
    return dateToDay(beginDate);
}

TimeSlotSchema.methods.endsOnSameDay = function(){
    return this.getBeginDay().isSame(this.getEndDay());
}

TimeSlotSchema.methods.getDuration = function(){
    return moment.utc(moment(this.endDate).diff(moment(this.beginDate)));
}




module.exports = mongoose.model('TimeSlot', TimeSlotSchema);