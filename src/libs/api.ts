// utils/api.ts (or wherever this lives)

/**
 * Get API base URL.
 * - REQUIRED in production
 * - Allowed in development
 */
export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not defined. Set it in your environment variables.'
    );
  }

  return apiUrl.replace(/\/$/, ''); // remove trailing slash if any
};

const API_BASE_URL = getApiUrl();

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
   Fetch helpers
============================================================ */

const fetchWithTimeout = async (url: string) => {
  return fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(5000), // 5s timeout
  });
};

/* ============================================================
   API calls
============================================================ */

export async function fetchAllPosts(): Promise<Post[]> {
  const url = `${API_BASE_URL}/posts`;

  try {
    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts: ${response.status} ${response.statusText}`
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

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const url = `${API_BASE_URL}/posts/slug/${slug}`;

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
