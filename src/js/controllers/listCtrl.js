'use strict';

var data = require('../data/Data');

var listCtrl = function($scope) {
  $scope.personae = data.personae;
};

module.exports = listCtrl;