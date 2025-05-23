import {sortYAML} from './sortYAML';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

describe('sortYAML', () => {
  it('preserves comments when sorting YAML input', () => {
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/sort-comments.yml'), 'utf-8');
    const actual = sortYAML(input);
    assert(actual.type === 'success');
    expect(actual.payload).toMatchSnapshot();
  });

  it('preserves leading whitespace', () => {
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/leading-whitespace.yml'), 'utf-8');
    const actual = sortYAML(input);
    assert(actual.type === 'success');
    expect(actual.payload).toMatchSnapshot();
  });

  it('does not add extra line endings', () => {
    const actual = sortYAML('Hello\nWorld');
    assert(actual.type === 'success');
    console.log(actual.payload);
    expect(actual.payload.endsWith('World')).toBeTruthy();
  });

  it('sorts a list of dictionaries', () => {
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/list-of-dictionaries.yml'), 'utf-8');
    const actual = sortYAML(input);
    assert(actual.type === 'success');
    expect(actual.payload).toMatchSnapshot();
  });

  it('does not enforce a certain line width', () => {
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/line-width.yml'), 'utf-8');
    const actual = sortYAML(input);
    assert(actual.type === 'success');
    expect(actual.payload).toMatchSnapshot();
  });
});
