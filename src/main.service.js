plugin.service('wgnConfigSrv', ['$q', '$firebase', 'znData', function ($q, $firebase, znData) {
	var srv = this;

	/**
	 * Loads plugins data.
	 *
	 * @return {Promise<Object>} Plugin data.
	 */
	var getPlugin = function () {
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
	 * Connects to Firebase and retrieves any plugin settings for this workspace.
	 *
	 * @param {Object} plugin The plugins data.
	 * @param {number} workspaceId The workspace id.
	 * @param {boolean} multi Whether this plugin supports multiple configurations.
	 *
	 * @return {Promise<Object>} Plugin settings.
	 */
	var connect = function (plugin, workspaceId, multi) {
		multi = multi || false;

		// Make sure we have valid Firebase settings.
		if (!('firebaseUrl' in plugin) || !plugin.firebaseUrl) {
			return $q.reject('Config: Plugin missing Firebase URL.');
		}
		if (!('firebaseAuthToken' in plugin) || !plugin.firebaseAuthToken) {
			return $q.reject('Config: Plugin missing Firebase Secret.');
		}

		var q = $q.defer();
		var path = '';

		// Sanity, always ensure we have a trailing slash.
		if (plugin.firebaseUrl.substring(plugin.firebaseUrl.length - 1, plugin.firebaseUrl.length) !== '/') {
			path += '/';
		}

		path += workspaceId;

		if (multi) {
			path += '/settings';
		}

		var ref = new Firebase(plugin.firebaseUrl + path);

		ref.auth(plugin.firebaseAuthToken, function (err) {
			if (err) {
				q.reject(err);
			}
			var $ref = $firebase(ref);
			var sync = multi ? $ref.$asArray() : $ref.$asObject();
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
	 * @param {boolean} multi Whether this plugin supports multiple configurations.
	 *
	 * @return {Promise<Object>} Plugin settings.
	 */
	srv.load = function (workspaceId, multi) {
			return connect(plugin, workspaceId, multi);
		return getPlugin().then(function (plugin) {
		});
	};

	/**
	 * Saves a config plugin configuration.
	 *
	 * @param {number} workspaceId
	 * @param {Object} $ref A Firebase reference.
	 * @param {Object} config The configuration object to save.
	 *
	 * @return {Promise<*>}
	 */
	srv.save = function (workspaceId, $ref, config) {
		if (config.$id) {
			var index = $ref.$indexFor(config.$id);
			$ref[index] = config;
			return $ref.$save(index);
		}

		return $ref.$add(config);
	};

	/**
	 * Saves a single config plugin configuration.
	 *
	 * @param {number} workspaceId
	 * @param {Object} $ref A Firebase reference.
	 *
	 * @return {Promise<Object>}
	 */
	srv.saveSingle = function (workspaceId, $ref) {
		return $ref.$save();
	};

	/**
	 * Completely deletes a given configuration.
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
