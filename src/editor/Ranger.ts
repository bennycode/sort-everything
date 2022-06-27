import {Range, TextEditor} from 'vscode';

export class Ranger {
  static getFullRange(editor: TextEditor): Range {
    const textDocument = editor.document;
    const invalidRange = new Range(0, 0, textDocument.lineCount + 1, 0);
    return textDocument.validateRange(invalidRange);
  }

  static getSelectedRange(editor: TextEditor): Range {
    const selection = editor.selection;

    if (selection.isSingleLine || selection.isEmpty) {
      return Ranger.getFullRange(editor);
    }

    const startLine = selection.start.line;

    const endLine = selection.end.line;

    return new Range(startLine, 0, endLine, editor.document.lineAt(endLine).text.length);
  }
}
