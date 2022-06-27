import * as vscode from 'vscode';
import type {Range, TextEditor} from 'vscode';
import {Ranger} from './Ranger';

export class Replacer {
  static replaceSelectedText(editor: TextEditor, range: Range, newText: string): Promise<void> {
    return new Promise(resolve => {
      void editor
        .edit(edit => edit.replace(range, newText))
        .then(async () => {
          await vscode.commands.executeCommand('editor.action.formatDocument');
          resolve();
        });
    });
  }

  static replaceFullText(editor: TextEditor, newText: string): Promise<void> {
    const range = Ranger.getFullRange(editor);
    return Replacer.replaceSelectedText(editor, range, newText);
  }
}
