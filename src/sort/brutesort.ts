import type {SortError, SortFunction, SortSuccess} from './SortFunction';

/**
 * Tries different sorters until one sorting function is found that could successfully sort the input.
 */
export function brutesort(input: string, sorters: SortFunction[]): SortSuccess | SortError | undefined {
  return sorters.map(sort => sort(input)).find(result => result.type === 'success');
}
