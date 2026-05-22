// Replace BASE_URL with your actual API endpoint
const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://api.example.com';

function normalizeItem(raw) {
  return {
    id: raw.id ?? null,
    title: raw.title ?? raw.name ?? null,
    description: raw.description ?? null,
  };
}

export async function fetchItems(query, signal) {
  const url = `${BASE_URL}/items?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return (data.items ?? []).map(normalizeItem);
}

export async function fetchItem(id, signal) {
  const url = `${BASE_URL}/items/${encodeURIComponent(id)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return normalizeItem(await res.json());
}
