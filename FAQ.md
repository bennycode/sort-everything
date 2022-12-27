## How to run this extension locally?

- Open this repository in VS Code and press "F5" or start it via "Run and Debug"

## How to manually publish this extension?

1. Install the [Visual Studio Code Extension Manager](https://www.npmjs.com/package/@vscode/vsce) (VSCE): `npm install -g @vscode/vsce`
1. Update version number in "package.json" file
1. Run command [`vsce package`](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#usage) inside of repository
1. Upload `*.vsix` file to https://marketplace.visualstudio.com/manage/publishers/bennycode

## How to automatically publish this extension?

1. Create a **Personal Access Token** (PAT) on [Azure DevOps](https://azure.microsoft.com/services/devops/)
2. Register the PAT (it comes with an expiry date) as GitHub Secret (`VSCE_PAT`)
3. Make use of the GitHub workflow trigger
4. Renew the PAT if it expires

## Examples

- https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-test-sample
