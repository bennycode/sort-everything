import * as fs from 'fs';
import * as path from 'path';
import {sortJSON} from './sortJSON';

describe('sortJSON', () => {
  it('should preserve line comments when sorting JSON5', () => {
    // Arrange
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/line-comments.json5'), 'utf-8');

    const expectedOutput = `{
  // ABC
  "abc": "abc",
  // XYZ
  "xyz": "xyz"
}`;

    // Act
    const result = sortJSON(input);

    // Assert
    expect(result.type).toBe('success');
    if (result.type === 'success') {
      expect(result.payload).toBe(expectedOutput);
    }
  });

  it('should preserve single-line block comments when sorting JSON5', () => {
    // Arrange
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/single-line-block-comments.json5'), 'utf-8');

    const expectedOutput = `{
  /* ABC */
  "abc": "abc",
  /* XYZ */
  "xyz": "xyz"
}`;

    // Act
    const result = sortJSON(input);

    // Assert
    expect(result.type).toBe('success');
    if (result.type === 'success') {
      expect(result.payload).toBe(expectedOutput);
    }
  });

  it('should preserve multi-line block comments when sorting JSON5', () => {
    // Arrange
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/multi-line-block-comments.json5'), 'utf-8');

    const expectedOutput = `{
  /*
  * ABC
  * Description
   */
  "abc": "abc",
  /*
  * XYZ
  * Description
   */
  "xyz": "xyz"
}`;

    // Act
    const result = sortJSON(input);

    // Assert
    expect(result.type).toBe('success');
    if (result.type === 'success') {
      const normalizedExpected = expectedOutput.replace(/\s+\*\//g, ' */');
      const normalizedActual = result.payload.replace(/\s+\*\//g, ' */');
      expect(normalizedActual).toBe(normalizedExpected);
    }
  });

  it('should sort JSON without comments correctly', () => {
    // Arrange
    const input = fs.readFileSync(path.join(__dirname, '../test/fixtures/no-comments.json5'), 'utf-8');

    const expectedOutput = `{
  "abc": "abc",
  "xyz": "xyz"
}`;

    // Act
    const result = sortJSON(input);

    // Assert
    expect(result.type).toBe('success');
    if (result.type === 'success') {
      expect(result.payload).toBe(expectedOutput);
    }
  });
});
