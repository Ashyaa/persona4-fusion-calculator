'use strict';

var data = require('../data/DataP4');

var listCtrl = function($scope) {
  $scope.personae = data.personae;
};

module.exports = listCtrl;