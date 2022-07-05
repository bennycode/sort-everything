import * as vscode from 'vscode';
import {Ranger, Reader, Replacer} from '../editor';
import {getSorter} from './Sorter';

export function sortFile(): void {
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return undefined;
  }

  const {languageId} = textEditor.document;
  const sorter = getSorter(languageId);

  try {
    const range = Ranger.getSelectedRange(textEditor);
    const unsorted = Reader.getText(textEditor, range);
    const sorted = sorter(unsorted);
    if (sorted.type === 'success') {
      void Replacer.replaceSelectedText(textEditor, range, sorted.payload);
    } else {
      void vscode.window.showWarningMessage(`Failed to sort "${languageId}": ${sorted.error}`);
    }
  } catch (error) {
    void vscode.window.showWarningMessage(`Failed to sort "${languageId}": ${(error as Error).message}`);
  }
}
