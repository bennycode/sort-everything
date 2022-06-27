import * as vscode from 'vscode';
import {Ranger, Reader, Replacer} from '../editor';
import {Sorter} from './Sorter';

export function sortFile(): void {
  const sorter = Sorter;
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return undefined;
  }

  const {languageId} = textEditor.document;

  if (sorter[languageId]) {
    const range = Ranger.getSelectedRange(textEditor);
    const unsorted = Reader.getText(textEditor, range);
    const sorted = sorter[languageId](unsorted);
    if (sorted.type === 'success') {
      void Replacer.replaceSelectedText(textEditor, range, sorted.payload);
    } else {
      void vscode.window.showWarningMessage(`Failed to sort "${languageId}": ${sorted.error}`);
    }
  } else {
    void vscode.window.showWarningMessage(`Sorting "${languageId}" is not supported.`);
  }
}
