plugin.directive('wgnSecureInput', [function () {
	return {
		scope: true,
		restrict: 'E',
		require: 'ngModel',
		template: '<input type="text" class="form-control" name="{{ field.id }}" ng-model="value" ng-required="field.required" placeholder="{{placeholder}}">',
		link: function (scope, element, attrs, ngModelCtrl) {

			var saved = false;

			scope.value = null;

			scope.placeholder = scope.field.placeholder || null;

			// Render to Scope Variables
			ngModelCtrl.$render = function () {

				saved = !!ngModelCtrl.$viewValue;

				if (saved) {

					scope.placeholder = 'Saved';

					scope.field.required = false;

				}

				scope.value = null;

			};

			scope.$watch('value', function (value, previous) {

				if (!value) {
					return;
				}

				if (value !== previous) {
					ngModelCtrl.$setViewValue(value);
				}

			});

		}
	};
}]);
