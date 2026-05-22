import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fetchItems, fetchItem } from './api.js';

describe('fetchItems', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls correct URL with encoded query', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });
    await fetchItems('hello world');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('q=hello%20world'),
      expect.any(Object)
    );
  });

  it('passes signal to fetch', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ items: [] }) });
    const controller = new AbortController();
    await fetchItems('test', controller.signal);
    expect(fetch).toHaveBeenCalledWith(expect.any(String), { signal: controller.signal });
  });

  it('normalizes response items', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ items: [{ id: '1', title: 'Thing', description: 'Desc' }] }),
    });
    const result = await fetchItems('test');
    expect(result).toEqual([{ id: '1', title: 'Thing', description: 'Desc' }]);
  });

  it('throws on non-ok response', async () => {
    fetch.mockResolvedValue({ ok: false, status: 404 });
    await expect(fetchItems('test')).rejects.toThrow('API error: 404');
  });
});

describe('fetchItem', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls correct URL with encoded id', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 'abc', title: 'Test' }),
    });
    await fetchItem('abc/def');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('abc%2Fdef'), expect.any(Object));
  });

  it('throws on non-ok response', async () => {
    fetch.mockResolvedValue({ ok: false, status: 500 });
    await expect(fetchItem('x')).rejects.toThrow('API error: 500');
  });
});
