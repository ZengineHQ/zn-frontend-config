plugin.controller('wgnFolderInputCntrl', ['$scope', function ($scope) {

	function setFolderValues() {
		$scope.folderValues = $scope.getFolders($scope.field, $scope.specs);
	}

	var unWatch = $scope.$watch('formLoaded[editing.config[field.belongsTo]]', function (loaded) {

		$scope.loaded = loaded;

		if (loaded) {
			setFolderValues();
			unWatch();
		}
	});

	$scope.$watch('editing.config[field.belongsTo]', setFolderValues);
}]);
