import {ParsedNode, parseDocument, YAMLMap, YAMLSeq} from 'yaml';
import type {SortFunction} from './SortFunction';

function sortDeep(node: ParsedNode | null): void {
  if (node instanceof YAMLMap) {
    node.items.sort((itemA, itemB) => (itemA.key < itemB.key ? -1 : itemA.key > itemB.key ? 1 : 0));
    node.items.forEach(item => sortDeep(item.value));
  } else if (node instanceof YAMLSeq) {
    node.items.forEach(item => sortDeep(item));
  }
}

export const sortYAML: SortFunction = function (text: string) {
  try {
    const document = parseDocument(text);
    sortDeep(document.contents);

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
