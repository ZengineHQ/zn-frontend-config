plugin.controller('wgnFieldInputCntrl', ['$scope', function ($scope) {

	function setFieldValues() {
		$scope.fieldValues = $scope.getFields($scope.field, $scope.specs);
	}

	var unWatch = $scope.$watch('formLoaded[editing.config[field.belongsTo]]', function (loaded) {

		$scope.loaded = loaded;

		if (loaded) {
			setFieldValues();
			unWatch();
		}
	});

	$scope.$watch('editing.config[field.belongsTo]', setFieldValues);
}]);
