plugin.service('wgnConfigSettings', ['$q', 'wgnConfigInputs', function ($q, configInputs) {
	return function (title) {
		var srv = this;
		var _defaults = {
			title: title || 'My Plugin',
			icon: 'icon-puzzle',
			help: 'This is some instructional text describing what this plugin is and how to use it. Please customize it.',
			multi: false,
			copy: false,
			disableDelete:false,
			secure: false,
			secureEndpoint: '/settings',
			toggle: true,
			id: null
		};

		var _currentPage = false;
		var _currentForm = false;
		var _currentWorkspace = false;
		var _fieldIds = [];
		var _formInputs = [];
		var _workspaceInputs = [];
		var _fieldTypes = {};
		var _customTypes = [];
		var _highlightedFields = [];
		var _hooks = {};
		var _webhook = false;

		var _settings = angular.extend({}, _defaults);

		// Ensure pages is always an empty array.
		_settings.pages = [];

		/**
		 * Adds a new settings page.
		 *
		 * @param {string} name
		 */
		srv.page = function (name) {
			var id = slugify(name);

			// Ensure name and id are unique.
			angular.forEach(_settings.pages, function (p) {
				if (p.name === name) {
					throw new Error('Config: Page name must be unique!');
				}

				if (p.id === id) {
					// This id already exists but we can't throw an error since we are the ones who generated it so
					// find a suffix to make it unique.
					var counter = 0;

					do {
						++counter;
						id += counter.toString();
					} while (!isIdUnique(_settings.pages, id));
				}
			});

			_settings.pages.push({
				id: id,
				name: name,
				fields: []
			});

			// Track what the last page added was.
			_currentPage = _settings.pages.length - 1;
			// Since we're changing pages, reset the last form added.
			_currentForm = false;

			return srv;
		};

		/**
		 * Adds a new field.
		 *
		 * @param {Object} def The field definition.
		 */
		srv.field = function (def) {
			// Make sure we have a page, this will only be false if a field is added before a page.
			if (_currentPage === false) {
				throw new Error('Config: No page exists to add fields to');
			}

			var defaults = {
				required: true,
				highlightedLabel: null,
				help: ''
			};

			def = angular.extend({}, defaults, def);

			// Validate required properties.
			if (def.type !== 'markup') {
				['id', 'name', 'type'].forEach(function (p) {
					if (!(p in def) || !def[p]) {
						throw new Error('Config: Missing required field property: "' + p + '" for ' + def.id || def.name);
					}
				});

				// Make sure reserved ids aren't used.
				var reserved = ['name', 'enabled'];
				if (reserved.indexOf(def.id) !== -1) {
					throw new Error('Config: The id "' + def.id + '" is reserved for internal use and can\'t be assigned to inputs.');
				}
				if (def.id.indexOf('mch') === 0) {
					throw new Error('Config: The id prefix "mch" is reserved for internal use and can\'t be used for inputs.');
				}

				if (def.id.indexOf('_') !== -1) {
					throw new Error('Config: The id "' + def.id + '" can\'t be used because "_" is reserved for internal use.');
				}

				// Make sure id is unique.
				if (_fieldIds.indexOf(def.id) !== -1) {
					throw new Error('Config: Field id "' + def.id + '" is already in use');
				}

				if (def.type === 'secure' && !_settings.secure) {
					throw new Error('Config: Secure must be enabled to use the "secure" field type');
				}

			}

			// Make sure field type exists.
			if (!(def.type in _fieldTypes)) {
				throw new Error('Config: Inexistent field type: ' + def.type);
			}

			// Type cast a couple optional common properties.
			def.help = def.help.toString();
			def.required = !!def.required;

			// Validate field type specific options.
			var opts = _fieldTypes[def.type].options;

			// Try to auto-fill the belongsTo option if it's required but not set.
			if ('belongsTo' in opts && !('belongsTo' in def)) {
				if (def.type !== 'form' && _currentForm !== false) {
					// For non-form fields, belongsTo will require a forn.
					def.belongsTo = _formInputs[_currentForm];
				} else if (def.type === 'form' && _currentWorkspace !== false) {
					// For form fields, belongsTo is always a workspace.
					def.belongsTo = _workspaceInputs[_currentWorkspace];
				}
			}

			// Iterate over field type option definitions and validate the given field definition.
			angular.forEach(Object.keys(opts), function (k) {
				if (!(k in def) && 'default' in opts[k]) {
					def[k] = opts[k].default;
				}

				if ('required' in opts[k] && opts[k].required && !(k in def)) {
					throw new Error('Config: Required property "' + k + '" missing for "' + def.type + '" input with id "' + def.id + '"');
				}

				if ('validate' in opts[k]) {
					if (!opts[k].validate(def[k])) {
						throw new Error('Config: Validation failed for property "' + k + '" in field type "' + def.type + '"');
					}
				}

				// Exclusive defaults to true.
				if (k === 'exclusive' && !('exclusive' in def)) {
					def.exclusive = true;
				}
			});

			// Store the template so we can build it later.
			def.template = _fieldTypes[def.type].template;

			// If it's a form input, store its id so that we have something to validate "belongsTo" inputs against.
			if (def.type === 'form') {
				_formInputs.push(def.id);
				_currentForm = _formInputs.length - 1;
			} else if (def.type === 'workspace') {
				_workspaceInputs.push(def.id);
				_currentWorkspace = _workspaceInputs.length - 1;
			}

			// Finally if the field has the special "belongsTo" option, validate its target exists.
			if ('belongsTo' in def) {
				if (def.type === 'form') {
					if (_workspaceInputs.indexOf(def.belongsTo) === -1) {
						throw new Error('Config: Invalid "belongsTo" for field "' + def.id + '", no workspace field exists with id "' + def.belongsTo + '"');
					}
				} else if (def.type === 'field' || def.type === 'folder' || def.type === 'choice' || def.type === 'view' || _customTypes.indexOf(def.type) !== -1) {
					if (_formInputs.indexOf(def.belongsTo) === -1) {
						throw new Error('Config: Invalid "belongsTo" for field "' + def.id + '", no form field exists with id "' + def.belongsTo + '"');
					}
				} else {
					throw new Error('Config: Invalid "belongsTo" for field "' + def.id + '", the "' + def.type + '" field type doesn\'t support it.');
				}
			}

			if ('highlighted' in def && def.highlighted) {
				if (_highlightedFields.length >= 2) {
					throw new Error('Config: Only 2 fields maximum may be highlighted. Field "' + def.id + '" is not allowed.');
				}

				_highlightedFields.push({
					id: def.id,
					type: def.type,
					name: def.name
				});
			}

			if ('visible' in def && typeof def.visible !== 'function') {
				throw new Error('Config: "visible" property must be a function');
			}

			_settings.pages[_currentPage].fields.push(def);
			_fieldIds.push(def.id);

			return srv;
		};

		/**
		 * Registers a new field type.
		 * This is used so that implementations can define their own custom field types.
		 *
		 * @param {Object} data
		 */
		srv.fieldType = function (data) {
			if (!angular.isObject(data)) {
				throw new Error('Config: Object required as parameter when calling "fieldType()".');
			}

			var requiredFields = ['type', 'template'];
			angular.forEach(requiredFields, function (f) {
				if (!(f in data) || !data[f]) {
					throw new Error('Config: Missing "' + f + '" key in parameter object required when calling fieldType().');
				}
			});

			// Ensure field type doesn't already exit.
			if (data.type in _fieldTypes || _customTypes.indexOf(data.type) !== -1) {
				throw new Error('Config: Field types must be unique, trying to define "' + data.type + '" but it already exists.');
			}

			// Ensure options is an object.
			if ('options' in data && !angular.isObject(data.options)) {
				throw new Error('Config: Field options must be an object for field type "' + data.type + '"');
			}

			// Finally add the type.
			_fieldTypes[data.type] = {
				options: data.options || {},
				template: data.template
			};

			_customTypes.push(data.type);

			return srv;
		};

		/**
		 * Enable Webhook support form configurations.
		 *
		 * @param {wgnWebhook} A webhook service instance
		 * @param {Object} options Options to pass to the webhook service
		 */
		srv.webhook = function (webhook, options) {
			// Validate required options.
			if (Array.isArray(options)) {
				options.forEach(function (opts) {
					if (!('url' in opts)) {
						throw new Error('Config: Missing required param "url" in webhook options.');
					}

					if (!('form.id' in opts)) {
						throw new Error('Config: Missing required param "form.id" in webhook options.');
					}

					// Finally make sure the form.id acually exists.
					if (_formInputs.indexOf(opts['form.id']) === -1) {
						throw new Error('Config: Inexistent form id specified in param "form.id" in webhook options.');
					}
				});
			} else {
				if (!('url' in options)) {
					throw new Error('Config: Missing required param "url" in webhook options.');
				}

				if (!('form.id' in options)) {
					throw new Error('Config: Missing required param "form.id" in webhook options.');
				}

				// Finally make sure the form.id acually exists.
				if (_formInputs.indexOf(options['form.id']) === -1) {
					throw new Error('Config: Inexistent form id specified in param "form.id" in webhook options.');
				}
			}

			_webhook = {
				service: webhook,
				options: options
			};

			return srv;
		};

		/**
		 * Returns webhook configs if they exist.
		 *
		 * @returns {{webhook: wgnWebhook, options: Object} | false}
		 */
		srv.getWebhook = function () {
			return _webhook;
		};

		/**
		 * Registers a callback to run when a certain hook is fired.
		 *
		 * @param {string} event
		 * @param {function} cb
		 */
		srv.on = function (event, cb) {
			var allowedEvents = [
				'add',
				'edit',
				'delete',
				'enable',
				'disable',
				'discard',
				'init',
				'beforeSave',
				'save'
			];

			if (allowedEvents.indexOf(event) === -1) {
				throw new Error('Config: Invalid event name: ' + event);
			}

			if (!(event in _hooks)) {
				_hooks[event] = [];
			}

			_hooks[event].push(cb);
			return srv;
		};

		/**
		 * Invokes a hook by executing registered callbacks in sequence.
		 *
		 * @param {string} event
		 */
		srv.run = function (event, data) {
			if (event in _hooks) {
				return _hooks[event].reduce(function (promise, item, index) {
					return promise.then(function (result) {
						return $q.when(_hooks[event][index](result));
					});
				}, $q.when(data));
			}

			return $q.when(data);
		};

		/**
		 * Sets the settings page title.
		 *
		 * @param {string} title
		 */
		srv.title = function (title) {
			_settings.title = title.toString();
			return srv;
		};

		/**
		 * Sets the settings page intro help text.
		 *
		 * @param {string} help
		 */
		srv.help = function (help) {
			_settings.help = help.toString();
			return srv;
		};

		/**
		 * Sets the settings page icon.
		 * Strips the icon-prefix as that's added automatically.
		 *
		 * @param {string} icon
		 */
		srv.icon = function (icon) {
			_settings.icon = icon.toString().replace('icon-', '');
			return srv;
		};

		/**
		 * Sets whether to support multiple configurations.
		 *
		 * @param {boolean} multi
		 */
		srv.multi = function (multi) {
			_settings.multi = !!multi;
			return srv;
		};

		/**
		 * Sets whether to support copy configurations.
		 *
		 * @param {boolean} copy
		 */
		srv.copy = function (copy) {
			_settings.copy = !!copy && _settings.multi;
			return srv;
		};
		/**
		 * Sets whether to disable deleting configs
		 *
		 * @param {boolean} disableDelete
		 */
		srv.disableDelete = function (disableDelete) {
			_settings.disableDelete = !!disableDelete;
			return srv;
		};

		/**
		 * Sets whether to support secure settings.
		 *
		 * @param {boolean} secure
		 */
		srv.secure = function (secure) {

			// Multi must be enabled because of the way single configs are stored in firebase.
			// This can be changed if single is normalized to use the multi setting format.
			if (secure && !_settings.multi) {
				throw new Error('Config: Multi must be enabled to use secure!');
			}

			_settings.secure = !!secure;
			return srv;
		};

		/**
		 * Sets a custom secure endpoint
		 *
		 * @param {string} secureEndpoint
		 */
		srv.secureEndpoint = function(secureEndpoint) {
			_settings.secureEndpoint = secureEndpoint;
			return srv;
		};

		/**
		 * Sets whether to support enabling/disabling configurations.
		 *
		 * @param {boolean} toggle
		 */
		srv.toggle = function (toggle) {
			_settings.toggle = !!toggle;
			return srv;
		};

		/**
		 * Sets default view for multi configs.
		 *
		 * @param {'list' | 'grid' | string} display
		 */
		srv.display = function (display) {
			// allowing "unnecessary grouping operators" for readability
			/* jshint singleGroups: false */
			_settings.display = (display === 'grid' && 'grid') || (display === 'list' && 'list') || 'grid';
			return srv;
		};

		/**
		 * Returns highlighted inputs.
		 *
		 * @return {Array<Object>} An array of input objects.
		 */
		srv.getHighlighted = function () {
			return _highlightedFields;
		};


		/**
		 * Returns all field definitions.
		 *
		 * @return {Array<Object>} An array of objects.
		 */
		srv.getFields = function () {
			return _settings.pages.map(function (page) {
				return page.fields;
			}).reduce(function (acc, val) {
				return acc.concat(val);
			}, []);
		};


		/**
		 * Returns a field definition given an id.
		 *
		 * @param {string} id
		 *
		 * @return {Object|false}
		 */
		srv.getField = function (id) {
			var ret = false;

			for (var i = 0; i < _settings.pages.length; ++i) {
				/*jshint loopfunc:true */
				(function (i) {
					var field = _settings.pages[i].fields.filter(function (f) {
						return f.id === id;
					})[0];

					if (field) {
						ret = field;
					}
				}(i));
			}

			return ret;
		};

		/**
		 * Returns field definitions that belong to a certain form or workspace.
		 *
		 * @param {string} defId
		 *
		 * @return {Array<Object>}
		 */
		srv.getDependentFields = function (defId) {
			var fields = [];

			angular.forEach(_settings.pages, function (p) {
				angular.forEach(p.fields, function (f) {
					if ('belongsTo' in f && f.belongsTo === defId) {
						fields.push(f);
					}
				});
			});

			return fields;
		};

		/**
		 * Returns whether there are any form inputs in the defined config fields.
		 *
		 * @returns {boolean}
		 */
		srv.hasFormField = function () {
			return _formInputs.length > 0;
		};

		/**
		 * Returns whether there are any workspace inputs in the defined config fields.
		 *
		 * @returns {boolean}
		 */
		srv.hasWorkspaceField = function () {
			return _workspaceInputs.length > 0;
		};

		/**
		 * Returns a config settings object.
		 * This is the final product of this service.
		 *
		 * @return {Object}
		 */
		srv.getConfig = function () {
			return _settings;
		};

		/**
		 * Sets an id for the configuration instance
		 * Returns the service instance
		 *
		 * @param {string} id
		 * @return {object}
		 */
		srv.id = function (id) {
			_settings.id = slugify(id);
			return srv;
		};

		/**
		 * Transforms a string into a slug.
		 *
		 * @param {string} text
		 * @return {string}
		 *
		 * Based on https://gist.github.com/codeguy/6684588
		 */
		function slugify(text) {
			var slug = text.toString().trim()
				.replace(/(\-|\_)/g, '')        // remove hipens and underscores
				.replace(/^\s+|\s+$/g, '')		// remove spaces
				.replace(/&/g, '-and-')         // replace & with 'and'
				.replace(/[^\w\-]+/g, '');       // remove all non-word chars

			// remove accents, swap ñ for n, etc
			var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
			var to   = "aaaaeeeeiiiioooouuuunc------";
			for (var i=0, l=from.length ; i<l ; i++) {
				slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
			}

			return slug.charAt(0).toLowerCase() + slug.substr(1);
		}

		/**
		 * Checks whether an id hasn't been used before in a list of sources.
		 *
		 * @param {Array<string>} source
		 * @param {string} id
		 *
		 * @return {boolean}
		 */
		function isIdUnique(source, id) {
			var unique = true;

			angular.forEach(source, function (s) {
				if (s.id === id) {
					unique = false;
				}
			});

			return unique;
		}

		// Dog food our own bootstrapping of internal field types.
		angular.forEach(configInputs.all(), function (type) {
			srv.fieldType(type);
		});

		return srv;
	};
}]);
