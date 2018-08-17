plugin.service('wgnConfigInputs', [function () {
	// This is just a centralized place to store the internal input type definitions and keep our main service cleaner.
	var srv = this;

	var workspaceInput = {
		type: 'workspace',
		template: 'wgn-config-input-workspace',
		options: {
			exclusive: {
				required: false
			}
		}
	};

	var formInput = {
		type: 'form',
		template: 'wgn-config-input-form',
		options: {
			exclusive: {
				required: false
			}
		}
	};

	var fieldInput = {
		type: 'field',
		options: {
			belongsTo: {
				required: true
			},
			restrict: {
				required: false
			},
			exclusive: {
				required: false
			}
		},
		template: 'wgn-config-input-field'
	};

	var folderInput = {
		type: 'folder',
		options: {
			belongsTo: {
				required: true
			},
			exclusive: {
				required: false
			}
		},
		template: 'wgn-config-input-folder'
	};

	var textInput = {
		type: 'text',
		options: {
			placeholder: {
				required: false
			}
		},
		template: 'wgn-config-input-text'
	};

	var numberInput = {
		type: 'number',
		options: {
			placeholder: {
				required: false
			}
		},
		template: 'wgn-config-input-number'
	};

	var textareaInput = {
		type: 'textarea',
		template: 'wgn-config-input-textarea'
	};

	var dropdownInput = {
		type: 'dropdown',
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
		template: 'wgn-config-input-dropdown'
	};

	var markupInput = {
		type: 'markup',
		options: {
			value: {
				required: true
			}
		},
		template: 'wgn-config-input-markup'
	};

	var choiceInput = {
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
			},
			exclusive: {
				required: false
			}
		},
		template: 'wgn-config-input-choice'
	};

	/**
	 * Returns all internal input types.
	 *
	 * @return {Array<Object>}
	 */
	srv.all = function () {
		return [
			workspaceInput,
			formInput,
			fieldInput,
			folderInput,
			textInput,
			numberInput,
			textareaInput,
			dropdownInput,
			markupInput,
			choiceInput
		];
	};

	/**
	 * Checks whether an item is allowed in a list.
	 * This is only used to check for allowed input types.
	 *
	 * @param {string} target
	 * @param {Array<string>} allowed
	 *
	 * @return {boolean}
	 */
	function checkAllowedItems (target, allowed) {
		if (!target) {
			return true;
		}

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
