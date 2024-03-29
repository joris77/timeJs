'use strict';


angular.module('mean101App')
    .controller('MainCtrl', function ($scope, $http, $log) {

        var dateFormat = 'YYYY-MM-DD';
        var timeFormat = 'HH:mm';
        var dateTimeFormat = dateFormat + ' ' + timeFormat;
        $scope.dateTimeFormat = dateTimeFormat;
        var currentTimeSlot;

        function getDatePartFromDate(date) {
            return date ? moment(date).format(dateFormat) : undefined;
        }

        function getTimeFromFromDate(date) {
            return date ? moment(date).format(timeFormat) : undefined;
        }

        function getDate(date, time) {
            return date && time ? date + ' ' + time : undefined;
        }


        function setCurrent() {
            $http.get('/api/timeSlots/current').success(function (data,status) {
                $log.log('Current ' + data);
                var now = moment();
                if (status === 200) {
                    currentTimeSlot = data;
                    $scope.form = {
                        date: getDatePartFromDate(currentTimeSlot.beginDate),
                        beginTime: getTimeFromFromDate(currentTimeSlot.beginDate),
                        endDate: getDatePartFromDate(now),
                        endTime: getTimeFromFromDate(now)
                    };
                } else {
                    currentTimeSlot = {};
                    $scope.form = {
                        date: getDatePartFromDate(now),
                        beginTime: getTimeFromFromDate(now)
                    };
                }
            });
        }

        setCurrent();

        function setRecent() {
            $http.get('/api/timeSlots/recent').success(function (data) {
                $scope.recent = data;
            });
        }

        setRecent();

        $scope.clickHeading = function(date){
            if($scope.openDate == date){
                $scope.openDate = null;
            }else{
                $scope.openDate = date;
            }
        }


        $scope.addTime = function () {
            var f = $scope.form;
            currentTimeSlot.beginDate = getDate(f.date, f.beginTime);
            currentTimeSlot.endDate = getDate(f.date, f.endTime);
            if (currentTimeSlot._id) {
                $http.put('/api/timeSlots/' + currentTimeSlot._id, currentTimeSlot).success(function(){
                    setCurrent();
                    setRecent();
                });
            } else {
                $http.post('/api/timeSlots', currentTimeSlot).success(function(){
                    setCurrent();
                    setRecent();
                });
            }

        };

        $scope.delete = function(id){
            $http.delete('/api/timeSlots/' + id).success(function(){
                setCurrent();
                setRecent();
            });
        };
    });