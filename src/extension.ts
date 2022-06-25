import * as vscode from 'vscode';
import {sortFile} from './sortFile';

export function activate(context: vscode.ExtensionContext): void {
  const disposables = [vscode.commands.registerCommand('bennycode.sort-everything.sortFile', sortFile)];

  disposables.forEach(disposable => context.subscriptions.push(disposable));
}
