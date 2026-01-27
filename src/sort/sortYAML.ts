import {ParsedNode, parseDocument, ToStringOptions, YAMLMap, YAMLSeq} from 'yaml';
import type {SortFunction} from './SortFunction';
import {StringUtil} from '../util/StringUtil';

function sortDeep(node: ParsedNode | null) {
  if (node instanceof YAMLMap) {
    node.items.sort((itemA, itemB) => (itemA.key < itemB.key ? -1 : itemA.key > itemB.key ? 1 : 0));
    node.items.forEach(item => sortDeep(item.value));
  } else if (node instanceof YAMLSeq) {
    // Check if all items in the sequence are YAMLMaps with a "key" field
    // Combine type check and key field detection in a single pass
    const allItemsAreMapsWithKey = node.items.every(item => {
      return item instanceof YAMLMap && item.items.some(pair => pair.key?.toString() === 'key');
    });

    // Check if all items are YAMLSeqs where the first element is a YAMLMap with a "key" field
    const allItemsAreSeqsWithKeyInFirst = node.items.every(item => {
      if (item instanceof YAMLSeq && item.items.length > 0) {
        const firstItem = item.items[0];
        return firstItem instanceof YAMLMap && firstItem.items.some(pair => pair.key?.toString() === 'key');
      }
      return false;
    });

    // If all items have a "key" field, sort by the value of that field
    if (allItemsAreMapsWithKey) {
      node.items.sort((itemA, itemB) => {
        // Type guard: we've verified these are YAMLMaps
        if (!(itemA instanceof YAMLMap && itemB instanceof YAMLMap)) {
          return 0;
        }

        const keyPairA = itemA.items.find(pair => pair.key?.toString() === 'key');
        const keyPairB = itemB.items.find(pair => pair.key?.toString() === 'key');

        const valueA = keyPairA?.value?.toString() ?? '';
        const valueB = keyPairB?.value?.toString() ?? '';

        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      });
    }
    // If all items are sequences with a leading element that has a "key" field, sort by that
    else if (allItemsAreSeqsWithKeyInFirst) {
      node.items.sort((itemA, itemB) => {
        // Type guard: we've verified these are YAMLSeqs
        if (!(itemA instanceof YAMLSeq && itemB instanceof YAMLSeq)) {
          return 0;
        }

        const firstMapA = itemA.items[0] as YAMLMap;
        const firstMapB = itemB.items[0] as YAMLMap;

        const keyPairA = firstMapA.items.find(pair => pair.key?.toString() === 'key');
        const keyPairB = firstMapB.items.find(pair => pair.key?.toString() === 'key');

        const valueA = keyPairA?.value?.toString() ?? '';
        const valueB = keyPairB?.value?.toString() ?? '';

        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      });
    }

    // Continue sorting nested structures
    node.items.forEach(item => sortDeep(item));
  }
}

export const sortYAML: SortFunction = function (text: string) {
  try {
    const document = parseDocument(text);
    const indent = StringUtil.countLeadingWhitespaces(text);
    sortDeep(document.contents);
    const endsWithNewline = StringUtil.endsWithNewline(text);
    const options: ToStringOptions = {
      lineWidth: 0,
    };
    const sortedText = endsWithNewline ? document.toString(options) : document.toString(options).trimEnd();

    return {
      payload: StringUtil.applyIndent(sortedText, indent),
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};
