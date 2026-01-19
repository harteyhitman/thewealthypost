// utils/api.ts

/**
 * Get API base URL
 * - REQUIRED in production
 * - Optional fallback to localhost only in development
 */
export const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    if (process.env.NODE_ENV === 'development') {
      // Dev fallback
      return 'http://localhost:3001';
    }
    // Production: crash build early
    throw new Error(
      'NEXT_PUBLIC_API_URL is not defined. Set it in your environment variables.'
    );
  }

  // Remove trailing slash if present
  return apiUrl.replace(/\/$/, '');
};

// Single source of truth for API base URL
export const API_BASE_URL = getApiUrl();

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
   Fetch helper with timeout
============================================================ */

const fetchWithTimeout = async (url: string) => {
  return fetch(url, {
    cache: 'no-store',
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(5000), // 5 second timeout
  });
};

/* ============================================================
   API calls
============================================================ */

/**
 * Fetch all posts
 */
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
      console.error('[fetchAllPosts] Error details:', {
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
      console.error('[fetchPostBySlug] Error details:', {
        message: error.message,
        slug,
        url,
      });
    }
    throw error;
  }
}
