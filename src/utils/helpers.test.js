import { describe, it, expect } from 'vitest';
import { slugify, truncate, formatNumber } from './helpers.js';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('strips special chars', () => {
    expect(slugify('foo & bar!')).toBe('foo-bar');
  });
  it('returns empty string for non-string', () => {
    expect(slugify(null)).toBe('');
    expect(slugify(42)).toBe('');
  });
});

describe('truncate', () => {
  it('returns original when under limit', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });
  it('truncates with ellipsis', () => {
    expect(truncate('hello world', 5)).toBe('hello…');
  });
  it('returns falsy as-is', () => {
    expect(truncate(null, 10)).toBe(null);
  });
});

describe('formatNumber', () => {
  it('formats millions', () => {
    expect(formatNumber(1_500_000)).toBe('1.5M');
  });
  it('formats thousands', () => {
    expect(formatNumber(2_400)).toBe('2.4K');
  });
  it('returns small numbers as string', () => {
    expect(formatNumber(42)).toBe('42');
  });
  it('returns null for null', () => {
    expect(formatNumber(null)).toBe(null);
  });
});
