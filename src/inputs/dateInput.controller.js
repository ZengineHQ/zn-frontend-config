plugin.controller('wgnDateInputCtrl', ['$scope', function ($scope) {
	// UI Bootstrap Datepicker Popup directive https://angular-ui.github.io/bootstrap/

	/**
	 * Default options
	 */
	$scope.picker = {
		date: null,
		format: 'M/d/yyyy',
		mode: 'day',
		opened: false,
		settings: {
			minMode: 'day',
			showWeeks: 'true'
		}
	};

	/**
	 *  Add the provided settings to the default datepicker configuration.
	 * 	Verify that the settings align with any previously stored value.
	 */
	var init = function init() {
		var field = $scope.editing.config[$scope.field.id];
		var options = $scope.field.options;

		// merge the provided options with the default options
		for (var opt in options) {

			if (options.hasOwnProperty(opt)) {

				if ($scope.picker.hasOwnProperty(opt)) {

					$scope.picker[opt] = options[opt];

				} else if ($scope.picker.settings.hasOwnProperty(opt)) {

					$scope.picker.settings[opt] = options[opt];

				}

			}

		}

		$scope.picker.settings.minMode = $scope.picker.mode;

		if (field) {

			field = field.toString();

			if (field.length === 2 && $scope.picker.format === 'yy') {
				// two digit year

				$scope.picker.date = new Date();

				$scope.picker.date.setFullYear(
					$scope.picker.date
						.getFullYear()
						.toString()
						.slice(0, 2)
						.concat(field)
				);

			} else if (field.length === 4 && $scope.picker.format === 'yyyy') {
				// 4 digit year

				$scope.picker.date = new Date();

				$scope.picker.date.setFullYear(field);

			} else if (field.length <= 'mm/dd/yyyy'.length && $scope.picker.format === 'M/d/yyyy') {
				// full date

				$scope.picker.date = new Date(field);

			} else {

				throw new Error(
					'Config: '.concat(
						'Date picker options do not match the format of the stored value. ',
						"\n",
						'Clear the original value before modifying the options.'
					)
				);

			}

		}

	};

	/**
	 *  Return a formatted string of the currently selected date.
	 *
	 * @returns {string} Formatted string of the currently selected date
	 */
	$scope.picker._format = function _format() {
		var date = this.date;

		var formats = {
			'M/d/yyyy': function() {
				return date ?
					date.toLocaleDateString('en-us', {
						month: 'numeric',
						day: 'numeric',
						year: 'numeric'
					}) :
					null;
			},
			'yyyy': function() {
				return date ? date.getFullYear().toString() : null;
			},
			'yy': function() {
				return date ? date.getFullYear().toString().slice(2, 4) : null;
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
