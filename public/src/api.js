const BASE = 'http://localhost:3000'

export async function fetchBooks() {
  const res = await fetch(`${BASE}/books`)
  if (!res.ok) throw new Error(`Books fetch failed: ${res.status}`)
  const data = await res.json()
  return data.data || data
}