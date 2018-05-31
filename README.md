# zn-frontend-multi-config

> Helper module for implementing multiple configurations.

This is partly a magical directive and partly a convention over configuration guideline, read on. 

## Installation

```shell
# Run this from your frontend plugin's root diretory.
npm install git+ssh://git@github.com/WizeHive/zn-frontend-multi-config --save --prefix ./src
```

It's important that this gets installed under the `src` directory, alongside your plugin's other code if not Maya won't build it properly.

## Usage

With the module available in the src folder it's now just a matter of building some boilerplate code to leverage it.


#### Controller

First, load the multiple configurations in your settings controller:

```js
plugin.controller('wgnSettingsCtrl', ['$scope', '$routeParams', 'wgnMultiConfigSrv', function ($scope, multiConfigs, $routeParams) {
	// This should be standard issue for controllers that load settings.
	$scope.loading = true;
	
	// No need to pollute the scope with this.
	var workspaceId = $routeParams.workspace_id;
	
	// Load configuration from Firebase.
	multiConfigs.load(workspaceId).then(function (configs) {
		$scope.configs = configs;
		$scope.loading = false;
	});
	
	// For advanced usage you can also listen for certain multi config events (see next section).
	$scope.$on('wgnMultiConfigEdit', function (ev, config) {
		console.log('this is the config being edited', config);
	});
}]);
```

*Important*
- You must store the loaded config in a `$scope` variable called `configs`.

#### Views

Then, include the directive in your settings template and also create a new template to hold your actual form inputs.

```html
<!--This is the main template for our settings controller above-->
<script type="text/ng-template" id="wgn-settings">

	<div>
		<div class="section">
			<h2><i class="icon-platypus"></i> My Plugin's Settings</h2>
		</div>

		<span ng-show="loading" class="throbber"></span>

		<wgn-multi-config ng-if="!loading"></wgn-multi-config>
	</div>

</script>

<!--This is an additional template containing our configuration's actual fields-->
<script type="text/ng-template" id="wgn-config-form">
	<div>
		<div class="control-group">
			<label class="form-label">Target Form</label>

			<div class="controls">
				<select class="form-control"
						ng-options="form.id as form.name for form in workspaceForms"
						ng-model="editingConfig.targetFormId"
						ng-change="onSelectForm(editingConfig.targetFormId)">
				</select>

				<span class="danger">required</span>
				<span class="help-block">The form which contains the data to check.</span>
			</div>
		</div>
	</div>
</script>
```

*Important*
- This secondary template must be called `wgn-config-form` (_unless you are using tabs - see below_)
- Notice that in the second template for your config fields, your `ng-model` will always point to the `editingConfig` object.
- Don't add a new controller to this template, simply use the main settings one by accessing it's scope directly.

Boom!

We're done, that's it! The directive will take care of the rest!

## Multi Config Events

The following events are emitted at various stages of the multi config workflow and can be used to achieve deeper customization for more complex forms.

- `wgnMultiConfigAdd` when a new configuration is being created, receives no params. This is useful if you need to perform some first-time setup for new configurations.
- `wgnMultiConfigSave` when configuration is saved, receives the config as a param. This is useful if you need to perform tasks once a config is successfully saved, such as enable a webhook.
- `wgnMultiConfigEdit` when a configuration is selected for editing, receives the config as a param. This is useful if you need to load additional data such as fields for a selected form in the config.
- `wgnMultiConfigDiscard` when changes are being discarded for the config being edited, receives no params. This is useful if you need to perform additional cleanup or perform any extra action such as going to a default tab.
- `wgnMultiConfigDelete` when a configuration is deleted, receives the config as a param. This is useful to do some additional cleanup such as delete a webhook.

## Tabbed Configurations

Finally, this directive also has helpers for working with multiple configuration pages separated by tabs. In order to leverage this functionality add the following to your controller:

```js
$scope.tabs = [
	{
		slug: 'target',
		label: 'Target Form'
	},
	{
		slug: 'logging',
		label: 'Logging Form'
	}
];
``` 

Now, instead of using the one `wgn-config-form` template as described above, create a specific template for each tab, prefixing the name with the tab slug as follows:

```html
<script type="text/ng-template" id="wgn-config-form-target">
	// AWESOME TARGET TAB FIELDS HERE
</script>

<script type="text/ng-template" id="wgn-config-form-logging">
	// AWESOME LOGGING TAB FIELDS HERE
</script>

```

## Backend Services

In order to leverage multiple configs in your backend services it's recommended to always pass the following query string parameter to both `znPluginData` requests and also webhook urls: `'?config=' + encodeURI(config.$id)` 

Then in your backend service:

```js
var configId = eventData.request.query.config;

if (!configId){
	eventData.response.status(403).send('Config id required');
}

// Vanilla (boo)
firebase().child(workspaceId).child('settings').child(configId).once('value', function(snapshot) {
	settings = snapshot.val();
	console.log('settings', settings);
});

// Using zn-backend-firebase (awesome)
var zbf = require('zn-backend-firebase');
zbf.load([workspaceId, 'settings', configId]).then(function (settings) {
	console.log('settings', settings);
});
```
