// This is an example settings controller containing a lot of options.
plugin.controller('wgnSettingsCtrl', ['$scope', function ($scope) {

	/**
	 * Describe plugin settings.
	 *
	 * @type {Object}
	 */
	$scope.configSettings = {
		title: 'My Awesome Settings',
		icon: 'star',
		multi: true,
		pages: [
			{
				id: 'target',
				name: 'Target Form',
				fields: [
					{
						id: 'formTarget',
						name: 'Target Form',
						help: 'The form which contains the data to check.',
						required: true,
						type: 'form'
					},
					{
						id: 'fieldTargetId',
						name: 'Target Field',
						help: 'The field which contains the specific data to check.',
						required: true,
						type: 'field',
						belongsTo: 'formTarget',
						restrict: 'text-input'
					}
				]
			},
			{
				id: 'logging',
				name: 'Logging Form',
				fields: [
					{
						id: 'formLogging',
						name: 'Logging Form',
						help: 'The form to log results to.',
						required: true,
						type: 'form'
					},
					{
						id: 'fieldLoggingId',
						name: 'Target Field',
						help: 'The field to log the lookup target to.',
						required: true,
						type: 'field',
						belongsTo: 'formLogging',
						restrict: 'linked'
					},
					{
						id: 'fieldLoggingRulingDate',
						name: 'Ruling Date Field',
						help: 'The field to log the ruling date to.',
						required: true,
						type: 'field',
						belongsTo: 'formLogging',
						restrict: 'date-picker'
					},
					{
						id: 'fieldLoggingPub78',
						name: 'Pub 78 Field',
						help: 'The field to log the pub 78 value to.',
						required: true,
						type: 'field',
						belongsTo: 'formLogging',
						restrict: 'text-input'
					},
					{
						id: 'fieldLoggingLookupDate',
						name: 'Lookup Date Field',
						help: 'The field to log the lookup date to.',
						required: true,
						type: 'field',
						belongsTo: 'formLogging',
						restrict: 'date-picker'
					},
					{
						id: 'fieldLoggingSubsectionDesc',
						name: 'Subsection Description Field',
						help: 'The field to log the subsection description to.',
						required: true,
						type: 'field',
						belongsTo: 'formLogging',
						restrict: 'text-area'
					},
					{
						id: 'fieldLogging509a',
						name: '509a Status Field',
						help: 'The field to log the 509a status to.',
						required: true,
						type: 'field',
						belongsTo: 'formLogging',
						restrict: 'text-input'
					}
				]
			},
			{
				id: 'test',
				name: 'Test Form',
				fields: [
					{
						id: 'testFieldText',
						name: 'Test text field',
						help: 'bla',
						required: false,
						type: 'text',
						placeholder: 'this is a placeholder',
					},
					{
						id: 'testFieldNumber',
						name: 'Test number field',
						help: 'bla',
						required: false,
						type: 'number',
						placeholder: 'this is a placeholder',
					},
					{
						type: 'markup',
						value: '<p>hello</p><h1>title</h1>'
					},
					{
						id: 'testFieldArea',
						name: 'Test text area field',
						help: 'bla',
						required: false,
						type: 'textarea',
					},
					{
						id: 'testFieldSelect',
						name: 'Test select field',
						help: 'bla',
						required: false,
						type: 'select',
						options: [
							{
								value: 'off',
								label: 'Off'
							},
							{
								value: 'on',
								label: 'On'
							}
						]
					}
				]
			}
		]
	};
}]);
