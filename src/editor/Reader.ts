import type {Range, TextEditor} from 'vscode';
import {Ranger} from './Ranger';

export class Reader {
  static getText(editor: TextEditor, range: Range): string {
    return editor.document.getText(range);
  }

  static getFullText(editor: TextEditor): string {
    const range = Ranger.getFullRange(editor);
    return Reader.getText(editor, range);
  }

  static getSelectedText(editor: TextEditor): string {
    const range = Ranger.getSelectedRange(editor);
    return Reader.getText(editor, range);
  }
}
