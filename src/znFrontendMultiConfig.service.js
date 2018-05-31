plugin.service('wgnMultiConfigSrv', ['$q', '$firebase', 'znData',
	function ($q, $firebase, znData) {

		var srv = this;

		/**
		 * Loads plugins data.
		 *
		 * @return {Promise<Object>} Plugin data.
		 */
		var loadPlugin = function () {
			var q = $q.defer();

			znData('Plugins').get({
					namespace: 'wgn'
				},
				function (resp) {
					q.resolve(resp[0]);
				},
				function (resp) {
					q.reject(resp);
				}
			);

			return q.promise;
		};

		/**
		 * Connects to Firebase and retrieves plugins settings for this workspace.
		 *
		 * @param {Object} plugin The plugins data.
		 * @param {number} workspaceId The workspace id.
		 *
		 * @return {Promise<Object>} Plugin settings.
		 */
		var connect = function (plugin, workspaceId) {
			var q = $q.defer();
			var ref = new Firebase(plugin.firebaseUrl + workspaceId + '/settings');

			ref.auth(plugin.firebaseAuthToken, function (err) {
				if (err) {
					q.reject(err);
				}
				var sync = $firebase(ref).$asArray();
				sync.$loaded().then(function (settings) {
					q.resolve(settings);
				});
			});

			return q.promise;
		};

		/**
		 * Connects to Firebase and retrieves plugins settings for this workspace.
		 *
		 * @param {number} workspaceId The workspace id.
		 *
		 * @return {Promise<Object>} Plugin settings.
		 */
		srv.load = function (workspaceId) {
			return loadPlugin().then(function (plugin) {
				return connect(plugin, workspaceId);
			});
		};

		/**
		 * Saves plugins settings for this workspace.
		 *
		 * @param {number} workspaceId
		 * @param {Object} settings
		 * @param {Object} config
		 *
		 * @return {Promise<*>}
		 */
		srv.save = function (workspaceId, settings, config) {
			if (config.$id) {
				var index = settings.$indexFor(config.$id);
				settings[index] = config;
				return settings.$save(index);
			}

			return settings.$add(config);
		};

		/**
		 * Completely deletes a given configuration.
		 *
		 * @param {number} workspaceId
		 * @param {Object} config
		 * @param {Object} settings
		 *
		 * @return {Promise<*>}
		 */
		srv.deleteConfig = function (workspaceId, config, settings) {
			var index = settings.$indexFor(config.$id);

			if (index === -1) {
				return $q.reject('Inexistent config');
			}

			return settings.$remove(index);
		};

		return srv;
	}]);
