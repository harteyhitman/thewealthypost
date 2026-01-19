// utils/api.ts

/**
 * Get API base URL
 * - Uses NEXT_PUBLIC_API_URL if set
 * - Falls back to localhost in development
 * - Falls back to Render backend in production (for build time)
 */
export const getApiUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    // Remove trailing slash if present
    return apiUrl.replace(/\/$/, '');
  }

  // Fallback logic
  if (process.env.NODE_ENV === 'development') {
    // Dev fallback
    return 'http://localhost:3001';
  }

  // Production build-time fallback (prevents build errors)
  // This allows the build to complete even if env var is not set
  // The env var should still be set in Vercel for runtime
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
  const url = `${getApiUrl()}/posts`;

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
  const url = `${getApiUrl()}/posts/slug/${slug}`;

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
