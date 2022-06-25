import type {SortFunction} from './SortFunction';
import {sortJSON} from './sortJSON';
import {sortText} from './sortText';
import {sortYAML} from './sortYAML';

export const Sorter: {[languageId: string]: SortFunction} = {
  json: sortJSON,
  jsonc: sortJSON,
  plaintext: sortText,
  yaml: sortYAML,
};
