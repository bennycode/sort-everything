import {sortYAML} from './sortYAML';
import assert from 'node:assert';

describe('sortYAML', () => {
  it('preserves comments when sorting YAML input', () => {
    const input = `
variables:
  C_VARIABLE: 'true' # Comment C
  A_VARIABLE: 'true' # Comment A
  B_VARIABLE: 'true' # Comment B
  `;

    const actual = sortYAML(input);
    assert(actual.type === 'success');
    expect(actual.payload).toMatchSnapshot();
  });

  it('sorts YAML input with multiple indentation levels', () => {
    const input = `
services:
    backend:
      environment:
        Z_ENV: value3
        A_ENV: value1
        M_ENV: value2
      image: myimage
`;

    const actual = sortYAML(input);
    assert(actual.type === 'success');

    // Verify the keys are sorted, but not checking exact indentation format
    expect(actual.payload).toContain('A_ENV: value1');
    expect(actual.payload).toContain('M_ENV: value2');
    expect(actual.payload).toContain('Z_ENV: value3');

    // Verify the order is correct (A before M before Z)
    const aPos = actual.payload.indexOf('A_ENV');
    const mPos = actual.payload.indexOf('M_ENV');
    const zPos = actual.payload.indexOf('Z_ENV');
    expect(aPos).toBeLessThan(mPos);
    expect(mPos).toBeLessThan(zPos);
  });

  it('preserves indent level when sorting YAML input', () => {
    const input = `
config:
   firstLevel:
      secondLevel:
         Z_KEY: value3
         A_KEY: value1
         M_KEY: value2
`;

    const actual = sortYAML(input);
    assert(actual.type === 'success');

    // Check if the first line of the sorted output matches the first line of the input
    const inputFirstIndent = input.split('\n').find(line => line.trim().startsWith('firstLevel'));
    const outputFirstIndent = actual.payload.split('\n').find(line => line.trim().startsWith('firstLevel'));

    expect(inputFirstIndent).toBeDefined();
    expect(outputFirstIndent).toBeDefined();

    if (inputFirstIndent && outputFirstIndent) {
      const inputIndent = inputFirstIndent.indexOf('firstLevel');
      const outputIndent = outputFirstIndent.indexOf('firstLevel');
      expect(outputIndent).toBe(inputIndent);
    }

    // Verify keys are sorted correctly
    expect(actual.payload.indexOf('A_KEY')).toBeLessThan(actual.payload.indexOf('M_KEY'));
    expect(actual.payload.indexOf('M_KEY')).toBeLessThan(actual.payload.indexOf('Z_KEY'));
  });
});
