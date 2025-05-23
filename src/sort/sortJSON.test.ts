import {sortJSON} from './sortJSON';

describe('sortJSON', () => {
  it('should preserve comments when sorting JSON5', () => {
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