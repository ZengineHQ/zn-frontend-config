plugin.directive('wgnValidatorConfigName', [function () {
	return {
		require: 'ngModel',
		restrict: 'A',
		link: function (scope, element, attrs, ctrl) {
			ctrl.$parsers.push(function (viewVal) {
				var ourId = scope.editing.config.$id || false;
				var valid = true;

				scope.configs.forEach(function (config) {
					if (config.configName === viewVal && config.$id !== ourId) {
						valid = false;
					}
				});

				if (valid) {
					ctrl.$setValidity('configName', true);
				} else {
					ctrl.$setValidity('configName', false);
				}

				return viewVal;
			});
		}
	};
}]);
