# zn-frontend-config

> Helper module for implementing Zengine plugin configuration forms.

## Highlights

- Powerful form builder
- Multi-page forms
- Multiple configurations
- Toggling configurations on and off
- Automated webhook management
- Highly extensible via _events_ and _custom field types_   

![Config Module](https://github.com/ZengineHQ/zn-frontend-config/blob/master/screenshots/view-grid.png)

## Installation

```shell
npm i @zenginehq/frontend-config --save
```

Note: when using the soon-to-be-deprecated legacy maya, it's crucial that this gets run inside the `plugins/myplugin/src` directory alongside your plugin's other code to get built properly.

If, however, you are using the shiny new [mayan](https://github.com/ZengineHQ/mayan) then you can just run the install from your frontend plugin's root `plugins/myplugin`, as you'd expect!

## Updating

In order to update this module to a newer version run:

```shell
npm i @zenginehq/frontend-config@latest --save
```

### Usage ###

Please refer to the [Wiki](https://github.com/ZengineHQ/zn-frontend-config/wiki) for detailed documentation.

## Releasing

This uses release-it to do releases. It will handle creating the release tag, updating the README and creating the github and npm releases.

To do a dry run:

    npx release-it -d

To do the real thing:

    npx release-it

