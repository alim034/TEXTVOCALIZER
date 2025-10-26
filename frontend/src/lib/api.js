import axios from 'axios';

const API_BASE_URL =
  (import.meta?.env?.VITE_API_URL || '').replace(/\/$/, '') ||
  'https://voicify-backend.onrender.com';

// Shared axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // generous for Render cold starts
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Minimal retry on network/5xx or timeout
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const cfg = error.config || {};
    const status = error.response?.status;
    const retriable =
      !cfg.__retry &&
      (error.code === 'ECONNABORTED' ||
        error.message?.includes('Network Error') ||
        (status && status >= 500));

    if (retriable) {
      cfg.__retry = true;
      await new Promise((r) => setTimeout(r, 800));
      return api(cfg);
    }
    return Promise.reject(error);
  }
);

// Warm-up helper to reduce cold-start lag
export async function warmUp() {
  try {
    await api.get('/api/health', { timeout: 10000 });
  } catch {
    try {
      await api.get('/', { timeout: 10000 });
    } catch {}
  }
}

export default api;
