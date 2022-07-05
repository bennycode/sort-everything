import type {SortFunction} from './SortFunction';
import {sortJSONOrPlainText} from './sortJSONOrPlainText';
import {sortPlaintext} from './sortPlaintext';
import {sortYAML} from './sortYAML';

export const Sorter: {[languageId: string]: SortFunction} = {
  json: sortJSONOrPlainText,
  jsonc: sortJSONOrPlainText,
  plaintext: sortPlaintext,
  yaml: sortYAML,
};

export function getSorter(languageId: string): SortFunction {
  return Sorter[languageId] ?? sortJSONOrPlainText;
}
