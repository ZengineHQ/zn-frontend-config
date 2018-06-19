plugin.service('wgnConfigValidator', [function () {
	var srv = this;

	/**
	 * Validates multi config settings.
	 *
	 * @param {Object} settings
	 *
	 * @throws Error
	 */
	srv.validateSettings = function (settings) {
		// Check for required top level settings.
		var pluginKeys = Object.keys(settings);
		doValidateSettingsRequired(['title', 'pages'], pluginKeys, 'plugin', 'top level');

		// Make sure we have at least one page.
		if (!Array.isArray(settings.pages) || !settings.pages.length) {
			throw new Error('Invalid multi config settings! At least one page must be defined.');
		}

		// Ensure no top level options exist other than the allowed ones.
		var allowedPluginKeys = ['title', 'icon', 'help', 'multi', 'toggle', 'pages'];
		doValidateSettingsAllowed(allowedPluginKeys, Object.keys(settings), 'plugin', 'top level');

		// Check page level settings.
		angular.forEach(settings.pages, function (page) {
			doValidatePage(page, settings);
		});

		// Finally, add some default settings we don't want to be empty.
		if (!settings.icon) {
			settings.icon = 'icon-puzzle';
		}
		if (!settings.help) {
			settings.help = 'This is some instructional text decribing what this plugin is and how to use it. Please customize it.';
		}
	};

	/**
	 * Validates page settings.
	 *
	 * @param {Object} page
	 * @param {Object} settings
	 *
	 * @throws Error
	 */
	function doValidatePage (page, settings) {
		var allowedPageKeys = ['id', 'name', 'fields'];

		// Check for required page settings.
		var pageKeys = Object.keys(page);
		doValidateSettingsRequired(['fields'], pageKeys, 'page', page.name);

		// An id and name are only really required if you have more than one page.
		if (settings.pages.length > 1) {
			doValidateSettingsRequired(['id', 'name'], pageKeys, 'page', page.name);
		}

		// Make sure we have at least one field.
		if (!Array.isArray(page.fields) || !page.fields) {
			throw new Error('Invalid multi config settings! At least one field must be defined for page ' + page.id);
		}

		// Ensure no options exist other than the allowed ones.
		doValidateSettingsAllowed(allowedPageKeys, pageKeys, 'page', page.name);

		// Check field level settings.
		angular.forEach(page.fields, function (field) {
			doValidateField(field);
		});
	}

	/**
	 * Validates field settings.
	 *
	 * @param {Object} field
	 *
	 * @throws Error
	 */
	function doValidateField (field) {
		/*jshint maxcomplexity:6 */
		var allowedFieldKeys = ['id', 'name', 'required', 'help', 'type', 'belongsTo', 'restrict', 'placeholder', 'highlight'];
		var validFieldTypes = ['form', 'field', 'folder', 'text', 'number', 'textarea', 'select', 'markup'];

		// Check for required field settings.
		var fieldKeys = Object.keys(field);
		doValidateSettingsRequired(['id', 'name', 'type'], fieldKeys, 'field', field.name);

		// Ensure no options exist other than the allowed ones.
		doValidateSettingsAllowed(allowedFieldKeys, fieldKeys, 'field', field.name);

		// Ensure only valid field types are used.
		if (validFieldTypes.indexOf(field.type) === -1) {
			throw new Error('Invalid multi config settings! Field type "' + field.type + '" doesn\'t exist.');
		}

		// Ensure required fields are present for certain special field types.
		if (field.type === 'field' || field.type === 'folder') {
			if (!('belongsTo' in field) || !field.belongsTo) {
				throw new Error('Invalid multi config settings! Required key: "belongsTo" missing on field ' + field.id);
			}
		}
	}

	/**
	 * Validates required settings exist.
	 *
	 * @param {Array<string>} required The required keys.
	 * @param {Array<string>} keys The keys to check.
	 * @param {string} level The hierarchical level of the settings we're checking.
	 * @param {string} context Some additional context to display in the error message
	 *
	 * @throws Error
	 */
	function doValidateSettingsRequired (required, keys, level, context) {
		angular.forEach(required, function (option) {
			if (keys.indexOf(option) === -1) {
				throw new Error('Invalid multi config settings! Missing: "' + option + '" for ' + level + ' "' + context + '"');
			}
		});
	}

	/**
	 * Validates only allowed settings exist.
	 *
	 * @param {Array<string>} allowed The allowed keys.
	 * @param {Array<string>} keys The keys to check.
	 * @param {string} level The hierarchical level of the settings we're checking.
	 * @param {string} context Some additional context to display in the error message.
	 *
	 * @throws Error
	 */
	function doValidateSettingsAllowed (allowed, keys, level, context) {
		angular.forEach(keys, function (key) {
			if (allowed.indexOf(key) === -1) {
				throw new Error('Invalid multi config settings! Option "' + key + '" not allowed for ' + level + ' "' + context + '"');
			}
		});
	}

	return srv;
}]);
