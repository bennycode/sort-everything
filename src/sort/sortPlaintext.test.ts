import {sortPlaintext} from './sortPlaintext';
import assert from 'node:assert';

describe('sortPlaintext', () => {
  it('sorts shorter texts first when they are prefixes', () => {
    const input = 'Bollinger Bands Width\nBollinger Bands';
    const actual = sortPlaintext(input);
    assert(actual.type === 'success');
    
    // First, let's see what the current implementation returns
    console.log('Current output:', JSON.stringify(actual.payload));
    console.log('Expected output:', JSON.stringify('Bollinger Bands\nBollinger Bands Width'));
    
    expect(actual.payload).toBe('Bollinger Bands\nBollinger Bands Width');
  });

  it('demonstrates the actual issue with different case', () => {
    // Let's test with a case that will definitely show the problem
    // Try various scenarios to find the failing case
    
    // Test 1: Simple prefix case
    const input1 = 'ABCD\nABC';
    const result1 = sortPlaintext(input1);
    assert(result1.type === 'success');
    console.log('Test 1 - ABCD/ABC:', JSON.stringify(result1.payload));
    
    // Test 2: Real example from issue
    const input2 = 'Bollinger Bands Width\nBollinger Bands';
    const result2 = sortPlaintext(input2);
    assert(result2.type === 'success');
    console.log('Test 2 - Bollinger:', JSON.stringify(result2.payload));
    
    // Test 3: Check if it works with spaces vs no spaces
    const input3 = 'Test Word\nTestWord';
    const result3 = sortPlaintext(input3);
    assert(result3.type === 'success');
    console.log('Test 3 - Space vs no space:', JSON.stringify(result3.payload));
    
    // Test 4: Numbers at the end
    const input4 = 'Item 10\nItem 2';
    const result4 = sortPlaintext(input4);
    assert(result4.type === 'success');
    console.log('Test 4 - Numbers:', JSON.stringify(result4.payload));
    
    expect(result1.payload).toBe('ABC\nABCD');
  });

  it('maintains normal alphabetical sorting for different strings', () => {
    const input = 'Zebra\nApple\nBanana';
    const actual = sortPlaintext(input);
    assert(actual.type === 'success');
    expect(actual.payload).toBe('Apple\nBanana\nZebra');
  });

  it('handles empty input', () => {
    const input = '';
    const actual = sortPlaintext(input);
    assert(actual.type === 'success');
    expect(actual.payload).toBe('');
  });

  it('handles single line input', () => {
    const input = 'Single line';
    const actual = sortPlaintext(input);
    assert(actual.type === 'success');
    expect(actual.payload).toBe('Single line');
  });
});