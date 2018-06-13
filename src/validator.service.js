plugin.service('wgnMultiConfigValidator', [function () {
	var srv = this;

	/**
	 * Validates multi config settings.
	 *
	 * @param {Object} settings
	 */
	srv.validateSettings = function (settings) {
		// Check for required top level settings.
		var pluginKeys = Object.keys(settings);
		doValidateSettingsRequired(['title', 'pages'], pluginKeys, 'plugin');

		// Make sure we have at least one page.
		if (!Array.isArray(settings.pages) || !settings.pages.length) {
			throw new Error('Invalid multi config settings! At least one page must be defined.');
		}

		// Ensure no top level options exist other than the allowed ones.
		var allowedPluginKeys = ['title', 'icon', 'help', 'multi', 'toggle', 'pages'];
		doValidateSettingsAllowed(allowedPluginKeys, Object.keys(settings), 'page');

		// Check page level settings.
		var allowedPageKeys = ['id', 'name', 'fields'];
		var allowedFieldKeys = ['id', 'name', 'required', 'help', 'type', 'belongsTo', 'restrict', 'placeholder'];

		angular.forEach(settings.pages, function (page) {
			// Check for required page settings.
			var pageKeys = Object.keys(page);
			doValidateSettingsRequired(['fields'], pageKeys, 'page');

			if (settings.pages.length > 1) {
				doValidateSettingsRequired(['id', 'name'], pageKeys, 'page');
			}

			// Make sure we have at least one field.
			if (!Array.isArray(page.fields) || !page.fields) {
				throw new Error('Invalid multi config settings! At least one field must be defined for page ' + page.id);
			}

			// Ensure no options exist other than the allowed ones.
			doValidateSettingsAllowed(allowedPageKeys, pageKeys, 'page');

			// Check field level settings.
			var validFieldTypes = ['form', 'field', 'folder', 'text', 'number', 'textarea', 'select', 'markup'];
			angular.forEach(settings.pages.fields, function (field) {
				// Check for required field settings.
				var fieldKeys = Object.keys(field);
				doValidateSettingsRequired(['id', 'name', 'type'], fieldKeys, 'field');

				// Ensure no options exist other than the allowed ones.
				doValidateSettingsAllowed(allowedFieldKeys, fieldKeys, 'field');

				// Ensure only valid field types are used.
				if (validFieldTypes.indexOf(field.type) === -1) {
					throw new Error('Invalid multi config settings! Field type "' + field.type + '" doesn\'t exist.');
				}

				// Ensure required fields are present for certain special field types.
				switch (field.type) {
					case 'field':
					case 'folder':
						if (!('belongsTo' in field || !field.belongsTo) {
							throw new Error('Invalid multi config settings! Required key: "belongsTo" missing on field ' + field.id);
						}
						break;
				}
			});
		});

		// Finally, add some default settings we don't want to be empty.
		if (!settings.icon) {
			settings.icon = 'icon-puzzle';
		}
		if (!settings.help) {
			settings.help = 'This is some instructional text decribing what this plugin is and how to use it. Please customize it.';
		}
	}

	/**
	 * Validates required settings exist.
	 *
	 * @param {Array<string>} required The required keys.
	 * @param {Array<string>} keys The keys to check.
	 * @param {string} level The hierarchical level of the settings we're checking.
	 *
	 * @throws Error
	 */
	function doValidateSettingsRequired(required, keys, level) {
		angular.forEach(required, function (option) {
			if (keys.indexOf(option) === -1) {
				throw new Error('Invalid multi config settings! Missing: "' + option + '" for ' + level);
			}
		});
	}

	/**
	 * Validates only allowed settings exist.
	 *
	 * @param {Array<string>} allowed The allowed keys.
	 * @param {Array<string>} keys The keys to check.
	 * @param {string} level The hierarchical level of the settings we're checking.
	 *
	 * @throws Error
	 */
	function doValidateSettingsAllowed(allowed, keys, level) {
		angular.forEach(keys, function (key) {
			if (allowed.indexOf(key) === -1) {
				throw new Error('Invalid multi config settings! Option "' + key + '" not allowed for ' + level);
			}
		});
	}

	return srv;
}]);
