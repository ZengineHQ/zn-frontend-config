plugin.controller('wgnSettingsCtrl', ['$scope', function ($scope) {

	/**
	 * Describe plugin settings.
	 *
	 * @type {Object}
	 */
	$scope.configSettings = {
		title: 'Guidestar Charity Check Settings',
		icon: 'star',
		multi: true,
		pages: [
			{
				id: 'target',
				name: 'Target Form',
				fields: [
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
			},
			{
				id: 'logging',
				name: 'Logging Form',
				fields: [
					{
						id: 'loggingFormId',
						name: 'Logging Form',
						help: 'The form to log results to.',
						required: true,
						type: 'form'
					},
					{
						id: 'loggingFieldEin',
						name: 'Target Field',
						help: 'The field to log the lookup target to.',
						required: true,
						type: 'field',
						belongsTo: 'loggingFormId',
						restrict: 'linked'
					},
					{
						id: 'loggingFieldRulingDate',
						name: 'Ruling Date Field',
						help: 'The field to log the ruling date to.',
						required: true,
						type: 'field',
						belongsTo: 'loggingFormId',
						restrict: 'date-picker'
					},
					{
						id: 'loggingFieldPub78',
						name: 'Pub 78 Field',
						help: 'The field to log the pub 78 value to.',
						required: true,
						type: 'field',
						belongsTo: 'loggingFormId',
						restrict: 'text-input'
					},
					{
						id: 'loggingFieldLookupDate',
						name: 'Lookup Date Field',
						help: 'The field to log the lookup date to.',
						required: true,
						type: 'field',
						belongsTo: 'loggingFormId',
						restrict: 'date-picker'
					},
					{
						id: 'loggingFieldSubsectionDesc',
						name: 'Subsection Description Field',
						help: 'The field to log the subsection description to.',
						required: true,
						type: 'field',
						belongsTo: 'loggingFormId',
						restrict: 'text-area'
					},
					{
						id: 'loggingField509a',
						name: '509a Status Field',
						help: 'The field to log the 509a status to.',
						required: true,
						type: 'field',
						belongsTo: 'loggingFormId',
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
