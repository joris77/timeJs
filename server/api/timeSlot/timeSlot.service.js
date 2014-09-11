'use strict';

var moment = require('moment');

var dateFormat = 'YYYY MM DD';

function getDay(days, dayToFind) {
    for (var i=0, iLen=days.length; i<iLen; i++) {

        var dayFromDays = days[i];
        if (dayFromDays.date.format(dateFormat) ===  dayToFind.format(dateFormat)){
            return dayFromDays;
        }
    }
    return null;
}

module.exports.groupByDay = function(slots){
    var days = [];
    var currentDay;
    for(var i in slots){
        var slot = slots[i];
        var beginDay = slot.getBeginDay();

        if(slot.endsOnSameDay()){
            var duration = slot.getDuration();
            var day = getDay(days, beginDay);
            if(!day){
                day = {
                    date: beginDay,
                    duration: null,
                    slots: [],
                    add: function(slot){
                        this.slots.push(slot);
                        if(this.duration){
                            this.duration.add(slot.getDuration());
                        }else{
                            this.duration = slot.getDuration();
                        }
                        this.durationText = this.duration.format('HH:mm');
                    }
                }
                days.push(day);
            }
            day.add(slot);

        }else{

        }
    }
    return days;
}