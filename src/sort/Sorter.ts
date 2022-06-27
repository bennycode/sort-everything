import type {SortFunction} from './SortFunction';
import {sortJSON} from './sortJSON';
import {sortPlaintext} from './sortPlaintext';
import {sortYAML} from './sortYAML';

export const Sorter: {[languageId: string]: SortFunction} = {
  json: sortJSON,
  jsonc: sortJSON,
  plaintext: sortPlaintext,
  yaml: sortYAML,
};
