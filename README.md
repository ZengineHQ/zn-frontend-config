# zn-frontend-multi-config

> Helper controller and service for implementing multiple configurations

## Installation

```shell
npm install git+ssh://git@github.com/WizeHive/zn-frontend-multi-config --save
```

## Usage

```js
plugin.controller('wgnSettingsCtrl', ['$scope', '$controller', function ($scope, $controller) {
	
	// Initialize the super class and extend it.
	angular.extend(this, $controller('zpMultiSettingsCtrl', {$scope: $scope}));
	
	// Your controller now has access to special `$scope` properties and methods. 
}]);
```
