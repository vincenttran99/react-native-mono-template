import { uniqueByPropertyHelper, removeDuplicatesHelper } from '../array.helper';

describe('uniqueByPropertyHelper', () => {
  test('removes duplicate elements based on property', () => {
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John (duplicate)' },
    ];
    
    const result = uniqueByPropertyHelper(users, 'id');
    
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  });

  test('removes duplicate elements based on function', () => {
    const items = [
      { type: 'fruit', name: 'apple' },
      { type: 'vegetable', name: 'carrot' },
      { type: 'fruit', name: 'banana' },
    ];
    
    const result = uniqueByPropertyHelper(items, item => item.type);
    
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { type: 'fruit', name: 'apple' },
      { type: 'vegetable', name: 'carrot' },
    ]);
  });

  test('handles null and undefined values correctly', () => {
    const items = [null, undefined, { id: 1 }, null, { id: 2 }, undefined];
    
    const result = uniqueByPropertyHelper(items, 'id');
    
    expect(result).toHaveLength(4);
    expect(result).toContainEqual(null);
    expect(result).toContainEqual(undefined);
    expect(result).toContainEqual({ id: 1 });
    expect(result).toContainEqual({ id: 2 });
  });

  test('returns empty array when input is empty array', () => {
    const result = uniqueByPropertyHelper([], 'id');
    expect(result).toEqual([]);
  });
});

describe('removeDuplicatesHelper', () => {
  test('removes duplicate numbers', () => {
    const numbers = [1, 2, 2, 3, 1, 4, 5, 5];
    
    const result = removeDuplicatesHelper(numbers);
    
    expect(result).toHaveLength(5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test('removes duplicate strings', () => {
    const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
    
    const result = removeDuplicatesHelper(fruits);
    
    expect(result).toHaveLength(3);
    expect(result).toEqual(['apple', 'banana', 'orange']);
  });

  test('handles null and undefined values correctly', () => {
    const items = [null, undefined, 1, null, 2, undefined];
    
    const result = removeDuplicatesHelper(items);
    
    expect(result).toHaveLength(4);
    expect(result).toContain(null);
    expect(result).toContain(undefined);
    expect(result).toContain(1);
    expect(result).toContain(2);
  });

  test('returns empty array when input is empty array', () => {
    const result = removeDuplicatesHelper([]);
    expect(result).toEqual([]);
  });

  test('preserves the order of elements', () => {
    const items = ['z', 'a', 'b', 'a', 'c', 'b'];
    
    const result = removeDuplicatesHelper(items);
    
    expect(result).toEqual(['z', 'a', 'b', 'c']);
  });
});