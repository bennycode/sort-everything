import * as vscode from 'vscode';
import {getFullText, replaceText} from '../editor';
import {Sorter} from './Sorter';

export function sortFile(): void {
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return undefined;
  }

  const {languageId} = textEditor.document;

  const sorter = Sorter;
  if (sorter[languageId]) {
    const unsorted = getFullText(textEditor);
    const sorted = sorter[languageId](unsorted);
    if (sorted.type === 'success') {
      replaceText(textEditor, sorted.payload);
    } else {
      void vscode.window.showWarningMessage(`Failed to sort "${languageId}": ${sorted.error}`);
    }
  } else {
    void vscode.window.showWarningMessage(`Sorting "${languageId}" is not supported.`);
  }
}
