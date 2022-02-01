plugin.service('wgnConfigInputs', [function () {
	// This is just a centralized place to store the internal input type definitions and keep our main service cleaner.
	var srv = this;

	var workspaceInput = {
		type: 'workspace',
		template: 'wgn-config-input-workspace',
		options: {
			exclusive: {
				required: false
			},
			filter: {
				required: false
			},
			orderBy: {
				required: false,
				default: 'id'
			}
		}
	};

	var formInput = {
		type: 'form',
		template: 'wgn-config-input-form',
		options: {
			exclusive: {
				required: false
			},
			filter: {
				required: false
			},
			orderBy: {
				required: false,
				default: 'order'
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

	var viewInput = {
		type: 'view',
		options: {
			belongsTo: {
				required: true
			},
			exclusive: {
				required: false
			}
		},
		template: 'wgn-config-input-view'
	};

	var textInput = {
		type: 'text',
		options: {
			placeholder: {
				required: false
			},
			minlength: {
				required: false
			},
			maxlength: {
				required: false
			}
		},
		template: 'wgn-config-input-text'
	};

	var emailInput = {
		type: 'email',
		options: {
			placeholder: {
				required: false
			}
		},
		template: 'wgn-config-input-email'
	};

	var passwordInput = {
		type: 'password',
		options: {
			placeholder: {
				required: false
			},
			minlength: {
				required: false
			},
			maxlength: {
				required: false
			}
		},
		template: 'wgn-config-input-password'
	};

	var secureInput = {
		type: 'secure',
		options: {
			placeholder: {
				required: false
			}
		},
		template: 'wgn-config-input-secure'
	};

	var numberInput = {
		type: 'number',
		options: {
			placeholder: {
				required: false
			},
			min: {
				required: false
			},
			max: {
				required: false
			},
			step: {
				required: false
			}
		},
		template: 'wgn-config-input-number'
	};

	var checkboxInput = {
		type: 'checkbox',
		template: 'wgn-config-input-checkbox'
	};

	var radioInput = {
		type: 'radio',
		template: 'wgn-config-input-radio'
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
					return ['select', 'multi-select', 'score'].indexOf(m) !== -1;
				}
			},
			restrict: {
				required: false,
				validate: function (r) {
					return checkAllowedItems(r, ['radio', 'checkbox', 'dropdown', 'folder']);
				}
			},
			exclusive: {
				required: false
			}
		},
		template: 'wgn-config-input-choice'
	};

	var dateInput = {
		type: 'date',
		options: {
			options: {
				validate: function(opts) {
					var valid = true;

					if (!opts) { return valid; }

					valid = valid && opts.format ?
						['MM/dd/yyyy', 'M/d/yyyy', 'yyyy', 'yy'].indexOf(opts.format) !== -1 :
						valid;

					valid = valid && opts.mode ?
						['day', 'month', 'year'].indexOf(opts.mode) !== -1 :
						valid;

					valid = valid && opts.showWeeks ? opts.showWeeks.toString() === 'true' ||
						opts.showWeeks.toString() === 'false' :
						valid;

					Object.keys(opts).forEach(function(option) {
						valid = valid && ['format', 'mode', 'showWeeks'].indexOf(option) !== -1;
					});

					return valid;
				}
			}
		},
		template: 'wgn-config-input-date'
	};

	/**
	 * Returns all internal input types.
	 *
	 * @return {Array<Object>}
	 */
	srv.all = function () {
		return [
			workspaceInput,
			emailInput,
			formInput,
			fieldInput,
			folderInput,
			viewInput,
			textInput,
			passwordInput,
			numberInput,
			textareaInput,
			dropdownInput,
			markupInput,
			choiceInput,
			checkboxInput,
			radioInput,
			dateInput,
			secureInput
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
