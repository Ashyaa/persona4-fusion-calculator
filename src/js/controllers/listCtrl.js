'use strict';

var listCtrl = function($scope, $location, $anchorScroll) {
  
  $scope.$watch('gameChosen', function(){
    
      switch ($scope.gameChosen){
        case '':
          $('body').css("background-color","yellow");
          break;        
        case 'p4': 
          $scope.personae = require('../data/DataP4').personae;
          $('body').css("background-color","yellow");
          break;
        case 'p4g': 
          $scope.personae = require('../data/DataP4G').personae;
          $('body').css("background-color","#fee727");
          break;
        // case 'p5': 
        //   $scope.personae = require('../data/DataP5').personae;
        //   $('body').css("background-color","red");
        //   $('body').css("font-family", "Times New Roman");
        //   $('h1').css("text-shadow","none");
        //   break;
        default:
            
      }  
    });
    
    $scope.goTop = function() {

      $location.hash('header');

      $anchorScroll();
    };
  
};

module.exports = listCtrl;