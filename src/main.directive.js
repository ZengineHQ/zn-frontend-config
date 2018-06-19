plugin.directive('wgnConfig', [function () {
	return {
		scope: {
			options: '='
		},
		controller: 'wgnConfigCtrl',
		templateUrl: 'wgn-config',
		restrict: 'E',
		replace: true
	};
}]);
