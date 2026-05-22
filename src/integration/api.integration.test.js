/**
 * Real network tests — NOT run in CI (excluded via vitest.config.js).
 * Run manually: pnpm test src/integration
 *
 * Replace these with tests against your actual API endpoints.
 */
import { describe, it, expect } from 'vitest';

describe('API Integration — real network calls', () => {
  it.skip('placeholder: replace with real endpoint test', async () => {
    // Example:
    // const result = await fetchItems('test');
    // expect(result).toBeInstanceOf(Array);
    expect(true).toBe(true);
  });
});
