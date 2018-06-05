# zn-frontend-multi-config

> Helper module for implementing settings forms. Contains a form-builder, support for multiple settings sections separated by tabs and also for multiple configurations.   

## Installation

```shell
# Run this from your frontend plugin's root diretory.
npm install git+ssh://git@github.com/WizeHive/zn-frontend-multi-config --save --prefix ./src
```

It's important that this gets installed under the `src` directory, alongside your plugin's other code if not Maya won't build it properly.

## Usage

With the module available in the src folder it's now just a matter of defining your settings fields.

### View

Add the directive to you settings page template; 

```html
<script type="text/ng-template" id="wgn-settings">

	<wgn-multi-config settings="configSettings"></wgn-multi-config>

</script>

```

### Controller

Then, build out and add `configSettings` to your scope:

```js
plugin.controller('wgnSettingsCtrl', ['$scope', function ($scope) {
  // Define plugin settings (see "Settings" section)
  $scope.configSettings = {
    title: 'My Awesome Plugin Settings',
    icon: 'platypus',
    multi: true,
    disable: true,
    pages: [
      {
      	id: 'target',
      	name: 'Target Form',
      	fields: [],
      },
      {
      	id: 'logging',
      	name: 'Logging Form',
      	fields: []
      }
    ]    
  };
	
  // For advanced usage you can also listen for certain multi config events (see "Events" section).
  $scope.$on('wgnMultiConfigEdit', function (ev, config) {
    console.log('this is the config being edited', config);
  });
}]);
```

### Boom!

We're done, that's it! The directive will take care of the rest!

## Settings Options

The following settings are supported:

- **title**: The heading that will be displayed at the top of the page
- **icon**: Optional. An icon to display by the heading
- **multi**: One of `true` to support multiple configurations or `false` to have a single configuration. Defaults to `false`
- **disable**: One of `true` to allow disabling the configuration (ie: to prevent webhooks running) or `false` for configurations to be always on. Defaults to `false`
- **pages**: An array of `settings pages` (see next section)

### Settings Pages

A `settings page` is what will actually hold the fields for your settings.

You may define as many as you want but _must_ have at least one!

In the event that there are multiple settings pages, they will be navigatable using tabs.

You should define an array of `fields` for each page (see next section)

### Settings Fields

A `field` is a simple object describing what the field should be:

```js
[
  {
    id: 'targetFormId',
    name: 'Target Form',
    help: 'The form which contains the data to check.',
    required: true,
    type: 'form'
  },
  {
    id: 'targetFieldId',
    name: 'Target Field',
    help: 'The field which contains the specific data to check.',
    required: true,
    type: 'field',
    belongsTo: 'targetFormId',
    restrict: 'text-input'
  }
]
```

There are many different field types and some may have specific settings but all fields share the following base settings:

- **id**: A unique slug identifier. This will be used as the key in firebase to store the value
- **name**: The field name. This will be used as the field label
- **help**: Optional. Help text to display below the field
- **required**: One of `true` to make the field required or `false` to make it optional. Defaults to `false`.
- **type**: The `field type` (see next section)

### Field Types

The following field types are available:

- [form](#form)
- [field](#field)
- [text](#text)
- [number](#number)
- [textarea](#textarea)
- [select](#select)
- [markup](#markup)

#### form

A `form` field is a dropdown input that allows you to pick one of the forms in the given workspace.

#### field

A `field` field is a special dropdown input that allows you to pick a field from a certain form, optionally limiting to a certain field type.
It has the following extra settings:

- **belongsTo**: The field id for the `form` input this should display fields from
- **restrict**: Whether to restrict to a certain Zengine field type. Possible options are: `text-input`, `date-picker`, `linked`, etc.

#### text

A simple text input. It has the following extra setting:

- **placeholder**: Optional. Some content to display when the input is blank.

#### number

A simple numeric input. It has the following extra setting:

- **placeholder**: Optional. Some content to display when the input is blank.

#### textarea

A muli-line text input.

#### select

A dropdown input. It has the following extra setting:

- **options**: An array of Objects containing an option definition:

```js
[
  {
    value: 'off',
    label: 'Off'
  },
  {
    value: 'on',
    label: 'On'
  }
]
```

#### markup

A special field that lets you display any arbitrary markup. Note: This field doesn't share any base settings and instead has just one:

- **value**: A string with any valid HTML

### Configuration Examples

See [here](example.js) for additional configuration examples.

## Multi Config Events

The following events are emitted at various stages of the multi config workflow and can be used to achieve deeper customization for more complex forms.

- `wgnMultiConfigInit` when all firebase data has been loaded and the plugin has initialized.
- `wgnMultiConfigAdd` when a new configuration is being created, receives no params. This is useful if you need to perform some first-time setup for new configurations.
- `wgnMultiConfigSave` when configuration is saved, receives the config as a param. This is useful if you need to perform tasks once a config is successfully saved, such as enable a webhook.
- `wgnMultiConfigEdit` when a configuration is selected for editing, receives the config as a param. This is useful if you need to load additional data such as fields for a selected form in the config.
- `wgnMultiConfigDiscard` when changes are being discarded for the config being edited, receives no params. This is useful if you need to perform additional cleanup or perform any extra action such as going to a default tab.
- `wgnMultiConfigDelete` when a configuration is deleted, receives the config as a param. This is useful to do some additional cleanup such as delete a webhook.
- `wgnMultiConfigEnable` when a configuration is enabled.
- `wgnMultiConfigDisable` when a configuration is disabled.

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
