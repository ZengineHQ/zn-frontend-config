# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="3.6.0"></a>
# 3.6.0 (2018-08-17)


### Bug Fixes

* belongsTo added to form fields when multiple in succession ([8712cb4](https://github.com/ZengineHQ/zn-frontend-config/commit/8712cb4))
* config id not being set when adding a config with multi configs ([7852a75](https://github.com/ZengineHQ/zn-frontend-config/commit/7852a75))
* dropdown value always being set as 'opt.value' ([584e408](https://github.com/ZengineHQ/zn-frontend-config/commit/584e408))
* form input init when not loaded yet ([72048c8](https://github.com/ZengineHQ/zn-frontend-config/commit/72048c8))
* make sure belongsTo is automatically filled correctly ([f55ab8a](https://github.com/ZengineHQ/zn-frontend-config/commit/f55ab8a))
* only call form input init if we dont belong to anyone ([30f5c0e](https://github.com/ZengineHQ/zn-frontend-config/commit/30f5c0e))
* tweak form input throbber display logic ([25cb2ea](https://github.com/ZengineHQ/zn-frontend-config/commit/25cb2ea))
* typo ([5ad53a5](https://github.com/ZengineHQ/zn-frontend-config/commit/5ad53a5))
* wsid not passed to getForms in form input ([59f83a5](https://github.com/ZengineHQ/zn-frontend-config/commit/59f83a5))


### Features

* add new webhook command in settings fluid api ([600ff8b](https://github.com/ZengineHQ/zn-frontend-config/commit/600ff8b))
* create webhook, save id and key and update url to include config id automatically ([878174e](https://github.com/ZengineHQ/zn-frontend-config/commit/878174e))
* do init form input when it belongs to a workspace if that workspace has already been set ([ff26e8b](https://github.com/ZengineHQ/zn-frontend-config/commit/ff26e8b))
* events can no longer modify the config data ([bad37f3](https://github.com/ZengineHQ/zn-frontend-config/commit/bad37f3))
* implement a workspace field and enhance the form field to support belonging to it ([1ad1f32](https://github.com/ZengineHQ/zn-frontend-config/commit/1ad1f32))
* implement forms loading flag ([8dfc649](https://github.com/ZengineHQ/zn-frontend-config/commit/8dfc649))
* initial webhook management in controller ([23c8341](https://github.com/ZengineHQ/zn-frontend-config/commit/23c8341))
* remove ability to pass an object to constructor ([980bda4](https://github.com/ZengineHQ/zn-frontend-config/commit/980bda4))
* rework save events, remove postSave ([a2895c7](https://github.com/ZengineHQ/zn-frontend-config/commit/a2895c7))
* support workspace fields in highlighs ([e5917aa](https://github.com/ZengineHQ/zn-frontend-config/commit/e5917aa))
* update form input template to support belonging to a workspace ([d4711ed](https://github.com/ZengineHQ/zn-frontend-config/commit/d4711ed))


### BREAKING CHANGES

* no external modifications to the config data are allowed anymore
* Passing an optional object to the Config constructor was a hidden feature that was never used and, frankly, is a bad idea beacuse because it removes all of the security in valid configs we have from the fluid api
* The “postSave” event is no longer fired.  The “save” event also behaves differently now, it doesn’t allow the settings to be modified and is called after the save is complete - effectively making it act like the old postSave



<a name="3.5.0"></a>
# 3.5.0 (2018-07-20)


### Bug Fixes

* re-add the postSave event ([943c398](https://github.com/ZengineHQ/zn-frontend-config/commit/943c398))


### Features

* improve error messages to aid debugging config issues ([47b43cc](https://github.com/ZengineHQ/zn-frontend-config/commit/47b43cc))



<a name="3.4.0"></a>
# 3.4.0 (2018-06-28)


### Bug Fixes

* choice input validation fails when no restrict set ([f4710e4](https://github.com/ZengineHQ/zn-frontend-config/commit/f4710e4))
* number and text input placeholders not displaying ([7f4035b](https://github.com/ZengineHQ/zn-frontend-config/commit/7f4035b))


### Code Refactoring

* rename configName back to name ([e13ec8d](https://github.com/ZengineHQ/zn-frontend-config/commit/e13ec8d))


### Features

* disable the enable/disable/delete buttons when they are working ([398c46b](https://github.com/ZengineHQ/zn-frontend-config/commit/398c46b))
* don’t extend config data when enabling/disabling a config ([ef0e924](https://github.com/ZengineHQ/zn-frontend-config/commit/ef0e924))


### BREAKING CHANGES

* when using multi configs the name is now stored in the “name” property instead of the previous “configName”



<a name="3.3.0"></a>
# 3.3.0 (2018-06-21)


### Bug Fixes

* better handling of discarding non multi config changes ([4a30aae](https://github.com/ZengineHQ/zn-frontend-config/commit/4a30aae))



<a name="3.2.0"></a>
# 3.2.0 (2018-06-20)


### Bug Fixes

* choice input options follow required property ([0b8a5ca](https://github.com/ZengineHQ/zn-frontend-config/commit/0b8a5ca))
* regression in exclusivity handling for field and folder inputs ([03523aa](https://github.com/ZengineHQ/zn-frontend-config/commit/03523aa))
* regression on form field init when moving to hooks ([c895d6e](https://github.com/ZengineHQ/zn-frontend-config/commit/c895d6e))
* regression when toggling configs from list ([aa3abaa](https://github.com/ZengineHQ/zn-frontend-config/commit/aa3abaa))


### Code Refactoring

* rename select input to dropdown ([8ca3ac2](https://github.com/ZengineHQ/zn-frontend-config/commit/8ca3ac2))


### Features

* allow multiple callbacks for each event ([2537ddc](https://github.com/ZengineHQ/zn-frontend-config/commit/2537ddc))
* display modal about having to enable config when saving ([75dd2b5](https://github.com/ZengineHQ/zn-frontend-config/commit/75dd2b5))
* theming improvements for highlights in list view ([d9eac82](https://github.com/ZengineHQ/zn-frontend-config/commit/d9eac82))


### BREAKING CHANGES

* The “select” field type no longer exists, please rename usages to “dropdown” instead



<a name="3.1.0"></a>
# 3.1.0 (2018-06-20)


### Bug Fixes

* check if events return data before trying to merge ([916f3fe](https://github.com/ZengineHQ/zn-frontend-config/commit/916f3fe))
* remove files added by mistake ([298ad51](https://github.com/ZengineHQ/zn-frontend-config/commit/298ad51))
* send a copy of the deleted config in the deleted event ([814bdb4](https://github.com/ZengineHQ/zn-frontend-config/commit/814bdb4))


### Features

* default exclusive to true for all inputs that support it ([29dd446](https://github.com/ZengineHQ/zn-frontend-config/commit/29dd446))
* respect field, folder and choice input exclusivity in input options ([9c5cbc9](https://github.com/ZengineHQ/zn-frontend-config/commit/9c5cbc9))
* respect form input exclusivity in input options ([9140bc0](https://github.com/ZengineHQ/zn-frontend-config/commit/9140bc0))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-config/commit/3ff0646))



<a name="3.5.0"></a>
# 3.5.0 (2018-07-20)


### Bug Fixes

* re-add the postSave event ([943c398](https://github.com/ZengineHQ/zn-frontend-config/commit/943c398))


### Features

* improve error messages to aid debugging config issues ([47b43cc](https://github.com/ZengineHQ/zn-frontend-config/commit/47b43cc))



<a name="3.4.0"></a>
# 3.4.0 (2018-06-28)


### Bug Fixes

* choice input validation fails when no restrict set ([f4710e4](https://github.com/ZengineHQ/zn-frontend-config/commit/f4710e4))
* number and text input placeholders not displaying ([7f4035b](https://github.com/ZengineHQ/zn-frontend-config/commit/7f4035b))


### Code Refactoring

* rename configName back to name ([e13ec8d](https://github.com/ZengineHQ/zn-frontend-config/commit/e13ec8d))


### Features

* disable the enable/disable/delete buttons when they are working ([398c46b](https://github.com/ZengineHQ/zn-frontend-config/commit/398c46b))
* don’t extend config data when enabling/disabling a config ([ef0e924](https://github.com/ZengineHQ/zn-frontend-config/commit/ef0e924))


### BREAKING CHANGES

* when using multi configs the name is now stored in the “name” property instead of the previous “configName”



<a name="3.3.0"></a>
# 3.3.0 (2018-06-21)


### Bug Fixes

* better handling of discarding non multi config changes ([4a30aae](https://github.com/ZengineHQ/zn-frontend-config/commit/4a30aae))



<a name="3.2.0"></a>
# 3.2.0 (2018-06-20)


### Bug Fixes

* choice input options follow required property ([0b8a5ca](https://github.com/ZengineHQ/zn-frontend-config/commit/0b8a5ca))
* regression in exclusivity handling for field and folder inputs ([03523aa](https://github.com/ZengineHQ/zn-frontend-config/commit/03523aa))
* regression on form field init when moving to hooks ([c895d6e](https://github.com/ZengineHQ/zn-frontend-config/commit/c895d6e))
* regression when toggling configs from list ([aa3abaa](https://github.com/ZengineHQ/zn-frontend-config/commit/aa3abaa))


### Code Refactoring

* rename select input to dropdown ([8ca3ac2](https://github.com/ZengineHQ/zn-frontend-config/commit/8ca3ac2))


### Features

* allow multiple callbacks for each event ([2537ddc](https://github.com/ZengineHQ/zn-frontend-config/commit/2537ddc))
* display modal about having to enable config when saving ([75dd2b5](https://github.com/ZengineHQ/zn-frontend-config/commit/75dd2b5))
* theming improvements for highlights in list view ([d9eac82](https://github.com/ZengineHQ/zn-frontend-config/commit/d9eac82))


### BREAKING CHANGES

* The “select” field type no longer exists, please rename usages to “dropdown” instead



<a name="3.1.0"></a>
# 3.1.0 (2018-06-20)


### Bug Fixes

* check if events return data before trying to merge ([916f3fe](https://github.com/ZengineHQ/zn-frontend-config/commit/916f3fe))
* remove files added by mistake ([298ad51](https://github.com/ZengineHQ/zn-frontend-config/commit/298ad51))
* send a copy of the deleted config in the deleted event ([814bdb4](https://github.com/ZengineHQ/zn-frontend-config/commit/814bdb4))


### Features

* default exclusive to true for all inputs that support it ([29dd446](https://github.com/ZengineHQ/zn-frontend-config/commit/29dd446))
* respect field, folder and choice input exclusivity in input options ([9c5cbc9](https://github.com/ZengineHQ/zn-frontend-config/commit/9c5cbc9))
* respect form input exclusivity in input options ([9140bc0](https://github.com/ZengineHQ/zn-frontend-config/commit/9140bc0))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-config/commit/3ff0646))



<a name="3.4.0"></a>
# 3.4.0 (2018-06-28)


### Bug Fixes

* choice input validation fails when no restrict set ([f4710e4](https://github.com/ZengineHQ/zn-frontend-config/commit/f4710e4))
* number and text input placeholders not displaying ([7f4035b](https://github.com/ZengineHQ/zn-frontend-config/commit/7f4035b))


### Code Refactoring

* rename configName back to name ([e13ec8d](https://github.com/ZengineHQ/zn-frontend-config/commit/e13ec8d))


### Features

* disable the enable/disable/delete buttons when they are working ([398c46b](https://github.com/ZengineHQ/zn-frontend-config/commit/398c46b))
* don’t extend config data when enabling/disabling a config ([ef0e924](https://github.com/ZengineHQ/zn-frontend-config/commit/ef0e924))


### BREAKING CHANGES

* when using multi configs the name is now stored in the “name” property instead of the previous “configName”



<a name="3.3.0"></a>
# 3.3.0 (2018-06-21)


### Bug Fixes

* better handling of discarding non multi config changes ([4a30aae](https://github.com/ZengineHQ/zn-frontend-config/commit/4a30aae))



<a name="3.2.0"></a>
# 3.2.0 (2018-06-20)


### Bug Fixes

* choice input options follow required property ([0b8a5ca](https://github.com/ZengineHQ/zn-frontend-config/commit/0b8a5ca))
* regression in exclusivity handling for field and folder inputs ([03523aa](https://github.com/ZengineHQ/zn-frontend-config/commit/03523aa))
* regression on form field init when moving to hooks ([c895d6e](https://github.com/ZengineHQ/zn-frontend-config/commit/c895d6e))
* regression when toggling configs from list ([aa3abaa](https://github.com/ZengineHQ/zn-frontend-config/commit/aa3abaa))


### Code Refactoring

* rename select input to dropdown ([8ca3ac2](https://github.com/ZengineHQ/zn-frontend-config/commit/8ca3ac2))


### Features

* allow multiple callbacks for each event ([2537ddc](https://github.com/ZengineHQ/zn-frontend-config/commit/2537ddc))
* display modal about having to enable config when saving ([75dd2b5](https://github.com/ZengineHQ/zn-frontend-config/commit/75dd2b5))
* theming improvements for highlights in list view ([d9eac82](https://github.com/ZengineHQ/zn-frontend-config/commit/d9eac82))


### BREAKING CHANGES

* The “select” field type no longer exists, please rename usages to “dropdown” instead



<a name="3.1.0"></a>
# 3.1.0 (2018-06-20)


### Bug Fixes

* check if events return data before trying to merge ([916f3fe](https://github.com/ZengineHQ/zn-frontend-config/commit/916f3fe))
* remove files added by mistake ([298ad51](https://github.com/ZengineHQ/zn-frontend-config/commit/298ad51))
* send a copy of the deleted config in the deleted event ([814bdb4](https://github.com/ZengineHQ/zn-frontend-config/commit/814bdb4))


### Features

* default exclusive to true for all inputs that support it ([29dd446](https://github.com/ZengineHQ/zn-frontend-config/commit/29dd446))
* respect field, folder and choice input exclusivity in input options ([9c5cbc9](https://github.com/ZengineHQ/zn-frontend-config/commit/9c5cbc9))
* respect form input exclusivity in input options ([9140bc0](https://github.com/ZengineHQ/zn-frontend-config/commit/9140bc0))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-config/commit/3ff0646))



<a name="3.3.0"></a>
# 3.3.0 (2018-06-21)


### Bug Fixes

* better handling of discarding non multi config changes ([4a30aae](https://github.com/ZengineHQ/zn-frontend-config/commit/4a30aae))



<a name="3.2.0"></a>
# 3.2.0 (2018-06-20)


### Bug Fixes

* choice input options follow required property ([0b8a5ca](https://github.com/ZengineHQ/zn-frontend-config/commit/0b8a5ca))
* regression in exclusivity handling for field and folder inputs ([03523aa](https://github.com/ZengineHQ/zn-frontend-config/commit/03523aa))
* regression on form field init when moving to hooks ([c895d6e](https://github.com/ZengineHQ/zn-frontend-config/commit/c895d6e))
* regression when toggling configs from list ([aa3abaa](https://github.com/ZengineHQ/zn-frontend-config/commit/aa3abaa))


### Code Refactoring

* rename select input to dropdown ([8ca3ac2](https://github.com/ZengineHQ/zn-frontend-config/commit/8ca3ac2))


### Features

* allow multiple callbacks for each event ([2537ddc](https://github.com/ZengineHQ/zn-frontend-config/commit/2537ddc))
* display modal about having to enable config when saving ([75dd2b5](https://github.com/ZengineHQ/zn-frontend-config/commit/75dd2b5))
* theming improvements for highlights in list view ([d9eac82](https://github.com/ZengineHQ/zn-frontend-config/commit/d9eac82))


### BREAKING CHANGES

* The “select” field type no longer exists, please rename usages to “dropdown” instead



<a name="3.1.0"></a>
# 3.1.0 (2018-06-20)


### Bug Fixes

* check if events return data before trying to merge ([916f3fe](https://github.com/ZengineHQ/zn-frontend-config/commit/916f3fe))
* remove files added by mistake ([298ad51](https://github.com/ZengineHQ/zn-frontend-config/commit/298ad51))
* send a copy of the deleted config in the deleted event ([814bdb4](https://github.com/ZengineHQ/zn-frontend-config/commit/814bdb4))


### Features

* default exclusive to true for all inputs that support it ([29dd446](https://github.com/ZengineHQ/zn-frontend-config/commit/29dd446))
* respect field, folder and choice input exclusivity in input options ([9c5cbc9](https://github.com/ZengineHQ/zn-frontend-config/commit/9c5cbc9))
* respect form input exclusivity in input options ([9140bc0](https://github.com/ZengineHQ/zn-frontend-config/commit/9140bc0))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-config/commit/3ff0646))



<a name="3.2.0"></a>
# 3.2.0 (2018-06-20)


### Bug Fixes

* choice input options follow required property ([494bee1](https://github.com/ZengineHQ/zn-frontend-config/commit/494bee1))
* regression in exclusivity handling for field and folder inputs ([24b9738](https://github.com/ZengineHQ/zn-frontend-config/commit/24b9738))
* regression on form field init when moving to hooks ([b042656](https://github.com/ZengineHQ/zn-frontend-config/commit/b042656))
* regression when toggling configs from list ([1837d64](https://github.com/ZengineHQ/zn-frontend-config/commit/1837d64))


### Code Refactoring

* rename select input to dropdown ([71010e7](https://github.com/ZengineHQ/zn-frontend-config/commit/71010e7))


### Features

* allow multiple callbacks for each event ([acbf306](https://github.com/ZengineHQ/zn-frontend-config/commit/acbf306))
* display modal about having to enable config when saving ([65e36fc](https://github.com/ZengineHQ/zn-frontend-config/commit/65e36fc))
* theming improvements for highlights in list view ([5215e0a](https://github.com/ZengineHQ/zn-frontend-config/commit/5215e0a))


### BREAKING CHANGES

* The “select” field type no longer exists, please rename usages to “dropdown” instead



<a name="3.1.0"></a>
# 3.1.0 (2018-06-20)


### Bug Fixes

* check if events return data before trying to merge ([916f3fe](https://github.com/ZengineHQ/zn-frontend-config/commit/916f3fe))
* remove files added by mistake ([298ad51](https://github.com/ZengineHQ/zn-frontend-config/commit/298ad51))
* send a copy of the deleted config in the deleted event ([814bdb4](https://github.com/ZengineHQ/zn-frontend-config/commit/814bdb4))


### Features

* default exclusive to true for all inputs that support it ([29dd446](https://github.com/ZengineHQ/zn-frontend-config/commit/29dd446))
* respect field, folder and choice input exclusivity in input options ([9c5cbc9](https://github.com/ZengineHQ/zn-frontend-config/commit/9c5cbc9))
* respect form input exclusivity in input options ([9140bc0](https://github.com/ZengineHQ/zn-frontend-config/commit/9140bc0))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-config/commit/3ff0646))



<a name="3.1.0"></a>
# 3.1.0 (2018-06-20)


### Bug Fixes

* check if events return data before trying to merge ([916f3fe](https://github.com/ZengineHQ/zn-frontend-config/commit/916f3fe))
* remove files added by mistake ([298ad51](https://github.com/ZengineHQ/zn-frontend-config/commit/298ad51))
* send a copy of the deleted config in the deleted event ([814bdb4](https://github.com/ZengineHQ/zn-frontend-config/commit/814bdb4))


### Features

* default exclusive to true for all inputs that support it ([29dd446](https://github.com/ZengineHQ/zn-frontend-config/commit/29dd446))
* respect field, folder and choice input exclusivity in input options ([9c5cbc9](https://github.com/ZengineHQ/zn-frontend-config/commit/9c5cbc9))
* respect form input exclusivity in input options ([9140bc0](https://github.com/ZengineHQ/zn-frontend-config/commit/9140bc0))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-config/commit/3ff0646))



<a name="3.0.1"></a>
## 3.0.1 (2018-06-19)


### Bug Fixes

* remove files added by mistake ([298ad51](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/298ad51))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3ff0646))



<a name="3.0.0"></a>
# 3.0.0 (2018-06-19)


### Bug Fixes

* chaining killed ([a83a487](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a83a487))
* forms inputs now properly exclude forms used in other inputs ([1046e25](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1046e25))
* input throbbers not respecting input visibility ([e1d9791](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e1d9791))
* make required error message only show if an input is dirty ([c46b083](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c46b083))
* typo in field validation ([acb666c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/acb666c))


### Code Refactoring

* config name key changed to _name ([0719bba](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/0719bba))
* use “configName” as config name because underscore prefixes arent allowed in angularFire ([aa74366](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/aa74366))


### Features

* add settings validation for field types ([c242c46](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c242c46))
* allow add, edit, enable, disable hooks to modify the configuration object ([d43cdff](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d43cdff))
* allow any values for field restrict inputs ([7b16446](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/7b16446))
* allow the preSave hook to alter the data being saved ([17738cc](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/17738cc))
* always show config disabled button ([08e03fd](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/08e03fd))
* better automatic page id generation ([e74e950](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e74e950))
* combine the “preSave” and “postSave” events into a single (pre) “save” one ([32685f0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/32685f0))
* disable create config button when editing a config ([6519082](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6519082))
* disable dependent inputs when no value set for their belongsTo ([52b12d4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/52b12d4))
* disable save button when form saving ([8a4c046](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/8a4c046))
* get rid of enabled banner for non-toggleable configs ([00506d2](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/00506d2))
* implement a folder picker field ([2cbea57](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/2cbea57))
* implement back button when editing a config ([ed1c399](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ed1c399))
* implement choice input type ([d7a3b6a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d7a3b6a))
* implement css-only toggle functionality for card details ([52a8c9a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/52a8c9a))
* implement dynamic field types ([ef5b9d5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ef5b9d5))
* implement fluid api for config setup and field definitions ([b730304](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/b730304))
* implement frontend for configh highlights ([63cb6e4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/63cb6e4))
* implement full enable/disable functionality for status toggle ([3cc86e9](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3cc86e9))
* implement highlighted support for field and choice inputs ([5beb812](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/5beb812))
* implement highlighted support for folder inputs ([74a5b13](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/74a5b13))
* implement list/grid switcher ([59d4b05](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/59d4b05))
* implement removing used fields from choice input options ([2662b2d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/2662b2d))
* implement removing used folders from folder input options ([1e35fa0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1e35fa0))
* implement simple hook mechanism ([df390dc](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/df390dc))
* improve error messaging for validator ([31d1142](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/31d1142))
* initial highlighted fields implementation ([d581221](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d581221))
* initial implementation of field types as directives ([f7746d0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f7746d0))
* list grid switcher theming enhancements ([42ca86d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/42ca86d))
* make saving a config close it and go back to the home page ([74eeecf](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/74eeecf))
* more selective css transitions ([fbc3f59](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/fbc3f59))
* remove floating buttons ([a5fbfe4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a5fbfe4))
* remove icons from top action buttons ([e65859a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e65859a))
* replace events with hooks in implementation ([d35dc73](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d35dc73))
* replace readme with github wiki ([ae0c0a0](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ae0c0a0))
* rework settings form markup so the bottom actions appear outside of the section ([8c827a5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/8c827a5))
* support multiple piped values for restrict options ([ba3fc00](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/ba3fc00))
* theming improvements ([e41f317](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e41f317))


### BREAKING CHANGES

* configs no longer have a “_name” key and instead now have a “configName” one (yeah… i know…)
* configs no longer have a “name” key and instead now have a “_name” one



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3ff0646))



<a name="2.4.0"></a>
# 2.4.0 (2018-06-12)


### Features

* add a visual loading indicator when a field input is disabled because its parent form is loading ([4b5a6d4](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4b5a6d4))
* disable field inputs when parent form data is being loaded ([d7fdd74](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d7fdd74))
* improve theming of form level required fields warning ([a61a62a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a61a62a))
* improve typography on card titles ([79106d5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/79106d5))


### Reverts

* refactor: rework how forms are fetched ([a89f438](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a89f438))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3ff0646))



<a name="2.3.0"></a>
# 2.3.0 (2018-06-11)


### Bug Fixes

* config card bottom margin ([b11c5c1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/b11c5c1))
* config card layout when breaking lines ([d987ecb](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d987ecb))


### Features

* add “enabled” status when not toggleable for better ui ([f5b58f1](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f5b58f1))
* add theming for form input validation state ([608da00](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/608da00))
* don’t close settings when saving ([902a424](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/902a424))
* form-level error message when required fields missing ([e1da6f3](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e1da6f3))
* improve default settings ([772e627](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/772e627))
* move form-level required fields message to floating actions ([01fc919](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/01fc919))
* show error message beneath each required field ([93a217d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/93a217d))
* theming improvements ([83d9df8](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/83d9df8))
* thorough settings validation to prevent runtime issues ([60b4784](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/60b4784))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3ff0646))



<a name="2.2.0"></a>
# 2.2.0 (2018-06-08)


### Bug Fixes

* close button not appearing consistently ([f8869f5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f8869f5))
* create button config appearing before loading done ([6769e7c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6769e7c))
* show enable/disable config according to setting ([6aa21df](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/6aa21df))


### Features

* add help text ([0c1aa51](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/0c1aa51))
* add mit license ([096e2fe](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/096e2fe))
* finalize theming ([33006b5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/33006b5))
* first stab at fixed close and save buttons ([c59a8a5](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/c59a8a5))
* improve no configs experience ([1964fdd](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/1964fdd))
* initial card display ui for config list ([d24559f](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d24559f))
* minify compiled css ([43f1cd2](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/43f1cd2))
* more ui followups from Paul H ([3430704](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3430704))
* move add button to the top ([44e5b96](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/44e5b96))
* rework form buttons ([e635123](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/e635123))
* validate required settings and set default icon and help text ([a2bc91c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/a2bc91c))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/80f3356))
* typo ([7dba12d](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f65c027))
* entry script ([f41213b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/ZengineHQ/zn-frontend-multi-config/commit/3ff0646))



<a name="2.1.0"></a>
# 2.1.0 (2018-06-05)


### Bug Fixes

* config enable/disable toggle ([061ec8a](https://github.com/Wizehive/zn-frontend-multi-config/commit/061ec8a))
* enable/disable config button visibility ([d2771b9](https://github.com/Wizehive/zn-frontend-multi-config/commit/d2771b9))
* pass configs in initialization event ([80f3356](https://github.com/Wizehive/zn-frontend-multi-config/commit/80f3356))
* typo ([7dba12d](https://github.com/Wizehive/zn-frontend-multi-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/Wizehive/zn-frontend-multi-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/Wizehive/zn-frontend-multi-config/commit/dc7c71c))
* add save config method to main controller ([4708132](https://github.com/Wizehive/zn-frontend-multi-config/commit/4708132))
* disable save button if form not dirty ([f65c027](https://github.com/Wizehive/zn-frontend-multi-config/commit/f65c027))
* entry script ([f41213b](https://github.com/Wizehive/zn-frontend-multi-config/commit/f41213b))
* implement enable/disable functionality for configs ([37f10d7](https://github.com/Wizehive/zn-frontend-multi-config/commit/37f10d7))
* implement form builder functionality ([490e32a](https://github.com/Wizehive/zn-frontend-multi-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/Wizehive/zn-frontend-multi-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/Wizehive/zn-frontend-multi-config/commit/70495be))
* use sass for styles and add script to compile to css ([761ed58](https://github.com/Wizehive/zn-frontend-multi-config/commit/761ed58))


### Reverts

* style: fix linting errors ([3ff0646](https://github.com/Wizehive/zn-frontend-multi-config/commit/3ff0646))



<a name="1.1.0"></a>
# 1.1.0 (2018-06-01)


### Bug Fixes

* pass configs in initialization event ([80f3356](https://github.com/Wizehive/zn-frontend-multi-config/commit/80f3356))
* typo ([7dba12d](https://github.com/Wizehive/zn-frontend-multi-config/commit/7dba12d))
* use an object fo editing config ([25b6c02](https://github.com/Wizehive/zn-frontend-multi-config/commit/25b6c02))


### Features

* add a close button ([dc7c71c](https://github.com/Wizehive/zn-frontend-multi-config/commit/dc7c71c))
* entry script ([f41213b](https://github.com/Wizehive/zn-frontend-multi-config/commit/f41213b))
* implement form builder functionality ([490e32a](https://github.com/Wizehive/zn-frontend-multi-config/commit/490e32a))
* initial tentative implementation ([73da44b](https://github.com/Wizehive/zn-frontend-multi-config/commit/73da44b))
* initial working implementation ([70495be](https://github.com/Wizehive/zn-frontend-multi-config/commit/70495be))

<a name="1.0.0"></a>
# 1.0.0 (2018-06-01)

Initial release!
