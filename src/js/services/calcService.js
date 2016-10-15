'use strict';


module.exports = function service() {

    // var data = require('../data/DataP4');
    var data;
       
    this.initialize = function ($scope){
      switch ($scope.gameChosen){
        case 'p4': 
          data = require('../data/DataP4');
          break;
        case 'p4g': 
          data = require('../data/DataP4G');
          break;
        case 'p5': 
          data = require('../data/DataP5');
          break;
        default:
            
      }
    };

    this.getPersonaByName = function ($scope, name){
      for(var i= 0; i < data.personae.length; i++)
      {
           if(data.personae[i].name == name){
             return data.personae[i]; 
           }
      }
    };

    this.getPersonaeByArcana = function (arcana){
      var personae = [];

      for(var i= 0; i < data.personae.length; i++)
      {
           if(data.personae[i].arcana == arcana)
    	       personae.push(data.personae[i]);
      }

      return personae;
    };

    this.setNoRecipe = function ($scope){
      $scope.recipes[0] = {'ingredients': []};
      $scope.recipes[0].ingredients.push({'name': ''});
    }

    this.getSpecialCombo = function($scope){

      for(var i=0; i < data.specialCombos.length; i++){
        if(data.specialCombos[i].result == $scope.wantedPersona.name){
          $scope.recipes[0] = {'ingredients': []};
          for(var j=0; j < data.specialCombos[i].sources.length; j++){
            $scope.recipes[0].ingredients.push(this.getPersonaByName($scope, data.specialCombos[i].sources[j]));
          }
        }
      }
    };

    this.getArcanasIngredientsSimpleFusion = function (arcana) {
      var arcanaRecipes = [];

      for(var i= 0; i < data.arcana2Combos.length; i++)
      {
        if(data.arcana2Combos[i].result == arcana){
          arcanaRecipes.push(data.arcana2Combos[i]);
        }
      }

      return arcanaRecipes;
    };

    this.getArcanasIngredientsTriangleFusion = function (arcana) {
      var arcanaRecipes = [];

      for(var i= 0; i < data.arcana3Combos.length; i++)
      {
        if(data.arcana3Combos[i].result == arcana){
          arcanaRecipes.push(data.arcana3Combos[i]);
        }
      }

      return arcanaRecipes;
    };

    this.closestPersonaFromCandidates = function (candidates){
      var result;
      result = candidates[0];

      for(var i= 1; i < candidates.length; i++){
        if(candidates[i].difference < result.difference)
          result = candidates[i];
      }

      return result.index;
    };

    this.closestPersonaUp = function (arcana, average){
      var candidates = [];
      var difference = 0;
    //  var nobody = true;
      var result;

      for(var i= 0; i < arcana.length; i++){
        difference = arcana[i].level - average;

        if(difference >= 0){
          candidates.push({'index': i, 'difference': difference});
     //     nobody = false;
        }
      }

      //if(!nobody)
        result = this.closestPersonaFromCandidates(candidates);
      //else
        //result = arcana.length - 1;

      return arcana[result];

    };

    this.closestPersonaDown = function (arcana, average, persona1, persona2){
      var candidates = [];
      var difference = 0;
    //  var nobody = true;
      var result;

      for(var i= 0; i < arcana.length; i++){
        difference = average - arcana[i].level;

        if(difference >= 0 && arcana[i].name != persona1 && arcana[i].name != persona2 && !arcana[i].special){
          candidates.push({'index': i, 'difference': difference});
    //      nobody = false;
        }
      }

    //   if(!nobody)
        result = this.closestPersonaFromCandidates(candidates);
    //  else
    //    result = 0;

      return arcana[result];
    };

    this.checkDuplicatesSimpleFusion = function (persona1, persona2, recipes){
      for(var i=0; i < recipes.length; i++){
        if(
            (persona1 == recipes[i].ingredients[0].name && persona2 == recipes[i].ingredients[1]).name ||
            (persona2 == recipes[i].ingredients[0].name && persona1 == recipes[i].ingredients[1].name)
          )
          return true;

      }

      return false;
    };

    this.simpleFusion = function ($scope, personae1, personae2, wantedPersonaArcana){
      var averageLevel = 0;
      var closestPersona;

      for(var i= 0; i < personae1.length; i++){
        for(var j= 0; j < personae2.length; j++){
          if(!this.checkDuplicatesSimpleFusion(personae1[i].name, personae2[j].name, $scope.recipes)){

            averageLevel = ((personae1[i].level + personae2[j].level) / 2) + 1;

            if(averageLevel < $scope.wantedPersona.level){
              closestPersona = this.closestPersonaUp(wantedPersonaArcana, averageLevel);

              if (closestPersona.name == $scope.wantedPersona.name)
                $scope.recipes.push({'ingredients': [personae1[i], personae2[j]] });
            }
          }
        }
      }
    };

    this.simpleFusionSameArcana = function ($scope, personae1, personae2, wantedPersonaArcana){
      var averageLevel = 0;
      var closestPersona;

      for(var i= 0; i < personae1.length; i++){
        if (personae1[i].name != $scope.wantedPersona.name){
          for(var j= 0; j < personae2.length; j++){
            if (personae2[j].name != $scope.wantedPersona.name && personae2[j].name != personae1[i].name){

              if(!this.checkDuplicatesSimpleFusion(personae1[i].name, personae2[j].name, $scope.recipes)){
                averageLevel = (personae1[i].level + personae2[j].level) / 2;

                  if(averageLevel > $scope.wantedPersona.level){
                    closestPersona = this.closestPersonaDown(wantedPersonaArcana, averageLevel, personae1[i].name, personae2[j].name);


                    if (closestPersona.name == $scope.wantedPersona.name)
                      $scope.recipes.push({'ingredients': [personae1[i], personae2[j]] });
                  }
              }
            }
          }
        }
      }
    };


    this.triangleAverage = function(persona1, persona2, persona3){

      return (Math.floor( (persona1.level + persona2.level + persona3.level) / 3 ) + 5);
    };

    this.retrieveParents = function ($scope, wantedPersonaArcana, recipes, highestLevelPersona){

      var personaeArcana1 = [];
      var personaeArcana2 = [];
      var closestPersona;
      var averageLevel;

      for(var k=0; k < recipes.length; k++){

        personaeArcana1 = this.getPersonaeByArcana(recipes[k].source[0]);
        personaeArcana2 = this.getPersonaeByArcana(recipes[k].source[1]);

        for(var i=0; i < personaeArcana1.length; i++){
          for(var j=0; j < personaeArcana2.length; j++){
            averageLevel = this.triangleAverage(highestLevelPersona, personaeArcana1[i], personaeArcana2[j]);
            if(averageLevel <= $scope.wantedPersona.level){
              if(personaeArcana1[i].level <= highestLevelPersona.level && personaeArcana2[j].level <= highestLevelPersona.level &&
                 personaeArcana1[i].name != personaeArcana2[j].name && personaeArcana1[i].name != highestLevelPersona.name  &&
                 personaeArcana2[j].name != highestLevelPersona.name
              ){
                closestPersona = this.closestPersonaUp(wantedPersonaArcana, averageLevel);

                if(closestPersona.name == $scope.wantedPersona.name){
                  $scope.recipes.push({'ingredients': [highestLevelPersona, personaeArcana1[i], personaeArcana2[j]]});
                }
              }
            }
          }
        }
      }
    };


    this.triangleFusion = function ($scope, arcana1, arcana2, wantedPersonaArcana){

      var recipesSubFusion = [];

      var personaeArcana1 = this.getPersonaeByArcana(arcana1);
      var personaeArcana2 = this.getPersonaeByArcana(arcana2);

      for(var i =0; i < personaeArcana1.length; i++){

          recipesSubFusion = this.getArcanasIngredientsSimpleFusion(arcana2);

          this.retrieveParents($scope, wantedPersonaArcana, recipesSubFusion, personaeArcana1[i]);
    //   }
      }


      for(var j =0; j < personaeArcana2.length; j++){

          recipesSubFusion = this.getArcanasIngredientsSimpleFusion(arcana1);

          this.retrieveParents($scope, wantedPersonaArcana, recipesSubFusion, personaeArcana2[j]);

    //    }
      }
    };

    this.resultsSimpleFusion = function ($scope, wantedPersonaArcana) {

      var recipes = this.getArcanasIngredientsSimpleFusion($scope.wantedPersona.arcana);
      
      for(var i= 0; i < recipes.length; i++)
        {
          var arcana1 = recipes[i].source[0];
          var arcana2 = recipes[i].source[1];

          var personaeArcana1 = this.getPersonaeByArcana(arcana1);
          var personaeArcana2 = this.getPersonaeByArcana(arcana2);

          if(arcana1 == arcana2){
            this.simpleFusionSameArcana($scope, personaeArcana1, personaeArcana2, wantedPersonaArcana);
          }else{
            this.simpleFusion($scope, personaeArcana1, personaeArcana2, wantedPersonaArcana);
          }
        }
      
      if($scope.gameChosen == 'p5'){
        if($scope.wantedPersona.name == 'Moloch'){
          $scope.recipes.splice(55,1);
        }

        if($scope.wantedPersona.name == 'Attis'){
          $scope.recipes.splice(39,1);
        }

        if($scope.wantedPersona.name == 'Baphomet'){
          $scope.recipes.splice(290,1);
        }
      } 
    };

    this.resultsTriangleFusion = function ($scope, wantedPersonaArcana){

      var recipes = this.getArcanasIngredientsTriangleFusion($scope.wantedPersona.arcana);

       for(var i= 0; i < recipes.length; i++)
       {
        var arcana1 = recipes[i].source[0];
        var arcana2 = recipes[i].source[1];

        this.triangleFusion($scope, arcana1, arcana2, wantedPersonaArcana);

      }
    };

};