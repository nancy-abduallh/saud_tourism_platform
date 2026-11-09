export async function api<T = any>(path: string, options: RequestInit & { auth?: boolean } = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (options.auth) {
    const token = localStorage.getItem('st_token');
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }
  const res = await fetch(`/api${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && options.auth) {
      localStorage.removeItem('st_token');
      window.location.href = '/admin/login';
    }
    throw new Error(data.message ?? 'حدث خطأ غير متوقع');
  }
  return data as T;
}
