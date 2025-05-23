import {ParsedNode, parseDocument, ToStringOptions, YAMLMap, YAMLSeq} from 'yaml';
import type {SortFunction} from './SortFunction';
import {StringUtil} from '../util/StringUtil';

function sortDeep(node: ParsedNode | null) {
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
