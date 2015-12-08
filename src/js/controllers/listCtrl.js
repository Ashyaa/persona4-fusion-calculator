'use strict';

var listCtrl = function($scope) {
  
  $scope.$watch('gameChosen', function(){
    
      if($scope.gameChosen == 'p4'){
        
        $scope.personae = require('../data/DataP4').personae;
        
      };
      
      if($scope.gameChosen == 'p4g'){
        
        $scope.personae = require('../data/DataP4G').personae;
        
      };
      
      // if($scope.gameChosen == 'p5'){
      //   
      //   $scope.personae = require('../data/DataP5').personae;
      //   
      // };
  
    });
  
};

module.exports = listCtrl;