plugin.controller('wgnViewInputCntrl', ['$scope', function ($scope) {

	function setViewValues() {
		$scope.viewValues = $scope.getViews($scope.field, $scope.specs);
	}

	var unWatch = $scope.$watch('formLoaded[editing.config[field.belongsTo]]', function (loaded) {

		$scope.loaded = loaded;

		if (loaded) {
			setViewValues();
			unWatch();
		}
	});

	$scope.$watch('editing.config[field.belongsTo]', setViewValues);
}]);
