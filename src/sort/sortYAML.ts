import {ParsedNode, parseDocument, YAMLMap, YAMLSeq} from 'yaml';
import type {SortFunction} from './SortFunction';

function countLeadingWhitespaces(text: string) {
  const match = text.match(/^\s*/);
  return match ? match[0].length : 0;
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
    const indent = countLeadingWhitespaces(text);
    sortDeep(document.contents);

    return {
      payload: applyIndent(document.toString(), indent),
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};
