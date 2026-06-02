plugin.controller('wgnDynamicInputCntrl', [
	'$scope',
	'$rootScope',
	function ($scope, $rootScope) {


		// filter the form fields to grab only allowed field types
		$scope.getFilteredFields = function () {

			var supportedFieldTypes = ['radio', 'checkbox', 'dropdown', 'numeric', 'text-area', 'date-picker', 'text-input', 'state-select', 'country-select', 'year' ];

			// if any restrictions, remove from supported fields before filtering form fields
			supportedFieldTypes = $scope.field.restrict
				? $scope.field.restrict.split('|').filter(function(t) {
					return supportedFieldTypes.indexOf(t) !== -1;
				})
				: supportedFieldTypes;


			// filter form fields by supported field types
			$scope.filteredFields = $scope.form.fields.filter(function (field) {
				return supportedFieldTypes.indexOf(field.type) !== -1;
			});
		};

		// setting countries and states to scope
		$scope.countries = $rootScope.countries;
		$scope.states = $rootScope.states;

		// setting id for editing.config, the form id and db form field id
		$scope.fieldConfigId = $scope.field.id;
		var dbFieldId = $scope.editing.config[$scope.fieldConfigId];
		var formId = $scope.editing.config.formId;

		// load form and form fields
		$scope.form = $rootScope.workspace.forms.find(function (form) {return form.id === formId; });
		$scope.getFilteredFields();
		$scope.selectedField = $scope.form.fields.find(function (field) {return field.id === dbFieldId; });

		// watching the form id and updating form field options based on it
		$scope.$watch("editing.config.formId", function (data) {
			$scope.form = $rootScope.workspace.forms.find(function (form) {return form.id === data;});

			// get updated filtered fields
			$scope.getFilteredFields();

			// resetting field when form changes
			$scope.editing.config[$scope.fieldConfigId] = null;
		});

		// when the field changes, update the type and value
		$scope.onFieldChange = function (selectedField) {
			$scope.editing.config[$scope.fieldConfigId] = selectedField.id;

			// resetting field values when field changed
			if (selectedField.type === 'checkbox') {
				$scope.editing.config[$scope.fieldConfigId + 'Value'] = {};
			} else {
				$scope.editing.config[$scope.fieldConfigId + 'Value'] = null;
			}
		};

	}]);
