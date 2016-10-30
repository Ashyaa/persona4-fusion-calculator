'use strict';

var listCtrl = function($rootScope, $scope, $location, $anchorScroll) {

    $rootScope.calcDisplayed = false;

    $scope.goTop = function() {

      $location.hash('header');

      $anchorScroll();
    };
  
};

module.exports = listCtrl;