# Angular Router Browserify

I'm enjoying working with Angular using Browserify, but couldn't find the angular-route module in a state where I could easily install it and use with with Angular, so I grabbed the source and quickly threw this together.

Hopefully one day the modules will be on npm officially and this won't be required, but until that's the case this acts as a nice stop gap. I'll try to publish new versions whenever the router gets updated.

## Current angular-router version: 1.2.15

## Usage

```
$ npm install --save angular-router-browserify
```

```js
var angular = require('angular');
require('angular-router-browserify')(angular)

// zomg this works now
var app = angular.module('myApp', ['ngRoute']);
```
