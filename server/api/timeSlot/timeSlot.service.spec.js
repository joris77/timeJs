'use strict';

var should = require('should');
var TimeSlot = require('./timeSlot.model');
var service = require('./timeSlot.service');

describe('grouping by day', function () {

    it('should order by day', function (done) {
        var timeSlotsGroupedByDay = service.groupByDay([
            new TimeSlot({"_id": "540b93deddbf063a1b3fd650", "beginDate": "2014-09-06T14:08:00.000Z", "__v": 0, "endDate": "2014-09-07T14:45:00.000Z"}),
            new TimeSlot({"_id": "540b93b1ddbf063a1b3fd64e", "beginDate": "2014-09-06T15:07:00.000Z", "__v": 0, "endDate": "2014-09-07T15:08:00.000Z"}),
            new TimeSlot({"_id": "540b91ccddbf063a1b3fd64d", "beginDate": "2014-09-06T16:59:00.000Z", "__v": 0, "endDate": "2014-09-06T17:15:00.000Z"}),
            new TimeSlot({"_id": "540b838049c40988101937c5", "beginDate": "2014-09-05T09:58:00.000Z", "__v": 0, "endDate": "2014-09-06T10:17:00.000Z"}),
            new TimeSlot({"_id": "540b143ff88f26090435b501", "beginDate": "2014-09-05T02:03:00.000Z", "__v": 0, "endDate": "2014-09-05T04:03:00.000Z"}),
            new TimeSlot({"_id": "540b9105ddbf063a1b3fd64b", "beginDate": "2014-09-01T10:55:00.000Z", "__v": 0, "endDate": "2014-09-01T10:56:00.000Z"})
        ]);

        var septemberSixth = timeSlotsGroupedByDay[0];
        septemberSixth.date.format('YYYY-MM-DD').should.eql('2014-09-06');
        septemberSixth.slots.length.should.eql(3);
        septemberSixth.durationText().should.eql('00:54');

        var septemberFifth = timeSlotsGroupedByDay[1];
        septemberFifth.date.format('YYYY-MM-DD').should.eql('2014-09-05');
        septemberFifth.slots.length.should.eql(2);
        septemberFifth.duration.format('HH:mm').should.eql('02:19');

        var septemberFirst = timeSlotsGroupedByDay[2];
        septemberFirst.date.format('YYYY-MM-DD').should.eql('2014-09-01');
        septemberFirst.slots.length.should.eql(1);
        septemberFirst.duration.format('HH:mm').should.eql('00:01');

        done();
    });
});