plugin.directive('wgnMultiConfigPage', [function () {
	return {
		scope: true,
		templateUrl: 'wgn-multi-config-page',
		restrict: 'E',
		replace: true,
		link: function ($scope, $el, $attrs) {
			$scope.specs = $scope.$eval($attrs.specs);
		}
	};
}]);
