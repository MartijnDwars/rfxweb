define(['angular'], function (angular) {
    'use strict';

    return angular.module('myApp.controllers', ['myApp.services'])
        .controller('DashboardCtrl', function ($scope, device, socket, notify) {
            $scope.devices = device.devices();

            var STATE_ON = 1;
            var STATE_OFF = 0;

            $scope.lightOn = function (device) {
                socket.emit('lightOn', {
                    code: device.code,
                    state: STATE_ON
                });
            }

            $scope.lightOff = function (device) {
                socket.emit('lightOff', {
                    code: device.code,
                    state: STATE_OFF
                });
            }

            // Incoming data
            socket.on('ACK', function (data) {
                notify.add('Acknowledgement received');
            });
        })
    .controller('DevicesCtrl', function ($scope, $location, device) {
        $scope.device = {
            name: '',
            code: ''
        };

        $scope.addDevice = function () {
            // Add device
            device.add($scope.device);

            // Forward
            $location.path('/');
        };
    });
});