import * as vscode from 'vscode';
import {getFullText, replaceText} from './editor';
import {sortJSON} from './sortJSON';

export function sortFile(): void {
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return undefined;
  }

  const {languageId} = textEditor.document;

  switch (languageId) {
    case 'json':
      const unsorted = getFullText(textEditor);
      const sorted = sortJSON(unsorted);
      if (sorted.type === 'success') {
        replaceText(textEditor, sorted.payload);
      } else {
        void vscode.window.showWarningMessage(`Failed to sort JSON file: ${sorted.error}`);
      }
      break;
  }
}
