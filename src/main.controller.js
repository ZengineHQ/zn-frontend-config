plugin.controller('wgnConfigCtrl', ['$scope', '$q', '$routeParams', 'znData', 'znModal', 'znMessage', 'wgnConfigSrv',
	function ($scope, $q, $routeParams, znData, znModal, znMessage, configService) {

		// No need to pollute the scope.
		var _workspaceId = $routeParams.workspace_id;
		var _workspaces = [];
		var _forms = {};
		var _fields = {};
		var _folders = {};
		var _views = {};
		var _originalConfig;
		var _webhook = false;

		/**
		 * Whether the plugin is loading or not, displays a throbber.
		 *
		 * @type {boolean}
		 */
		$scope.loading = true;


		/**
		 * Whether the workspace has loaded
		 *
		 * @type {Object<boolean>}
		 */
		$scope.workspaceLoaded = {};

		/**
		 * Whether the form has loaded
		 *
		 * @type {Object<boolean>}
		 */
		$scope.formLoaded = {};

		/**
		 * Whether the plugin is saving or not, displays a throbber.
		 *
		 * @type {boolean}
		 */
		$scope.saving = false;

		/**
		 * The current config being created/edited, or false if none.
		 *
		 * @type {Object<Object|boolean>}
		 */
		$scope.editing = {
			config: false,
			form: null
		};

		/**
		 * The current display mode, one of 'grid' or 'list'.
		 *
		 * @type {string}
		 */
		$scope.display = 'grid';

		// Init plugin.
		init().then(function () {
			$scope.loading = false;
		});

		/**
		 * Creates a new configuration.
		 */
		$scope.onNewConfig = function () {
			var promise = $scope.editing.config ? $scope.onDiscardChanges() : $q.when();

			return promise.then(function () {
				$scope.editing.config = {
					enabled: false
				};

				doRunHook('add', $scope.editing.config).finally(function () {
					doResetTab();
					$scope.editing.form.$setPristine();
				});
			});
		};

		/**
		 * Edits an existing configuration.
		 *
		 * @param {string} id The config id.
		 */
		$scope.onEditConfig = function (id) {
			var promise = $scope.editing.config ? $scope.onDiscardChanges() : $q.when();

			return promise.then(function () {
				$scope.editing.config = $scope.configs.filter(function (config) {
					return config.$id === id;
				})[0];

				doRunHook('edit', $scope.editing.config).finally(function () {
					doResetTab();
					$scope.editing.form.$setPristine();
				});
			});
		};

		/**
		 * Deletes an existing configuration.
		 */
		$scope.onDeleteConfig = function () {
			znModal({
				title: 'Are you sure?',
				template: '<p>Are you sure you want to delete the <strong>{{name}}</strong> configuration?</p><p>This action is irreversible.</p>',
				classes: '',
				scope: {
					name: $scope.editing.config.name
				},
				closeButton: false,
				btns: {
					'No': {
						primary: true
					},
					'Yes': {
						danger: true,
						action: function () {
							$scope.saving = true;
							return configService.deleteConfig(_workspaceId, $scope.editing.config, $scope.configs).then(function () {
								return doRunHook('delete', shallowCopy($scope.editing.config)).finally(function () {
									return _webhook
										? Array.isArray(_webhook.options)
											? $q.all(_webhook.options.map(function (opts, i) {
												return _webhook.service.delete($scope.editing.config['webhook' + i + 'Id']);
											}))
											: _webhook.service.delete($scope.editing.config.webhookId)
										: $q.when();
								}).then(function () {
									doDiscardChanges();
									znMessage('The configuration has been deleted!', 'info');
									$scope.saving = false;
								});
							}).catch(function (err) {
								znMessage(err, 'error');
							});
						}
					}
				}
			});
		};

		/**
		 * Saves the current configuration.
		 */
		$scope.onSaveConfig = function () {
			$scope.saving = true;

			// Single configs don't ever get to see the grid/list views.
			if ($scope.settings.multi) {
				doProcessHighlighted();
			}

			removeHiddenValues();

			var secureValues;

			if ($scope.settings.secure) {
				secureValues = getSecureValues();
			}

			blankSecureValues();

			return doRunHook('beforeSave', $scope.editing.config).finally(function () {
				return doSaveConfig($scope.editing.config).then(function () {
					if ($scope.settings.toggle && !$scope.editing.config.enabled && !('$id' in $scope.editing.config)) {
						znModal({
							title: '',
							template: '<p>Your new configuration was saved!</p><p>It must be manually enabled to be active.</p>',
							classes: 'config-enable-message',
							closeButton: false,
							btns: {
								'OK': {
									primary: true
								}
							}
						});
					}
				})
				.then(function() {

					if (secureValues) {
						return doSaveSecure(secureValues);
					}

				})
				.then(function() {
					return doRunHook('save', $scope.editing.config).finally(function () {

						if ($scope.settings.multi) {
							doDiscardChanges();
						} else {
							doResetTab();
							$scope.editing.form.$setPristine();
						}

						znMessage('Configuration saved!', 'saved');
						$scope.saving = false;
					});
				});
			});
		};

		/**
		 * Disables the current configuration.
		 */
		$scope.onDisableConfig = function () {
			$scope.saving = true;
			$scope.editing.config.enabled = false;
			var stateChange = true;

			return doRunHook('disable', $scope.editing.config).finally(function () {
				return doSaveConfig($scope.editing.config, stateChange).then(function () {
					return _webhook
						? Array.isArray(_webhook.options)
							? $q.all(_webhook.options.map(function (opts, i) {
								return _webhook.service.disable($scope.editing.config['webhook' + i + 'Id']);
							}))
							: _webhook.service.disable($scope.editing.config.webhookId)
						: $q.when();
				});
			}).catch(function () {
				$scope.editing.config.enabled = true;
				znMessage('There was an error disabling the configuration!', 'error');
			}).then(function () {
				znMessage('Configuration disabled!', 'saved');
			}).finally(function () {
				$scope.saving = false;
			});
		};

		/**
		 * Enables the current configuration.
		 */
		$scope.onEnableConfig = function () {
			$scope.saving = true;
			$scope.editing.config.enabled = true;
			var stateChange = true;

			return doRunHook('enable', $scope.editing.config).finally(function () {
				return doSaveConfig($scope.editing.config, stateChange).then(function () {
					return _webhook
						? Array.isArray(_webhook.options)
							? $q.all(_webhook.options.map(function (opts, i) {
								return _webhook.service.enable($scope.editing.config['webhook' + i + 'Id']);
							}))
							: _webhook.service.enable($scope.editing.config.webhookId)
						: $q.when();
				});
			}).catch(function () {
				$scope.editing.config.enabled = false;
				znMessage('There was an error enabling the configuration!', 'error');
			}).then(function () {
				znMessage('Configuration enabled!', 'saved');
			}).finally(function () {
				$scope.saving = false;
			});
		};

		/**
		 * Triggered by discarding configuration changes, prompts for confirmation.
		 *
		 * @return {Promise}
		 */
		$scope.onDiscardChanges = function () {
			var def = $q.defer();

			// Only prompt if form has been changed.
			if (!$scope.editing.form.$dirty) {
				doDiscardChanges();
				return $q.when(true);
			}

			znModal({
				title: 'Are you sure?',
				template: '<p>Are you sure you want to discard the current configuration changes?</p>',
				classes: '',
				closeButton: false,
				btns: {
					'No': {
						primary: true,
						action: function () {
							def.reject();
						}
					},
					'Yes': {
						danger: true,
						action: function () {
							doRunHook('discard', $scope.editing.config).finally(function () {
								doDiscardChanges();
								def.resolve();
							});
						}
					}
				}
			});

			return def.promise;
		};

		/**
		 * Switches to the given page (tab).
		 *
		 * @param {string} id
		 */
		$scope.onSelectPage = function (id) {
			$scope.view = id;
		};

		/**
		 * Loads forms for the selected workspace.
		 *
		 * @param {string} defId The field definition id.
		 */
		$scope.onSelectWorkspace = function (defId) {
			var wsid = $scope.editing.config[defId];

			if (wsid && (!(wsid in _forms) || !_forms[wsid].length)) {
				loadForms(wsid);
			}
		};

		/**
		 * Initializes a workspace input.
		 *
		 * @param {string} defId The field definition id.
		 */
		$scope.initWorkspaceInput = function (defId) {
			if ($scope.loading) {
				$scope.options.on('init', function () {
					$scope.onSelectWorkspace(defId);
				});
			} else {
				$scope.onSelectWorkspace(defId);
			}
		};

		/**
		 * Loads all workspaces for a given input.
		 *
		 * @param {Object} fieldDef The workspace input definition.
		 *
		 * @return {Array<Object>}
		 */
		$scope.getWorkspaces = function (def) {
			if (!$scope.editing.config) {
				return _workspaces;
			}

			var filterWorkspaces = [];
			angular.forEach($scope.settings.pages, function (page) {
				angular.forEach(page.fields, function (f) {
					// Split into two if statements for legibility.
					if (f.type === 'workspace' && f.id !== def.id && f.exclusive) {
						if (f.id in $scope.editing.config && $scope.editing.config[f.id]) {
							filterWorkspaces.push($scope.editing.config[f.id]);
						}
					}
				});
			});

			// Filter values used in other inputs.
			return _workspaces.filter(function (f) {
				return filterWorkspaces.indexOf(f.id) === -1;
			});
		};

		/**
		 * Loads all forms for a given input.
		 * If a type is passed, it hides forms set for other form inputs in the list.
		 *
		 * @param {Object} def The form input definition.
		 *
		 * @return {Array<Object>}
		 */
		$scope.getForms = function (def, workspaceId) {
			// Allow overidding workspaceId but default to current one.
			workspaceId = workspaceId || _workspaceId;

			// Sanity when dealing with forms belonging to a workspace.
			if (!(workspaceId in _forms)) {
				return [];
			}

			if (!$scope.editing.config) {
				return _forms[workspaceId];
			}

			var filterForms = [];
			angular.forEach($scope.settings.pages, function (page) {
				angular.forEach(page.fields, function (f) {
					// Split into two if statements for legibility.
					if (f.type === 'form' && f.id !== def.id && f.exclusive) {
						if (f.id in $scope.editing.config && $scope.editing.config[f.id]) {
							filterForms.push($scope.editing.config[f.id]);
						}
					}
				});
			});

			// Filter values used in other inputs.
			return _forms[workspaceId] ? _forms[workspaceId].filter(function (f) {
				return filterForms.indexOf(f.id) === -1;
			}) : [];
		};

		/**
		 * Loads all fields for a given form.
		 *
		 * @param {Object} fieldDef The field input definition.
		 * @param {Object} formDef The form this input belongs to.
		 *
		 * @return {Array<Object>}
		 */
		$scope.getFields = function (fieldDef, formDef) {
			// Filter by restrict key if available.
			return getFiltered(fieldDef, formDef, _fields).filter(function (f) {
				if (!('restrict' in fieldDef) || !fieldDef.restrict) {
					return true;
				}

				var r = fieldDef.restrict.split('|');
				return r.indexOf(f.type) !== -1;
			});
		};

		/**
		 * Loads all folders for a given form.
		 *
		 * @param {Object} fieldDef The folder input definition.
		 * @param {Object} formDef The form this input belongs to.
		 *
		 * @return {Array<Object>}
		 */
		$scope.getFolders = function (fieldDef, formDef) {
			return getFiltered(fieldDef, formDef, _folders);
		};

		/**
		 * Loads all views for a given form.
		 *
		 * @param {Object} fieldDef The folder input definition.
		 * @param {Object} formDef The form this input belongs to.
		 *
		 * @return {Array<Object>}
		 */
		$scope.getViews = function (fieldDef, formDef) {
			return getFiltered(fieldDef, formDef, _views);
		};

		/**
		 * Loads all choices for a given field.
		 * This applies to checkbox, dropdown and radio fields.
		 *
		 * @param {Object} fieldDef The choice input definition.
		 *
		 * @return {Object}
		 */
		$scope.getChoices = function (fieldDef) {
			var fieldId = $scope.editing.config[fieldDef.id + '_source'];

			if (fieldId) {
				var formId = $scope.editing.config[fieldDef.belongsTo];

				if (formId && _fields[formId]) {
					var field = _fields[formId].filter(function (f) {
						return f.id === fieldId;
					})[0];

					if (field && 'choices' in field) {
						return field.choices;
					}
				}
			}
		};

		/**
		 * Reset choice values when source field changes
		 *
		 * @param {fieldId} fieldDef The choice input id
		 *
		 */
		$scope.resetChoiceValues = function (fieldId) {
			delete $scope.editing.config[fieldId + '_val'];

			angular.forEach($scope.editing.config, function (value, key) {
				if (key.indexOf(fieldId + '_opt_') === 0) {
					delete $scope.editing.config[key];
				}
			});
		};

		/**
		 * Saves after a configuration toggle.
		 *
		 * @param {Object} config
		 */
		$scope.onConfigToggle = function (config) {
			var stateChange = true;

			if (config.enabled) {
				doRunHook('enable', config).finally(function () {
					return doSaveConfig(config, stateChange).then(function () {
						znMessage('Configuration ' + config.name + ' enabled!', 'saved');
						return _webhook
							? Array.isArray(_webhook.options)
								? $q.all(_webhook.options.map(function (opts, i) {
									return _webhook.service.enable(config['webhook' + i + 'Id']);
								}))
								: _webhook.service.enable(config.webhookId)
							: $q.when();
					});
				});
			} else {
				doRunHook('disable', config).finally(function () {
					return doSaveConfig(config, stateChange).then(function () {
						znMessage('Configuration ' + config.name + ' disabled!', 'saved');
						return _webhook
							? Array.isArray(_webhook.options)
								? $q.all(_webhook.options.map(function (opts, i) {
									return _webhook.service.disable(config['webhook' + i + 'Id']);
								}))
								: _webhook.service.disable(config.webhookId)
							: $q.when();
					});
				});
			}
		};

		/**
		 * Helper to return a list of filtered items from a given source.
		 * Used to return fields and folders for a given form.
		 *
		 * @param {Object} fieldDef The folder input definition.
		 * @param {Object|false} formDef The form this input belongs to in order to filter values used in other fields or false to return them all.
		 * @param {Object} source The source data.
		 *
		 * @return {Array<Object>}
		 */
		function getFiltered (fieldDef, formDef, source) {
			if (!fieldDef.belongsTo) {
				return [];
			}

			if (!Object.keys(source).length) {
				return [];
			}

			var filters = [];

			// Filter values used in other inputs of the same type.
			if (formDef) {
				angular.forEach(formDef.fields, function (f) {
					// Split into multiple if statements for legibility.
					if (f.type === fieldDef.type && f.id !== fieldDef.id) {
						if (f.exclusive && $scope.editing.config) {
							if (f.type === 'choice' && f.id + '_source' in $scope.editing.config && $scope.editing.config[f.id + '_source']) {
								filters.push($scope.editing.config[f.id + '_source']);
							} else if (f.id in $scope.editing.config && $scope.editing.config[f.id]) {
								filters.push($scope.editing.config[f.id]);
							}
						}
					}
				});
			}

			var formId = $scope.editing.config[fieldDef.belongsTo];

			return formId in source ? source[formId].filter(function (f) {
				return filters.indexOf(f.id) === -1;
			}) : [];
		}

		/**
		 * Centralize discarding config changes to avoid duplicating logic.
		 */
		function doDiscardChanges () {
			doResetTab();

			if ($scope.settings.multi) {
				$scope.editing.config = false;
			} else {
				angular.extend($scope.editing.config, _originalConfig);
			}

			$scope.editing.form.$setPristine();
		}

		/**
		 * Switches to the first tab.
		 */
		function doResetTab () {
			if ($scope.settings.pages.length) {
				$scope.view = $scope.settings.pages[0].id;
			}
		}

		/**
		 * Loads data on all available workspaces.
		 */
		function loadWorkspaces () {
			return znData('Workspaces').get({ limit: 200 }).then(function (workspaces) {
				_workspaces = workspaces.slice();
			}).catch(function (err) {
				znMessage(err, 'error');
			});
		}

		/**
		 * Loads form data for the given workspace.
		 *
		 * @param {number} workspaceId
		 */
		function loadForms (workspaceId) {

			return znData('Forms').get({ 'workspace.id': workspaceId, 'limit': 200, 'related': 'fields,folders,dataViews' }).then(function (forms) {
				_forms[workspaceId] = forms;
				forms.forEach(function (form) {
					_fields[form.id] = [];

					angular.forEach(form.fields, function (field) {
						var f = {
							id: field.id,
							name: field.name,
							label: field.label,
							type: field.type
						};

						if ('settings' in field && 'properties' in field.settings && 'choices' in field.settings.properties) {
							f.choices = field.settings.properties.choices;
						}

						_fields[form.id].push(f);
					});

					_folders[form.id] = [];

					angular.forEach(form.folders, function (folder) {
						_folders[form.id].push({
							id: folder.id,
							name: folder.name
						});
					});

					_views[form.id] = [];

					angular.forEach(form.dataViews, function (view) {
						_views[form.id].push({
							id: view.id,
							name: view.name
						});
					});

					$scope.formLoaded[form.id] = true;
				});
			}).catch(function (err) {
				znMessage(err, 'error');
			}).finally(function () {
				$scope.workspaceLoaded[workspaceId] = true;
			});
		}

		/**
		 * Processes fields and remove hidden values from the config object.
		 */
		function removeHiddenValues () {

			var fieldDefs = $scope.options.getFields();

			angular.forEach(fieldDefs, function (fieldDef) {

				var hidden = fieldDef.visible && !fieldDef.visible($scope.editing.config, fieldDef);

				// Remove hidden values from config
				if (hidden) {

					angular.forEach($scope.editing.config, function (value, key) {
						if (key.indexOf(fieldDef.id + '_') === 0 ||
							key === fieldDef.id) {
							delete $scope.editing.config[key];
						}
					});

				}

			});

		}

		/**
		 * Processes fields and remove secure values from the config object.
		 */
		function blankSecureValues () {

			var fieldDefs = $scope.options.getFields();

			angular.forEach(fieldDefs, function (fieldDef) {

				// Blank secure values from config
				if (fieldDef.type === 'secure') {

					angular.forEach($scope.editing.config, function (value, key) {
						if (key === fieldDef.id) {

							// Store non-empty values as true so we know it was saved
							if (value !== '') {
								$scope.editing.config[key] = true;
							}
							else {
								delete $scope.editing.config[key];
							}

						}
					});

				}

			});

		}

		function getSecureValues () {

			var fieldDefs = $scope.options.getFields();

			var secure = {};

			angular.forEach(fieldDefs, function (fieldDef) {

				// Get secure values from config
				if (fieldDef.type === 'secure') {

					angular.forEach($scope.editing.config, function (value, key) {
						if (key === fieldDef.id && value !== true) {
							secure[key] = $scope.editing.config[key];
						}
					});

				}

			});

			return !angular.equals(secure, {}) ? secure : null;

		}

		/**
		 * Processes highlighted fields and adds additional keys to the config object.
		 */
		function doProcessHighlighted () {
			// Find highlighted fields.
			var highlighted = $scope.options.getHighlighted();
			var formatedHighligts = [];

			// Extract info from each one and save it for display.
			angular.forEach(highlighted, function (input) {
				var inputTypeFormatted = input.type.charAt(0).toUpperCase() + input.type.substr(1);

				switch (input.type) {
					case 'workspace':
						var workspace = $scope.getWorkspaces(input).filter(function (w) {
							return w.id === $scope.editing.config[input.id];
						})[0];

						if (workspace) {
							formatedHighligts.push({
								type: inputTypeFormatted,
								value: workspace.name
							});
						}
						break;

					case 'form':
						var form = $scope.getForms(input).filter(function (f) {
							return f.id === $scope.editing.config[input.id];
						})[0];

						if (form) {
							formatedHighligts.push({
								type: inputTypeFormatted,
								value: form.name
							});
						}
						break;

					case 'checkbox':
						var checkDef = $scope.options.getField(input.id);
						if ($scope.editing.config[input.id]) {
							formatedHighligts.push({
								type: checkDef.highlightedLabel || checkDef.name,
								value: "Yes"
							});
						}
						break;

					case 'radio':
						var radioDef = $scope.options.getField(input.id);
						if ($scope.editing.config[input.id]) {
							formatedHighligts.push({
								type: radioDef.highlightedLabel || radioDef.name,
								value: $scope.editing.config[input.id]
							});
						}
						break;

					case 'field':
					case 'choice':
						var fieldDef = $scope.options.getField(input.id);
						var field = $scope.getFields(fieldDef, false).filter(function (f) {
							var configKey = input.type === 'choice' ? input.id + '_source' : input.id;
							return f.id === $scope.editing.config[configKey];
						})[0];

						if (field) {
							formatedHighligts.push({
								type: inputTypeFormatted,
								value: field.name
							});
						}
						break;

					case 'folder':
						var folderDef = $scope.options.getField(input.id);
						var folder = $scope.getFolders(folderDef, false).filter(function (f) {
							return f.id === $scope.editing.config[input.id];
						})[0];

						if (folder) {
							formatedHighligts.push({
								type: inputTypeFormatted,
								value: folder.name
							});
						}
						break;

					case 'view':
						var viewDef = $scope.options.getField(input.id);
						var view = $scope.getViews(viewDef, false).filter(function (f) {
							return f.id === $scope.editing.config[input.id];
						})[0];

						if (view) {
							formatedHighligts.push({
								type: inputTypeFormatted,
								value: view.name
							});
						}
						break;

					default:
						// @TODO Reconsider whether we want to allow all inputs here.
						var val = $scope.editing.config[input.id].toString();
						if (val.length > 22) {
							val = val.substr(0, 22) + '...';
						}

						formatedHighligts.push({
							type: inputTypeFormatted,
							value: val
						});
				}
			});

			if ($scope.editing.config.mch1) {
				delete $scope.editing.config.mch1;
			}

			if ($scope.editing.config.mch2) {
				delete $scope.editing.config.mch2;
			}

			angular.forEach(formatedHighligts, function (h, i) {
				$scope.editing.config['mch' + (i + 1)] = h;
			});
		}

		/**
		 * Actually saves changes to Firebase.
		 *
		 * @param {Object} config A config object.
		 *
		 * @return {Promise}
		 */
		function doSaveConfig (config, stateChange) {
			var promise = $q.when(config);
			var multiWebhooks = _webhook && Array.isArray(_webhook.options);

			if (_webhook && !stateChange) {
				var options = multiWebhooks
					? _webhook.options.map(function (opts) {
						return Object.assign({}, opts);
					})
					: Object.assign({}, _webhook.options);

				var webhookStatus = $scope.editing.config.enabled;
				var hasWebhookStatus = false;

				if ('webhookId' in config || 'webhook0Id' in config) {
					hasWebhookStatus = true;
					_webhook.service.delete(config.webhookId);
				}

				if (multiWebhooks) {
					promise = $q.all(options.map(function (opts) {
						if (!(opts['form.id'] in config)) {
							throw new Error('Config: Invalid form.id for webhook');
						}

						opts['form.id'] = config[opts['form.id']];

						// if there was already a webhook in the settings, keep the status
						if (hasWebhookStatus) {
							opts['isActive'] = webhookStatus;
						}

						if (opts.filter) {
							opts.filter = reconstructFilter(opts.filter, config);
						}

						return _webhook.service.create(opts);
					}))
						.then(function (webhooks) {
							return webhooks.reduce(function (cfg, wh, i) {
								cfg['webhook' + i + 'Id'] = wh.id;
								cfg['webhook' + i + 'Key'] = wh.secretKey;
								return cfg;
							}, config);
						})
						.catch(function (err) {
							znMessage('There was an error creating the webhook.', 'error');
							return config;
						});
				} else {
					if (!(options['form.id'] in config)) {
						throw new Error('Config: Invalid form.id for webhook');
					}

					options['form.id'] = config[options['form.id']];

					// if there was already a webhook in the settings, keep the status
					if (hasWebhookStatus) {
						options['isActive'] = webhookStatus;
					}

					if (options.filter) {
						options.filter = reconstructFilter(options.filter, config);
					}

					promise = _webhook.service.create(options)
						.then(function (webhook) {
							config.webhookId = webhook.id;
							config.webhookKey = webhook.secretKey;
							return config;
						})
						.catch(function (err) {
							znMessage('There was an error creating the webhook.', 'error');
							return config;
						});
				}
			} else if (
				_webhook &&
				!stateChange && (
					_webhook.options.filter || Array.isArray(_webhook.options) && _webhook.options.some(function (opts) {
						return opts.filter;
					})
				)
			) {
				var updateOptions = multiWebhooks
					? _webhook.options.map(function (opts) {
						return Object.assign({}, opts);
					})
					: Object.assign({}, _webhook.options);

				if (multiWebhooks) {
					updateOptions.forEach(function (opts) {
						if (opts.filter) {
							opts.filter = reconstructFilter(opts.filter, config);
						}
					});

					promise = $q.all(updateOptions.map(function (opts, i) {
						return _webhook.service.update({
							id: config['webhook' + i + 'Id'],
							filter: opts.filter
						});
					}))
						.then(function (webhooks) {
							return config;
						})
						.catch(function (err) {
							znMessage('There was an error creating the webhook.', 'error');
							return config;
						});
				} else {
					updateOptions.filter = reconstructFilter(updateOptions.filter, config);

					promise = _webhook.service.update({
						id: config.webhookId,
						filter: updateOptions.filter
					})
						.then(function (webhook) {
							return config;
						})
						.catch(function (err) {
							znMessage('There was an error creating the webhook.', 'error');
							return config;
						});
				}
			}

			return promise.then(function (cfg) {
				return configService.save(_workspaceId, $scope.settings.multi, $scope.configs, cfg).then(function () {
					return cfg;
				});
			}).then(function (cfg) {
				// Now that we know the config id, update the webhook URL to add it when using multi configs.
				if ($scope.settings.multi && _webhook) {
					if (Array.isArray(_webhook.options)) {
						return $q.all(_webhook.options.map(function (opts, i) {
							return _webhook.service.load(cfg['webhook' + i + 'Id']).then(function (wh) {
								var separator;
								var url = wh.url;

								if ($scope.settings.id && url.indexOf('id=') === -1) {
									separator = url.indexOf('?') === -1 ? '?' : '&';
									url = url + separator + 'id=' + encodeURI($scope.settings.id);
								}

								if (url.indexOf('config=') === -1) {
									separator = url.indexOf('?') === -1 ? '?' : '&';
									url = url + separator + 'config=' + encodeURI(cfg.$id);
								}

								if (url !== wh.url) {
									return _webhook.service.update({ id: wh.id, url: url });
								}
							});
						}));
					} else {
						return _webhook.service.load(cfg.webhookId).then(function (wh) {
							var separator;
							var url = wh.url;

							if ($scope.settings.id && url.indexOf('id=') === -1) {
								separator = url.indexOf('?') === -1 ? '?' : '&';
								url = url + separator + 'id=' + encodeURI($scope.settings.id);
							}

							if (url.indexOf('config=') === -1) {
								separator = url.indexOf('?') === -1 ? '?' : '&';
								url = url + separator + 'config=' + encodeURI(cfg.$id);
							}

							if (url !== wh.url) {
								return _webhook.service.update({ id: wh.id, url: url });
							}
						});
					}
				}
			});
		}

		function doSaveSecure (secureConfig) {

			var configId = $scope.settings.multi && $scope.editing.config.$id;

			return configService.saveSecure($scope.settings.secureEndpoint, _workspaceId, configId, secureConfig).then(function () {
				return secureConfig;
			});

		}

		/**
		 * This function will take a filter object and update all attribute and value properties
		 * with the data from the config object.
		 *
		 * @param {Object} filter The filter to update
		 * @param {Object} config The config to reference while updating
		 *
		 * @returns {Object} the updated (and now valid) filter
		 */
		function reconstructFilter (filter, config) {
			if (typeof filter === 'string') {
				return config[filter];
			}

			var newFilter = angular.extend({}, filter);
			/**
			 * Check for attribute prop, which will tell the function to return a filter formula
			 * otherwise, for each new layer of the filter
			 * (represented by {and: [filters]} or {or: [filters]})
			 * recursively call the function on each filter in that layer.
			 */
			if (filter.attribute) {
				if (filter.attribute.replaceField) {
					// Update attribute prop to actual input value (as a field Id)
					newFilter.attribute = 'field' + config[filter.attribute.replaceField];
				}

				if (filter.attribute.replaceValue) {
					// Update attribute prop to actual input value
					newFilter.attribute = config[filter.attribute.replaceValue];
				}

				if (filter.value && filter.value.replaceField) {
					// Update value prop to actual input value (as a field Id)
					newFilter.value = 'field' + config[filter.value.replaceField];
				}

				if (filter.value && filter.value.replaceValue) {
					// Update value prop to actual input value
					newFilter.value = config[filter.value.replaceValue];
				}

				if (filter.prefix.replaceValue) {
					var prefixValue = config[filter.prefix.replaceValue] === 'is' ? '' : config[filter.prefix.replaceValue];
					// Prefix cannot be a fieldID, so only replaceValue is handled
					newFilter.prefix = prefixValue;
				}

				if (filter.filter) {
					// If there is a filter instead of a value, recursively update that filter
					newFilter.filter = reconstructFilter(filter.filter, config);
				}

				// If all of the props were strings/numbers, no update would be necessary
				return newFilter;
			} else if (filter.and) {
				var newAnd = newFilter.and.map(function (nextFilter) {
					return reconstructFilter(nextFilter, config);
				});

				return { and: newAnd };
			} else if (filter.or) {
				var newOr = newFilter.or.map(function (nextFilter) {
					return reconstructFilter(nextFilter, config);
				});

				return { or: newOr };
			}
		}

		/**
		 * Creates and returns a shallow copy of an object.
		 * This is an alternative to angular.copy() for turning Firebase references into plain objects.
		 *
		 * @param {Object} obj
		 *
		 * @return {Object}
		 */
		function shallowCopy (obj) {
			var newObj = {};

			if (angular.isObject(obj)) {
				angular.forEach(Object.keys(obj), function (key) {
					if (key.indexOf('$') === -1) {
						newObj[key] = obj[key];
					}
				});
			}

			return newObj;
		}

		/**
		 * Runs a Config hook.
		 *
		 * @param {string} hook
		 * @param {Objecg} data
		 */
		function doRunHook (hook, data) {
			return $scope.options.run(hook, data);
		}

		/**
		 * Bootstraps plugin.
		 */
		function init () {
			// Sanity.
			if (!angular.isObject($scope.options) || !('getConfig' in $scope.options) || typeof $scope.options.getConfig !== "function") {
				throw new Error('Config: Missing or invalid options object');
			}

			$scope.settings = $scope.options.getConfig();
			$scope.display = $scope.settings.display || 'grid';

			_webhook = $scope.options.getWebhook();
			doResetTab();

			// Load settings.
			return configService.load(_workspaceId, $scope.settings.multi, $scope.settings.id).then(function (configs) {
				var def = $q.defer();

				if (!$scope.settings.multi) {
					$scope.editing.config = configs;
					_originalConfig = shallowCopy(configs);
				}

				$scope.configs = configs;

				doRunHook('init', $scope.configs).finally(function () {
					def.resolve();
				});

				return def.promise;
			}).then(function () {
				if ($scope.options.hasWorkspaceField()) {
					return loadWorkspaces();
				} else if ($scope.options.hasFormField()) {
					return loadForms(_workspaceId);
				}
			});
		}
	}]);
