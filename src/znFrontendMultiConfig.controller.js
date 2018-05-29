(function (angular) {

	angular.module('znFrontendMultiConfig')
		.controller('zpMultiSettingsCtrl', ['$scope', '$routeParams', '$q', 'znModal', 'znMessage', 'zpMultiSettingsSrv',
			function ($scope, $routeParams, $q, znModal, znMessage, multiSettingsService) {

				// Convenience.
				var workspaceId = $routeParams.workspace_id;

				/**
				 * Whether the plugins is loading or not, displays a throbber.
				 *
				 * @type {boolean}
				 */
				$scope.loading = true;

				/**
				 * Configurations loaded from Firebase.
				 *
				 * @type {Array<Object>}
				 */
				$scope.configs = [];

				/**
				 * The current config being created/edited or false if none.
				 *
				 * @type {Object|boolean}
				 */
				$scope.editingConfig = false;

				/**
				 * Creates a new configuration.
				 */
				$scope.doNewConfig = function () {
					var promise = $scope.editingConfig ? $scope.onDiscardChanges() : $q.when();

					return promise.then(function () {
						$scope.editingConfig = {};
					});
				};

				/**
				 * Edits an existing configuration.
				 *
				 * @param {string} id The config id.
				 */
				$scope.doEditConfig = function (id) {
					var promise = $scope.editingConfig ? $scope.onDiscardChanges() : $q.when();

					return promise.then(function () {
						$scope.editingConfig = angular.copy($scope.configs.filter(function (config) {
							return config.$id === id;
						})[0]);

						$scope.$emit('zpMultiSettingsEdit', id);
					});
				};

				/**
				 * Triggered by discarding configuration changes, prompts for confirmation.
				 *
				 * @returns {Promise}
				 */
				$scope.onDiscardChanges = function () {
					var def = $q.defer();

					// Only prompt if form has been changed.
					if (!$scope.zpMultiSettingsForm.$dirty) {
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
									doDiscardChanges();
									def.resolve();
								}
							}
						}
					});

					return def.promise;
				};

				/**
				 * Deletes an existing configuration.
				 */
				$scope.onDeleteConfig = function () {
					znModal({
						title: 'Are you sure?',
						template: '<p>Are you sure you want to delete the <strong>' + $scope.editingConfig.name + '</strong> configuration?</p><p>This action is irreversible.</p>',
						classes: '',
						closeButton: false,
						btns: {
							'No': {
								primary: true,
								action: function () {
								}
							},
							'Yes': {
								danger: true,
								action: function () {
									return multiSettingsService.deleteConfig(workspaceId, $scope.editingConfig, $scope.configs).then(function () {
										doDiscardChanges();
										znMessage('The configuration has been deleted!', 'info');
									});
								}
							}
						}
					});
				};

				// Init plugins.
				init().then(function () {
					$scope.loading = false;
				});

				/**
				 * Saves the current configuration.
				 *
				 * @param {Object} config
				 *
				 * @return {Promise}
				 */
				function doSaveConfig (config) {
					return multiSettingsService.save(workspaceId, $scope.configs, config).then(function () {
						doDiscardChanges();
					});
				}

				function doDiscardChanges () {
					$scope.editingConfig = false;
					$scope.$emit('zpMultiSettingsDiscard');
				}

				function init () {
					// Load settings.
					return multiSettingsService.load(workspaceId).then(function (settings) {
						$scope.configs = settings;
						$scope.$emit('zpMultiSettingsInit');
					});
				}
			}]);

})(angular);
