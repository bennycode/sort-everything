import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import {sortJSON} from './sortJSON';

function readFixture(name: string): string {
  return fs.readFileSync(path.join(__dirname, '../test/fixtures', name), 'utf-8');
}

describe('sortJSON', () => {
  it('sorts object keys', () => {
    const actual = sortJSON('{"xyz": "xyz", "abc": "abc"}');
    assert(actual.type === 'success');
    expect(actual.payload).toBe(`{
  "abc": "abc",
  "xyz": "xyz"
}`);
  });

  it('preserves line comments and keeps them with their property', () => {
    const actual = sortJSON(readFixture('line-comments.json5'));
    assert(actual.type === 'success');
    expect(actual.payload).toBe(`{
  // ABC
  "abc": "abc",
  // XYZ
  "xyz": "xyz"
}`);
  });

  it('preserves block comments and keeps them with their property', () => {
    const actual = sortJSON(readFixture('block-comments.json5'));
    assert(actual.type === 'success');
    expect(actual.payload).toBe(`{
  /* ABC */
  "abc": "abc",
  /* XYZ */
  "xyz": "xyz"
}`);
  });

  it('preserves comments inside nested objects', () => {
    const actual = sortJSON(readFixture('nested-comments.json5'));
    assert(actual.type === 'success');
    expect(actual.payload).toBe(`{
  "active": true,
  // root note
  "server": {
    "host": "localhost",
    // port to bind
    "port": 8080
  }
}`);
  });

  it('reports an error for invalid input', () => {
    const actual = sortJSON('this is not json');
    expect(actual.type).toBe('error');
  });
});
