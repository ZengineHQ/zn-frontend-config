plugin.controller('wgnDateInputCtrl', ['$scope', function ($scope) {
	// UI Bootstrap Datepicker Popup directive:
	// http://angular-ui.github.io/bootstrap/versioned-docs/0.12.1/#/datepicker

	/**
	 * Configuration - only used if custom options are provided
	 */
	$scope.picker = {
		date: null,
		format: 'MM/dd/yyyy',
		mode: 'day',
		opened: false,
		settings: {
			minMode: 'day',
			showWeeks: true
		}
	};

	/**
	 *  Add the provided settings to the default datepicker configuration.
	 * 	Verify that the settings align with any previously stored value.
	 */
	var configureOptions = function configureOptions() {
		var field = $scope.editing.config[$scope.field.id];
		var options = $scope.field.options;

		// implement the provided options
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
				// convert two digit year to full date

				$scope.picker.date = new Date();

				$scope.picker.date.setFullYear(
					$scope.picker.date
						.getFullYear()
						.toString()
						.slice(0, 2)
						.concat(field)
				);

			} else if (field.length === 4 && $scope.picker.format === 'yyyy') {
				// convert 4 digit year to full date

				$scope.picker.date = new Date();

				$scope.picker.date.setFullYear(field);

			} else if (field.length === $scope.picker.format.length) {
				// full date; 'MM/dd/yyyy' or 'M/d/yyyy'

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

	var init = function init() {
		if ($scope.field.options) { configureOptions(); }
	};

	/**
	 *  Return a formatted string of the currently selected date.
	 *
	 * @returns {string} Formatted string of the currently selected date
	 */
	$scope.picker._format = function _format() {
		var date = this.date;

		var formats = {
			'MM/dd/yyyy': function() {
				return date ? date.toLocaleDateString('en-us', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				}) :
				null;
			},
			'M/d/yyyy': function() {
				return date ? date.toLocaleDateString('en-us', {
					day: 'numeric',
					month: 'numeric',
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
	 * Toggle the picker
	 */
	$scope.picker.toggle = function toggle($event) {
		this.opened = !this.opened;
	};

	/**
	 * Set the formatted date value on the model.
	 */
	$scope.setModel = function setModel() {
		$scope.editing.config[$scope.field.id] = $scope.picker._format();
	};

	init();
}]);
