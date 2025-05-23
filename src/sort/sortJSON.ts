import json5 from 'json5';
import jsonAbc from 'jsonabc';
import type {SortFunction} from './SortFunction';

/**
 * Sorts a JSON5 object while preserving comments.
 *
 * @param input The JSON5 string with comments
 * @returns A sorted JSON5 string with comments preserved
 */
export const sortJSON: SortFunction = function (input: string) {
  try {
    // Extract comments from the input
    const commentsMap = extractCommentsMap(input);

    // Parse and sort the JSON object
    const object = json5.parse(input);
    const sorted = jsonAbc.sortObj(object, true);

    // Generate the sorted JSON string with comments preserved
    const resultWithComments = generateJsonWithComments(sorted, commentsMap);

    return {
      payload: resultWithComments,
      type: 'success',
    };
  } catch (error) {
    return {
      error: error as Error,
      type: 'error',
    };
  }
};

/**
 * Extracts all comments from a JSON5 string and creates a map of property to comment
 * @param input The JSON5 string with comments
 */
function extractCommentsMap(input: string): Map<string, string> {
  const lines = input.split('\n');
  const commentsMap = new Map<string, string>();
  
  for (let i = 0; i < lines.length - 1; i++) {
    const currentLine = lines[i].trim();
    const nextLine = lines[i + 1].trim();
    
    // Check if current line is a comment and next line is a property
    if (currentLine.startsWith('//') && nextLine.startsWith('"')) {
      const propertyName = nextLine.split('"')[1]; // Extract property name
      commentsMap.set(propertyName, currentLine);
    }
  }
  
  return commentsMap;
}

/**
 * Generates a JSON string with comments preserved
 * @param obj The sorted object
 * @param commentsMap Map of property names to comments
 */
function generateJsonWithComments(obj: Record<string, any>, commentsMap: Map<string, string>): string {
  // Convert the sorted object to string format first
  const sortedJson = JSON.stringify(obj, null, 2);
  
  // Now reinsert comments
  const lines = sortedJson.split('\n');
  const result: string[] = ['{'];
  
  // Start from 1 to skip the opening brace line
  for (let i = 1; i < lines.length - 1; i++) {
    const line = lines[i];
    const match = line.match(/"([^"]+)":/);
    
    if (match) {
      const propertyName = match[1];
      const comment = commentsMap.get(propertyName);
      
      if (comment) {
        result.push(`  ${comment}`);
      }
      
      result.push(`  ${line.trim()}`);
    } else {
      result.push(`  ${line.trim()}`);
    }
  }
  
  result.push('}');
  return result.join('\n');
}
