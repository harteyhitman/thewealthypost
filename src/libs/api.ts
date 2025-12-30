const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

export async function fetchAllPosts(): Promise<Post[]> {
  try {
    // Use absolute URL for server-side rendering
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const url = `${apiUrl}/posts`;
    
    // Add cache: 'no-store' to ensure fresh data on each request
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }, // Revalidate immediately
      // Add timeout for server-side requests
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    // Log the error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('[fetchAllPosts] Error details:', {
        message: error.message,
        cause: error.cause,
        url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts`,
      });
    }
    // Re-throw the error so the caller can handle it
    // This allows posts-utils to gracefully fallback to static posts
    throw error;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Use absolute URL for server-side rendering
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const url = `${apiUrl}/posts/slug/${slug}`;
    
    // Add cache: 'no-store' to ensure fresh data on each request
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }, // Revalidate immediately
      // Add timeout for server-side requests
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    // Log the error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('[fetchPostBySlug] Error details:', {
        message: error.message,
        cause: error.cause,
        slug,
        url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts/slug/${slug}`,
      });
    }
    // Re-throw the error so the caller can handle it
    // This allows posts-utils to gracefully fallback to static posts
    throw error;
  }
}
