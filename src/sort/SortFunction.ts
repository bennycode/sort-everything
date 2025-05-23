export type SortSuccess = {
  payload: string;
  type: 'success';
};

export type SortError = {
  error: Error;
  type: 'error';
};

export type SortFunction = (input: string) => SortSuccess | SortError;
