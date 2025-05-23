import {ParsedNode, parseDocument, YAMLMap, YAMLSeq} from 'yaml';
import type {SortFunction} from './SortFunction';

function detectIndentation(text: string): number {
  const lines = text.split('\n');
  for (const line of lines) {
    const match = line.match(/^(\s+)\S/);
    if (match && match[1]) {
      return match[1].length;
    }
  }
  return 0;
}

function sortDeep(node: ParsedNode | null) {
  if (node instanceof YAMLMap) {
    node.items.sort((itemA, itemB) => (itemA.key < itemB.key ? -1 : itemA.key > itemB.key ? 1 : 0));
    node.items.forEach(item => sortDeep(item.value));
  } else if (node instanceof YAMLSeq) {
    node.items.forEach(item => sortDeep(item));
  }
}

function applyIndent(text: string, indent: number) {
  const spaces = ' '.repeat(indent);
  let indented = '';
  // Apply indentation to each line (if indent is non-zero)
  if (indent > 0) {
    indented = text
      .split('\n')
      .map(line => (line.length > 0 ? spaces + line : line))
      .join('\n');
  }
  return indented ? indented : text;
}

export const sortYAML: SortFunction = function (text: string) {
  try {
    const document = parseDocument(text);
    const indent = detectIndentation(text);
    sortDeep(document.contents);
    console.log(applyIndent(document.toString(), indent));

    return {
      payload: document.toString(),
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};
