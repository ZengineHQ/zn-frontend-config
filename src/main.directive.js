plugin.directive('wgnMultiConfig', [function () {
	return {
		scope: {
			options: '='
		},
		controller: 'wgnMultiConfigCtrl',
		templateUrl: 'wgn-multi-config',
		restrict: 'E',
		replace: true
	};
}]);
