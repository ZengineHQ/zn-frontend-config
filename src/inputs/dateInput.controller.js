plugin.controller('wgnDateInputCtrl', ['$scope', function ($scope) {
	// UI Bootstrap Datepicker Popup directive https://angular-ui.github.io/bootstrap/

	/**
	 * Default options
	 */
	$scope.picker = {
		date: new Date(),
		format: 'M/d/yyyy',
		opened: false,
		settings: {
			datepickerMode: "'day'",
			minMode: 'day',
			showWeeks: 'true'
		}
	};

	/**
	 *  Add the provided settings to the default datepicker configuration.
	 */
	var init = function init() {
		var options = $scope.field.options;

		for (var opt in options) {

			if ($scope.picker.hasOwnProperty(opt)) {

				$scope.picker[opt] = options[opt];

			} else if ($scope.picker.settings.hasOwnProperty(opt)) {

				$scope.picker.settings[opt] = options[opt];

			}

			// datepickerMode and minMode need to be the same value
			if (opt === 'mode') {
				// datepickerMode needs to be a nested string; "'month'"
				$scope.picker.settings.datepickerMode = '"'.concat(options[opt], '"');
				$scope.picker.settings.minMode = options[opt];
			}

		}
	};

	/**
	 *  Return a formatted string of the currently selected date.
	 *
	 * @returns {string} Formatted string of the currently selected date
	 */
	$scope.picker._format = function _format() {
		var formats = {
			'M/d/yyyy': function() {
				return $scope.picker.date.toLocaleDateString('en-us', {
					month: 'numeric',
					day: 'numeric',
					year: 'numeric'
				});
			},
			'yyyy': function() {
				return $scope.picker.date.getFullYear();
			},
			'yy': function() {
				return ($scope.picker.date.getFullYear() + '').slice(2, 4);
			}
		};

		return formats[this.format]();
	};

	/**
	 * Open the picker.
	 */
	$scope.picker.open = function open($event) {
		this.opened = !this.opened;
	};

	/**
	 * Set the formatted date value on the model.
	 */
	$scope.setModel = function setModel($event) {
		$scope.editing.config[$scope.field.id] = $scope.picker._format();
	};

	init();
}]);
