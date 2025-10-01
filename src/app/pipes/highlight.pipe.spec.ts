import { Highlight } from './highlight.pipe';

describe('Highlight Pipe', () => {
  let pipe: Highlight;

  beforeEach(() => {
    pipe = new Highlight();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original value when keyword is empty', () => {
    const result = pipe.transform('Hello World', '');
    expect(result).toBe('Hello World');
  });

  it('should highlight matching text', () => {
    const result = pipe.transform('Hello World', 'World');
    expect(result).toBe('Hello <mark>World</mark>');
  });

  it('should be case insensitive', () => {
    const result = pipe.transform('Hello World', 'world');
    expect(result).toBe('Hello <mark>World</mark>');
  });

  it('should highlight multiple occurrences', () => {
    const result = pipe.transform('test test test', 'test');
    expect(result).toBe('<mark>test</mark> <mark>test</mark> <mark>test</mark>');
  });

  it('should highlight partial matches', () => {
    const result = pipe.transform('JavaScript', 'Script');
    expect(result).toBe('Java<mark>Script</mark>');
  });

  it('should handle no matches', () => {
    const result = pipe.transform('Hello World', 'xyz');
    expect(result).toBe('Hello World');
  });

  it('should handle empty string value', () => {
    const result = pipe.transform('', 'test');
    expect(result).toBe('');
  });

  it('should preserve original casing in highlight', () => {
    const result = pipe.transform('AngularJS', 'angular');
    expect(result).toBe('<mark>Angular</mark>JS');
  });
});