plugin.controller('wgnFormInputCntrl', ['$scope', function ($scope) {

	function setFormValues() {
		$scope.formValues = $scope.getForms($scope.field, $scope.editing.config[$scope.field.belongsTo]);
	}

	var unWatch = $scope.$watch('workspaceLoaded[editing.config[field.belongsTo]]', function (loaded) {

		$scope.loaded = loaded;

		if (loaded) {
			setFormValues();
			unWatch();
		}
	});

	$scope.$watch('editing.config[field.belongsTo]', setFormValues);
}]);
