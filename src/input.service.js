plugin.service('wgnMultiConfigInputs', [function () {
	// This is just a centralized place to store the internal input type definitions and keep our main service cleaner.
	var srv = this;

	var _internalInputTypes = [
		{
			type: 'form',
			template: 'wgn-multi-config-input-form'
		},
		{
			type: 'field',
			options: {
				belongsTo: {
					required: true
				},
				restrict: {
					required: false,
					validate: function (r) {
						return checkAllowedItems(r, [
							'text-input',
							'date-picker',
							'text-area',
							'radio',
							'checkbox',
							'dropdown',
							'linked',
							'numeric',
							'file-upload',
							// @TODO add other types here as the need for them arises.
							// @TODO consider ditching this and just passing through to Zengine API.
						]);
					}
				}
			},
			template: 'wgn-multi-config-input-field'
		},
		{
			type: 'folder',
			options: {
				belongsTo: {
					required: true
				}
			},
			template: 'wgn-multi-config-input-folder'
		},
		{
			type: 'text',
			options: {
				placeholder: {
					required: false
				}
			},
			template: 'wgn-multi-config-input-text'
		},
		{
			type: 'number',
			options: {
				placeholder: {
					required: false
				}
			},
			template: 'wgn-multi-config-input-number'
		},
		{
			type: 'textarea',
			template: 'wgn-multi-config-input-textarea'
		},
		{
			type: 'select',
			options: {
				options: {
					required: true,
					validate: function (opts) {
						if (!Array.isArray(opts)) {
							return false;
						}

						var valid = true;

						angular.forEach(opts, function (o) {
							if (!angular.isObject(o)) {
								return false;
							}

							if (!('value' in o) || !('label' in o)) {
								return false;
							}
						});

						return valid;
					}
				}
			},
			template: 'wgn-multi-config-input-select'
		},
		{
			type: 'markup',
			options: {
				value: {
					required: true
				}
			},
			template: 'wgn-multi-config-input-markup'
		},
		{
			type: 'choice',
			options: {
				belongsTo: {
					required: true
				},
				mode: {
					required: true,
					validate: function (m) {
						return m === 'select' || m === 'score';
					}
				},
				restrict: {
					required: false,
					validate: function (r) {
						return checkAllowedItems(r, ['radio', 'checkbox', 'dropdown']);
					}
				}
			},
			template: 'wgn-multi-config-input-choice'
		}
	];

	/**
	 * Returns all internal input types.
	 *
	 * @return {Array<Object>}
	 */
	srv.all = function () {
		return _internalInputTypes;
	};

	/**
	 * Checks whether an item is allowed in a list.
	 * This is only used to check for allowed input types.
	 *
	 * @param {string} source
	 * @param {Array<string>} allowed
	 *
	 * @return {boolean}
	 */
	function checkAllowedItems (target, allowed) {
		// Allow concatenating multiple items with a pipe for consistency with znData.
		var items = target.split('|');
		var valid = true;

		angular.forEach(items, function (item) {
			if (allowed.indexOf(item) === -1) {
				valid = false;
			}
		});

		return valid;
	}

	return srv;
}]);
