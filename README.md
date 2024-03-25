# Sort Everything

This VS Code extension sorts JSON, YAML, and plain text files. It can sort the selected lines of code or the entire file (if no lines are selected).

![Show sorting](https://raw.githubusercontent.com/bennycode/sort-everything/main/assets/sort-everything.gif)

## Installation

Open the [extensions' marketplace site][1] and click "Install".

Alternative:

1. Start Visual Studio Code
1. Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> to [browse for extensions](https://code.visualstudio.com/docs/editor/extension-marketplace#_browse-for-extensions)
1. Search for `bennycode.sort-everything`
1. Select the "Sort Everything" extension and click on "Install"

## Usage

By default, sorting is applied when using the shortcut <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd>.

You can change the keybinding in your [Keyboard Shortcuts editor](https://code.visualstudio.com/docs/getstarted/keybindings#_keyboard-shortcuts-editor):

![Keyboard Shortcuts](https://raw.githubusercontent.com/bennycode/sort-everything/main/assets/keyboard-shortcuts.png)

The Command ID is `bennycode.sort-everything.sortFile`.

## Features

- Sort plain text file
- Sort plain text selection
- Sort JSON file
- Sort JSON selection
- Sort YAML file
- Sort YAML selection

## Release

There is a [publish-extension](.github/workflows/publish-extension.yml) GitHub Action which can be used to publish the extension on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/).

The `VSCE_PAT` [repository secret](https://github.com/bennycode/sort-everything/settings/secrets/actions) need to be updated in case this error message appears:

> Access Denied: The Personal Access Token used has expired.

The Personal Access Token can be renewed [here](https://dev.azure.com/bennycode/_usersSettings/tokens). Make sure the **Marketplace** scope is set to **Manage** ([see here](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)).

[1]: https://marketplace.visualstudio.com/items?itemName=bennycode.sort-everything
