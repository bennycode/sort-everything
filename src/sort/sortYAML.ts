import {ParsedNode, parseDocument, YAMLMap, YAMLSeq} from 'yaml';
import type {SortFunction} from './SortFunction';

/**
 * Detects the indentation level from a YAML string
 * @param text - The YAML content to analyze
 * @returns The number of spaces used for indentation
 */
function detectIndentation(text: string): number {
  // Find indentation by looking at the first non-empty indented line
  const lines = text.split('\n');
  for (const line of lines) {
    const match = line.match(/^(\s+)\S/);
    if (match && match[1]) {
      return match[1].length;
    }
  }
  return 0; // Default to 0 spaces if no indentation is detected
}

/**
 * Recursively sorts all maps in a YAML document
 * @param node - The node to sort
 */
function sortDeep(node: ParsedNode | null): void {
  if (node instanceof YAMLMap) {
    // Sort map items alphabetically by key
    node.items.sort((itemA, itemB) => (itemA.key < itemB.key ? -1 : itemA.key > itemB.key ? 1 : 0));
    // Recursively sort child nodes
    node.items.forEach(item => sortDeep(item.value));
  } else if (node instanceof YAMLSeq) {
    // Recursively sort items in sequences
    node.items.forEach(item => sortDeep(item));
  }
}

/**
 * Sorts YAML content while preserving comments and indentation
 */
export const sortYAML: SortFunction = function (text: string) {
  try {
    // Get indentation level from the input text
    const indent = detectIndentation(text);

    // Parse the document
    const document = parseDocument(text);
    sortDeep(document.contents);

    // Return sorted document with original indentation
    return {
      payload: document.toString({
        indent: indent,
      }),
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};
