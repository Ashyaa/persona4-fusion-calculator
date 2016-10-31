'use strict';


module.exports = function service() {

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

    this.getRareCombosByArcana = function (arcana) {
      var rareCombos = [];
      var index = 0;

      while(data.rareCombos[index].arcana != arcana){
        index ++;
      }

      return data.rareCombos[index].comboList;
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
        if(candidates[i].difference < result.difference){
          result = candidates[i];
        }
      }

      return result.index;
    };

    this.closestPersonaUp = function (arcana, average, persona1, persona2){
      var candidates = [];
      var difference = 0;
    //  var nobody = true;
      var result;

      for(var i= 0; i < arcana.length; i++){
        difference = arcana[i].level - average;

        if(difference >= 0 && !arcana[i].special && !arcana[i].rare && arcana[i].name != persona1 && arcana[i].name != persona2){
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
      var result;

      for(var i= 0; i < arcana.length; i++){
        difference = average - arcana[i].level;

        if(difference >= 0 && !arcana[i].special && !arcana[i].rare && arcana[i].name != persona1 && arcana[i].name != persona2){
          candidates.push({'index': i, 'difference': difference});
        }
      }

      result = this.closestPersonaFromCandidates(candidates);

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

    this.indexInArcana = function (wantedPersona, wantedPersonaArcana){
      var index = 0;

      while(wantedPersona.name != wantedPersonaArcana[index].name && index < wantedPersonaArcana.length){
        index++
      }

      return index;
    };

    this.rareFusion = function ($scope, wantedPersonaArcana){

      var wantedIndex = this.indexInArcana($scope.wantedPersona, wantedPersonaArcana);
      var rareComboList = this.getRareCombosByArcana($scope.wantedPersona.arcana);

      for(var i= 0; i < rareComboList.length; i++){
        var indexShift = (-1) * rareComboList[i].result;
        var gemPersona = this.getPersonaByName($scope, rareComboList[i].gem);
        var parentIndex = wantedIndex;
        var shift = (indexShift > 0) ? 1 : -1;

        while(indexShift != 0 && parentIndex >= 0 && parentIndex < wantedPersonaArcana.length){
          if( (parentIndex + shift) >= 0 && (parentIndex + shift) < wantedPersonaArcana.length){
            if(wantedPersonaArcana[parentIndex + shift].name != $scope.wantedPersona.name && !wantedPersonaArcana[parentIndex + shift].special && !wantedPersonaArcana[parentIndex + shift].rare){
              indexShift = indexShift - shift;
            }else if ( (Math.abs(indexShift) == 1) && !wantedPersonaArcana[parentIndex + shift].rare){
              //a skip in the last iterations creates a new recipe with the skipped persona if it's not rare
              $scope.recipes.push({'ingredients': [wantedPersonaArcana[parentIndex + shift], gemPersona] });
            }
          }
          parentIndex = parentIndex + shift;
        }

        if(parentIndex >= 0 && parentIndex < wantedPersonaArcana.length){
          $scope.recipes.push({'ingredients': [wantedPersonaArcana[parentIndex], gemPersona] });
        }
      }

    };

    this.simpleFusion = function ($scope, personae1, personae2, wantedPersonaArcana){
      var averageLevel = 0;
      var closestPersona;

      for(var i= 0; i < personae1.length; i++){
        if (personae1[i].name != $scope.wantedPersona.name && !personae1[i].rare){
          for(var j= 0; j < personae2.length; j++){
            if (personae2[j].name != $scope.wantedPersona.name && !personae2[j].rare){
              if(!this.checkDuplicatesSimpleFusion(personae1[i].name, personae2[j].name, $scope.recipes)){

                averageLevel = Math.floor(((personae1[i].level + personae2[j].level) / 2)) + 1;

                if(averageLevel <= $scope.wantedPersona.level){
                  closestPersona = this.closestPersonaUp(wantedPersonaArcana, averageLevel, personae1[i].name, personae2[j].name);

                  if (closestPersona.name == $scope.wantedPersona.name)
                    $scope.recipes.push({'ingredients': [personae1[i], personae2[j]] });
                }
              }
            }
          }
        }
      }
    };

    this.simpleFusionSameArcana = function ($scope, personae1, personae2, wantedPersonaArcana){
      var averageLevel = 0;
      var closestPersona;

      for(var i= 0; i < personae1.length; i++){
        if (personae1[i].name != $scope.wantedPersona.name && !personae1[i].rare){
          for(var j= i + 1; j < personae2.length; j++){
            if (personae2[j].name != $scope.wantedPersona.name && !personae2[j].rare){
              averageLevel = Math.floor(((personae1[i].level + personae2[j].level) / 2)) + 1;

              if(averageLevel >= $scope.wantedPersona.level){
                closestPersona = this.closestPersonaDown(wantedPersonaArcana, averageLevel, personae1[i].name, personae2[j].name);

                if (closestPersona.name == $scope.wantedPersona.name){
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
      
      //prevent false results induced by special simple fusions
      if($scope.gameChosen == 'p5'){
        // Barong + Rangda
        if($scope.wantedPersona.name == 'Moloch'){
          $scope.recipes.splice(55,1);
        }

        // Shiva + Parvati
        if($scope.wantedPersona.name == 'Attis'){
          $scope.recipes.splice(39,1);
        }

        // Nebiros + Belial
        if($scope.wantedPersona.name == 'Baphomet'){
          $scope.recipes.splice(290,1);
        }

        // Compute rare fusion recipes here
        this.rareFusion($scope, wantedPersonaArcana);

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