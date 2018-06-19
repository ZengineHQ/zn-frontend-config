plugin.directive('wgnMultiConfig', [function () {
	return {
		scope: {
			options: '='
		},
		controller: 'wgnMultiConfigCtrl',
		templateUrl: 'wgn-config',
		restrict: 'E',
		replace: true
	};
}]);
