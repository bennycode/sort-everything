import vscode from 'vscode';
import {Ranger, Reader, Replacer} from '../editor';
import {getSorter} from './Sorter';
import {StringUtil} from '../util/StringUtil';

export async function sortFile() {
  const textEditor = vscode.window.activeTextEditor;

  if (!textEditor) {
    return;
  }

  const {languageId} = textEditor.document;
  const sorter = getSorter(languageId);

  try {
    const range = Ranger.getSelectedRange(textEditor);
    const unsorted = Reader.getText(textEditor, range);
    const sorted = sorter(unsorted);
    if (sorted.type === 'success') {
      const shouldTrim = StringUtil.endsWithNewline(unsorted);
      const replacement = shouldTrim ? sorted.payload.trimEnd() : sorted.payload;
      await Replacer.replaceSelectedText(textEditor, range, replacement);
    } else {
      throw sorted.error;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      await vscode.window.showWarningMessage(`Failed to sort "${languageId}": ${error.message}`);
    }
  }
}
