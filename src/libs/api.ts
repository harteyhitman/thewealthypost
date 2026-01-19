// utils/api.ts

/**
 * Get API base URL
 * - Uses NEXT_PUBLIC_API_URL if set
 * - Falls back to localhost in development
 * - Falls back to production backend during build
 */
export const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    return apiUrl.replace(/\/$/, '');
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
  }

  // Build-time / production fallback
  return 'https://thewealthypost-backend.onrender.com';
};

/* ============================================================
   Types
============================================================ */

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  tags?: string[];
  category?: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/* ============================================================
   Fetch helper (SSR + Client safe)
============================================================ */

const fetchWithTimeout = async (url: string, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      signal: controller.signal,

      // Server-only caching control
      ...(typeof window === 'undefined'
        ? {
            cache: 'no-store',
            next: { revalidate: 0 },
          }
        : {}),
    });
  } finally {
    clearTimeout(id);
  }
};

/* ============================================================
   API calls
============================================================ */

/**
 * Fetch all posts
 */
export async function fetchAllPosts(): Promise<Post[]> {
  const url = `${getApiUrl()}/posts`;

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[fetchAllPosts]', {
        message: error.message,
        url,
      });
    }
    throw error;
  }
}

/**
 * Fetch a single post by slug
 */
export async function fetchPostBySlug(
  slug: string,
): Promise<Post | null> {
  const url = `${getApiUrl()}/posts/slug/${slug}`;

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[fetchPostBySlug]', {
        message: error.message,
        slug,
        url,
      });
    }
    throw error;
  }
}
