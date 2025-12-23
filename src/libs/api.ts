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
    // Add cache: 'no-store' to ensure fresh data on each request
    const response = await fetch(`${API_BASE_URL}/posts`, {
      cache: 'no-store',
      next: { revalidate: 0 }, // Revalidate immediately
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // Re-throw the error so the caller can handle it
    // This allows posts-utils to gracefully fallback to static posts
    throw error;
  }
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Add cache: 'no-store' to ensure fresh data on each request
    const response = await fetch(`${API_BASE_URL}/posts/slug/${slug}`, {
      cache: 'no-store',
      next: { revalidate: 0 }, // Revalidate immediately
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    // Re-throw the error so the caller can handle it
    // This allows posts-utils to gracefully fallback to static posts
    throw error;
  }
}
