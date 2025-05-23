import {sortJSON} from './sortJSON';

describe('sortJSON', () => {
  it('should preserve line comments when sorting JSON5', () => {
    // Arrange
    const input = `{
  // XYZ
  "xyz": "xyz",
  // ABC
  "abc": "abc"
}`;

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
    const input = `{
  /* XYZ */
  "xyz": "xyz",
  /* ABC */
  "abc": "abc"
}`;

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
    const input = `{
  /*
   * XYZ
   * Description
   */
  "xyz": "xyz",
  /*
   * ABC
   * Description
   */
  "abc": "abc"
}`;

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
    const input = `{
  "xyz": "xyz",
  "abc": "abc"
}`;

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
