export const PROD_BASE = 'https://human-gene.onrender.com';
// example
// https://human-gene.onrender.com/api/genes?page=1&page_size=10
export function getApiUrl(): URL {
  const url = '/api/genes';
  const base =
    process.env.NODE_ENV === 'production' ? PROD_BASE : 'http://localhost:8000';

  return new URL(url, base);
}
