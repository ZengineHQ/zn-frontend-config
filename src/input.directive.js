plugin.directive('wgnMultiConfigInput', [function () {
	return {
		scope: true,
		restrict: 'E',
		replace: true,
		template: '<div class="multi-config-input" ng-include="template"></div>',
		link: function ($scope, $el, $attrs) {
			$scope.field = $scope.$eval($attrs.definition);
			$scope.template = $scope.field.template;
		}
	};
}]);
