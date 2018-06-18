plugin.directive('wgnMultiConfigInput', [function ($compile) {
	return {
		scope: true,
		restrict: 'E',
		replace: true,
		link: function ($scope, $el, $attrs) {
			$scope.field = $scope.$eval($attrs.definition);
			var tpl = '<' + $scope.field.template + '></' + $scope.field.template + '>';
			// $el.append($compile(tpl)($scope));
			$el.append('<h1>HELLO</h1>');
		}
	};
}]);
