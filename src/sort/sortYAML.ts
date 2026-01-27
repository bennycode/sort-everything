import {ParsedNode, parseDocument, ToStringOptions, YAMLMap, YAMLSeq} from 'yaml';
import type {SortFunction} from './SortFunction';
import {StringUtil} from '../util/StringUtil';

function sortDeep(node: ParsedNode | null) {
  if (node instanceof YAMLMap) {
    node.items.sort((itemA, itemB) => (itemA.key < itemB.key ? -1 : itemA.key > itemB.key ? 1 : 0));
    node.items.forEach(item => sortDeep(item.value));
  } else if (node instanceof YAMLSeq) {
    // Check if all items in the sequence are YAMLMaps with a "key" field
    const allItemsAreMapsWithKey = node.items.every(item => {
      if (item instanceof YAMLMap) {
        return item.items.some(pair => {
          const keyStr = pair.key?.toString() ?? '';
          return keyStr === 'key';
        });
      }
      return false;
    });

    // If all items have a "key" field, sort by the value of that field
    if (allItemsAreMapsWithKey) {
      node.items.sort((itemA, itemB) => {
        const mapA = itemA as YAMLMap;
        const mapB = itemB as YAMLMap;
        const keyPairA = mapA.items.find(pair => pair.key?.toString() === 'key');
        const keyPairB = mapB.items.find(pair => pair.key?.toString() === 'key');

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
