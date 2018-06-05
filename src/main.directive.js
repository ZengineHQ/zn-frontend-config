plugin.directive('wgnMultiConfig', [function () {
	return {
		scope: {
			settings: '='
		},
		controller: 'wgnMultiConfigCtrl',
		// controllerAs: 'multiConfigCtrl',
		templateUrl: 'wgn-multi-config',
		restrict: 'E',
		replace: true
	};
}]);
