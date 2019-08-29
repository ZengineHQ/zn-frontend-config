plugin.service('wgnConfigSrv', ['$q', '$firebase', 'znData', 'znPluginData', function ($q, $firebase, znData, znPluginData) {
	var srv = this;

	var authData = {};

	var currentPlugin;

	/**
	 * Connects to Firebase and retrieves any plugin settings for this workspace.
	 *
	 * @param {Object} plugin The plugins data.
	 * @param {number} workspaceId The workspace id.
	 * @param {boolean} multi Whether this plugin supports multiple configurations.
	 *
	 * @return {Promise<Object>} Plugin settings.
	 */
	function getFirebase (plugin, workspaceId, multi, id) {
		// Make sure we have valid Firebase settings.
		if (!plugin.firebaseUrl) {
			return $q.reject('Config: Plugin missing Firebase URL.');
		}
		if (!plugin.firebaseAuthToken) {
			return $q.reject('Config: Plugin missing Firebase Secret.');
		}

		var q = $q.defer();
		var path = '';

		// Sanity, always ensure we have a trailing slash.
		if (plugin.firebaseUrl.substring(plugin.firebaseUrl.length - 1, plugin.firebaseUrl.length) !== '/') {
			path += '/';
		}

		path += workspaceId;

		if (id) {
			path += '/'.concat(id);
		}

		if (multi) {
			path += '/settings';
		}

		var ref = new Firebase(plugin.firebaseUrl + path);

		var loadSettings = function() {

			var $ref = $firebase(ref);
			var sync = multi ? $ref.$asArray() : $ref.$asObject();

			return sync.$loaded();

		};

		// no need to authenticate twice for same database
		if (authData[plugin.firebaseAuthToken]) {
			return authData[plugin.firebaseAuthToken].then(loadSettings);
		}

		authData[plugin.firebaseAuthToken] = q.promise;

		ref.auth(plugin.firebaseAuthToken, function (err, auth) {

			if (err) {
				return q.reject(err);
			}

			q.resolve(auth);
		});

		return q.promise.then(loadSettings);
	}

	/**
	 * Saves a multi config plugin configuration.
	 *
	 * @param {number} workspaceId
	 * @param {Object} $ref A Firebase reference.
	 * @param {Object} config The configuration object to save.
	 *
	 * @return {Promise<*>}
	 */
	function saveMulti (workspaceId, $ref, config) {
		if (config.$id) {
			var index = $ref.$indexFor(config.$id);
			$ref[index] = config;
			return $ref.$save(index);
		}

		return $ref.$add(config).then(function (ref) {
			var id = 'key' in ref && angular.isFunction(ref.key) ? ref.key() : ref.path.n.pop();
			config.$id = id;
		});
	}

	/**
	 * Saves a single (non multi) plugin configuration.
	 *
	 * @param {number} workspaceId
	 * @param {Object} $ref A Firebase reference.
	 *
	 * @return {Promise<Object>}
	 */
	function saveSingle (workspaceId, $ref) {
		return $ref.$save();
	}

	/**
	 * Loads plugins data.
	 *
	 * @return {Promise<Object>} Plugin data.
	 */
	srv.getPlugin = function() {
		var q = $q.defer();

		if (currentPlugin) {
			return $q.when(currentPlugin);
		}

		znData('Plugins').get({
				namespace: 'wgn'
			},
			function (resp) {
				currentPlugin = resp[0];
				q.resolve(currentPlugin);
			},
			function (resp) {
				q.reject(resp);
			}
		);

		return q.promise;
	};

	/**
	 * Connects to Firebase and retrieves plugins configurations for the given workspace.
	 *
	 * @param {number} workspaceId The workspace id.
	 * @param {boolean} multi Whether this plugin supports multiple configurations.
	 *
	 * @return {Promise<Object>} Plugin settings.
	 */
	srv.load = function (workspaceId, multi, id) {
		return srv.getPlugin().then(function (plugin) {
			return getFirebase(plugin, workspaceId, multi, id);
		});
	};

	/**
	 * Saves a plugin configuration for the given workspace.
	 *
	 * @param {number} workspaceId
	 * @param {boolean} multi Whether this plugin supports multiple configurations.
	 * @param {Object} $ref A Firebase reference.
	 * @param {Object} config The configuration object to save.
	 *
	 * @return {Promise<*>}
	 */
	srv.save = function (workspaceId, multi, $ref, config) {
		return multi ? saveMulti(workspaceId, $ref, config) : saveSingle(workspaceId, $ref);
	};

	/**
	 * Saves a plugin's secure configuration settings for the given workspace.
	 *
	 * @param {number} workspaceId
	 * @param {String} configId The config id for multi configurations
	 * @param {Object} config The configuration object to save.
	 *
	 * @return {Promise<*>}
	 */
	srv.saveSecure = function (workspaceId, configId, config) {

		var params = {
			workspaceId: workspaceId,
			params: {
				configId: configId
			}
		};

		return znPluginData('wgn').post('/settings', params, config);

	};

	/**
	 * Completely deletes a given multi configuration.
	 *
	 * @param {number} workspaceId
	 * @param {Object} config
	 * @param {Object} $ref A Firebase reference.
	 *
	 * @return {Promise<*>}
	 */
	srv.deleteConfig = function (workspaceId, config, $ref) {
		var index = $ref.$indexFor(config.$id);

		if (index === -1) {
			return $q.reject('Inexistent config');
		}

		return $ref.$remove(index);
	};

	return srv;
}]);
