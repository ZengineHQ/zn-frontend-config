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

			// getting all the other dynamic fields on the page
			var siblingFields = $scope.specs.fields.filter(function(f) {
				return f.type === 'dynamic' && f.belongsTo === $scope.field.belongsTo && f.id !== $scope.field.id;
			});

			// grabbing the field ids that have already been used
			var usedFieldIds = siblingFields.map(function(sibling) {
				return $scope.editing.config[sibling.id];
			}).filter(function(usedFieldId) {
				return usedFieldId !== undefined && usedFieldId !== null && usedFieldId !== $scope.field.id;
			});

			// filter form fields by supported field types and removing already used fields
			$scope.filteredFields = $scope.form.fields.filter(function (field) {
				return supportedFieldTypes.indexOf(field.type) !== -1 && usedFieldIds.indexOf(field.id) === -1;
			});

		};

		// setting countries and states to scope
		$scope.countries = $rootScope.countries;
		$scope.states = $rootScope.states;

		// setting id for editing.config, the form id and db form field id
		$scope.fieldConfigId = $scope.field.id;
		$scope.fieldValueConfigId = $scope.field.value;
		var dbFieldId = $scope.editing.config[$scope.fieldConfigId];
		var formId = $scope.editing.config[$scope.field.belongsTo];

		// load initial form and form fields if form selected
		if(formId) {
			$scope.form = $rootScope.workspace.forms.find(function (form) {return form.id === formId; });
			$scope.getFilteredFields();
			$scope.selectedField = $scope.form.fields.find(function (field) {return field.id === dbFieldId; });
		}

		// watching the form id and updating form field options based on it changing
		$scope.$watch("editing.config[field.belongsTo]", function (data, oldData) {

			$scope.form = $rootScope.workspace.forms.find(function (form) {return form.id === data;});

			// get updated filtered fields
			$scope.getFilteredFields();

			// resetting field when form changes
			if(data !== oldData) {
				$scope.editing.config[$scope.fieldConfigId] = null;

				if ($scope.selectedField.type === 'checkbox') {
					$scope.editing.config[$scope.fieldValueConfigId] = {};
				} else {
					$scope.editing.config[$scope.fieldValueConfigId] = null;
				}
			}
		});

		// watching all other dynamic fields to update dropdowns as they are added
		$scope.$watch(function() {
			return $scope.specs.fields
				.filter(function(f) {
					return f.type === 'dynamic' && f.belongsTo === $scope.field.belongsTo && f.id !== $scope.field.id;
				})
				.map(function(f) {
					return $scope.editing.config[f.id];
				})
				.join(',');
		}, function(newVal, oldVal) {
			if (newVal !== oldVal) {
				$scope.getFilteredFields();
			}
		});

		// watching all other dynamic fields for when they're removed, update field dropdowns for all other dynamic inputs
		$scope.$on('$destroy', function() {
			if($scope.editing.config && typeof $scope.editing.config === 'object') {
				$scope.editing.config[$scope.fieldConfigId] = null;
				$scope.editing.config[$scope.fieldValueConfigId] = null;
			}
		});


		// when the field changes, update the type and value
		$scope.onFieldChange = function (selectedField) {
			$scope.editing.config[$scope.fieldConfigId] = selectedField.id;

			// resetting field values when field changed
			if (selectedField.type === 'checkbox') {
				$scope.editing.config[$scope.fieldValueConfigId] = {};
			} else {
				$scope.editing.config[$scope.fieldValueConfigId] = null;
			}
		};

	}]);
