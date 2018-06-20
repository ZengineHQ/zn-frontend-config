plugin.directive('wgnConfigInput', [function () {
	return {
		scope: true,
		restrict: 'E',
		replace: true,
		template: '<div class="config-input" ng-class="\'input-\' + field.type" ng-include="template"></div>',
		link: function ($scope, $el, $attrs) {
			$scope.field = $scope.$eval($attrs.definition);
			$scope.template = $scope.field.template;
		}
	};
}]);
