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

  it('preserves indentation when sorting YAML input with multiple indentation levels', () => {
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
    
    // The output should preserve the 4-space indentation
    expect(actual.payload).toBe(`services:
    backend:
      environment:
        A_ENV: value1
        M_ENV: value2
        Z_ENV: value3
      image: myimage
`);
  });
});
