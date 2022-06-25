import * as vscode from 'vscode';
import {Range, TextEditor} from 'vscode';

export function replaceText(editor: TextEditor, newText: string): void {
  const textDocument = editor.document;
  const invalidRange = new Range(0, 0, textDocument.lineCount + 1, 0);
  const fullRange = textDocument.validateRange(invalidRange);
  void editor
    .edit(edit => edit.replace(fullRange, newText))
    .then(() => vscode.commands.executeCommand('editor.action.formatDocument'));
}

export function getFullTextRange(textEditor: TextEditor): Range {
  const lastLine = textEditor.document.lineAt(textEditor.document.lineCount - 1);
  const firstLine = textEditor.document.lineAt(0);
  return new Range(firstLine.range.start, lastLine.range.end);
}

export function getFullText(textEditor: TextEditor): string {
  const textRange = getFullTextRange(textEditor);
  return textEditor.document.getText(textRange);
}
