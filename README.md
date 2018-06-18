# zn-frontend-multi-config

> Helper module for implementing settings forms. Contains a form-builder, support for multiple settings sections separated by tabs and also for multiple configurations.   

## Installation

```shell
# Run this from your frontend plugin's src diretory.
npm i @zenginehq/frontend-multi-config --save
```

It's important that this gets inside under the `src` directory, alongside your plugin's other code if not Maya won't build it properly.

## Updating

In order to update this module to a newer version run this in your plugin's `src` directory:

```shell
npm i @zenginehq/frontend-multi-config@latest --save
```

## Usage

Add the directive to you settings page template; 

```html
<script type="text/ng-template" id="wgn-settings">
	<wgn-multi-config options="config"></wgn-multi-config>
</script>

```

Then, build out and add `config` to your controller's scope by building a configuration object:

```js
plugin.controller('wgnSettingsCtrl', ['$scope', 'wgnMultiConfigSettings', function ($scope, multiConfigSettings) {
  // Instantiate a new object instance and use the fluid api to set up your settings page.
  // It has sensible defaults built in so everything is optional.
  $scope.config = new multiConfigSettings('My Awesome Settings')
    .multi(false)
    .toggle(true)
    .help('this is some help text')
    .icon('emo-devil')
    .page('First Page')
    .field({
      id: 'formId',
      name: 'Eligibility Form',
      help: 'The form which contains the eligibility data.',
      type: 'form'
    })
    .field({
      id: 'submittedFolder',
      name: 'Submitted Folder',
      help: 'The folder records go to when they are submitted.',
      type: 'folder',
    })
    .field({
      id: 'eligibleFolder',
      name: 'Eligible Folder',
      help: 'The folder records go to when they are eligible.',
      type: 'folder',
    })
    .page('Second Page')
    .field({
      id: 'ineligibleFolder',
      name: 'Ineligible Folder',
      help: 'The folder records go to when they are ineligible.',
      type: 'folder',
    });
	
  // For advanced usage you can also listen for certain multi config events (see "Events" section).
  $scope.$on('wgnMultiConfigEdit', function (ev, config) {
    console.log('this is the config being edited', config);
  });
}]);
```

### Boom!

We're done, that's it!

## Methods

The following methods are available:

- **title(_string_)**: Customize the heading that will be displayed at the top of the page
- **icon(_string_)**: Customize the icon to display next to heading
- **help(_string_)**: Customize the help text that will be displayed below the heading
- **multi(_boolean_)**: One of `true` to support multiple configurations or `false` to have a single configuration. Defaults to `false`
- **toggle(_boolean_)**: One of `true` to allow enabling and disabling a configuration (ie: to prevent webhooks running) or `false` for configurations to be always on. Defaults to `true`
- **page(_string_)**: Add a page (see "Settings Pages" below)
- **field(_object_)**: Add a field definition (see "Settings Fields" below)

### Settings Pages

A `settings page` is what will actually hold the field inputs for your settings.

In the event that there are multiple settings pages, they will be navigatable using tabs.

To add one simply call `.page('My Title')`.

### Settings Fields

A `field` is a simple object describing what the input should be:

```js
var formInput = {
  id: 'targetFormId',
  name: 'Target Form',
  help: 'The form which contains the data to check.',
  type: 'form'
};

var fieldInput = {
  id: 'targetFieldId',
  name: 'Target Field',
  help: 'The field which contains the specific data to check.',
  type: 'field',
  belongsTo: 'targetFormId',
  restrict: 'text-input'	
};
```

There are many different field types and some may have specific settings but all fields share the following base settings:

- **id**: A unique slug identifier. This will be used as the key in firebase to store the value
- **name**: The input name. This will be used as the label
- **help**: Optional. Help text to display below the input
- **required**: One of `true` to make the input required or `false` to make it optional. Defaults to `true`.
- **type**: The `field type` (see next section)

Note: Some specific field types may also define additional settings.

To add a field simply call `.field(fielDefinitionObject)`.

### Field Types

The following field types are available:

- [form](#form)
- [field](#field)
- [folder](#folder)
- [text](#text)
- [number](#number)
- [textarea](#textarea)
- [select](#select)
- [markup](#markup)
- [choice][#choice]

#### form

A `form` input is a dropdown that allows you to pick one of the forms in the given workspace.

#### field

A `field` input is a special dropdown that allows you to pick a field from a certain form, optionally limiting to a certain field type.
It has the following extra settings:

- **belongsTo**: Optional. The field id for the `form` input this should load fields from. If left blank it will default to the last defined form input on the current page.
- **restrict**: Whether to restrict to a certain Zengine field type. Possible options are: `text-input`, `date-picker`, `linked`, etc.

#### folder

A `folder` input is another special dropdown that allows you to pick a folder from a certain form.
It has the following extra settings:

- **belongsTo**: Optional. The field id for the `form` input this should load folders from. If left blank it will default to the last defined form input on the current page. 

#### text

A simple text input. It has the following extra setting:

- **placeholder**: Optional. Some content to display when the input is blank.

#### number

A simple numeric input. It has the following extra setting:

- **placeholder**: Optional. Some content to display when the input is blank.

#### textarea

A muli-line text input.

#### select

A dropdown. It has the following extra setting:

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

A special input that lets you display any arbitrary markup. Note: This field doesn't share any base settings and instead has just one:

- **value**: A string with any valid HTML

#### choice

A special input that allows you to deal with fields that have choices, ie: radio, checkbox and dropdown fields.
There are two different modes: `select` and `score`. 

- _Select_ allows one of the field's choices to be selected, for example: what the correct answer is
- _Score_ allows a value to be assigned to each of the field's choices

It has the following extra settings:

- **mode**: One of `select` or `score` (see above for differences)
- **restrict**: Optional. Whether to restrict to `radio`, `checkbox` or `dropdown`.
- **belongsTo**: The field id for the `form` input this should display fields from

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

## Advanced Usage - Custom Field Types

In order to support virtually any kind of configuration a plugin may need there's also a way to define a custom field type:

```js
$scope.config = new multiConfigSettings('My Awesome Settings');
// ... etc

// Define a custom field type.
$scope.config.fieldType({
  type: 'monkey',
  template: 'wgn-multi-config-input-monkey'
});

// Then use it inside a page.
$scope.config.page('test page').field({
  type: 'monkey',
  id: 'myCustomField',
  name: 'Custom Field'
});
```

You must then create a directive to render that field:

```js
// @TODO revisit this once its implemented
plugin.directive('wgnMultiConfigInputMonkey', [function () {
		return {
  		scope: true,
  		templateUrl: 'wgn-multi-config-input-monkey',
  		restrict: 'E',
  		replace: true,
  		link: function ($scope, $el, $attrs) {
  			$scope.specs = $scope.$eval($attrs.specs);
  		}
  	};
}]);
```  

And finally the directive template:

```html
<script type="text/ng-template" id="wgn-multi-config-input-monkey">
	@TODO some magic here
</script>
```

All internal field types have been defined this way so please refer to the [source code](src/input.service.js) for some working examples.
