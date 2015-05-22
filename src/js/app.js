'use strict';

var angular = require('angular');
require('angular-router-browserify')(angular);

var calcCtrl = require('./controllers/calcCtrl');
var listCtrl = require('./controllers/listCtrl');
var calcService = require('./services/calcService');

var myApp = angular.module('myApp', [
	'ngRoute',
]);

myApp.filter('startFrom', function() {
	return function(input, start) {
    	start = +start;
        return input.slice(start);
    };
});

myApp.service('calcService',calcService);

myApp.config(function ($routeProvider) {
	$routeProvider.
		when('/list',
		{
			templateUrl: 'views/list.html',
			controller: listCtrl
		}).		
	  	when('/persona/:persona_name',
      	{
			 templateUrl: 'views/calc.html',
			 controller: calcCtrl
		}).
		
		otherwise({
        	redirectTo: '/list'
      });
});
