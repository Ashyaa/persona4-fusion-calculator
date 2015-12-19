'use strict';

var listCtrl = function($scope, $location, $anchorScroll) {
     
    $scope.goTop = function() {

      $location.hash('header');

      $anchorScroll();
    };
  
};

module.exports = listCtrl;