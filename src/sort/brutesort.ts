import type {SortError, SortFunction, SortSuccess} from './SortFunction';

export function brutesort(input: string, algos: SortFunction[]): SortSuccess | SortError | undefined {
  return algos.map(algo => algo(input)).find(result => result.type === 'success');
}
