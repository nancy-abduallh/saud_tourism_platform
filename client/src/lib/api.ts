const ORIGIN = process.env.API_ORIGIN ?? 'http://localhost:4001';

export async function serverFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${ORIGIN}/api${path}`, { next: { revalidate: 30 } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}
