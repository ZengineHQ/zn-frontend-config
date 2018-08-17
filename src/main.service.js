plugin.service('wgnConfigSrv', ['$q', '$firebase', 'znData', function ($q, $firebase, znData) {
	var srv = this;

	/**
	 * Loads plugins data.
	 *
	 * @return {Promise<Object>} Plugin data.
	 */
	function getPlugin () {
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
	}

	/**
	 * Connects to Firebase and retrieves any plugin settings for this workspace.
	 *
	 * @param {Object} plugin The plugins data.
	 * @param {number} workspaceId The workspace id.
	 * @param {boolean} multi Whether this plugin supports multiple configurations.
	 *
	 * @return {Promise<Object>} Plugin settings.
	 */
	function getFirebase (plugin, workspaceId, multi) {
		/*jshint maxcomplexity:8 */
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
	 * Connects to Firebase and retrieves plugins configurations for the given workspace.
	 *
	 * @param {number} workspaceId The workspace id.
	 * @param {boolean} multi Whether this plugin supports multiple configurations.
	 *
	 * @return {Promise<Object>} Plugin settings.
	 */
	srv.load = function (workspaceId, multi) {
		return getPlugin().then(function (plugin) {
			return getFirebase(plugin, workspaceId, multi);
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
