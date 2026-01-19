// // Get API URL - use environment variable or default to localhost for development
// export const getApiUrl = () => {
//   if (typeof window !== 'undefined') {
//     // Client-side: use environment variable
//     return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
//   }
//   // Server-side: use environment variable
//   return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
// };

// const API_BASE_URL = getApiUrl();

// export interface Post {
//   id: number;
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   image?: string;
//   author?: string;
//   date?: string;
//   tags?: string[];
//   category?: string;
//   published: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export async function fetchAllPosts(): Promise<Post[]> {
//   try {
//     // Use absolute URL for server-side rendering
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
//     const url = `${apiUrl}/posts`;
    
//     // Add cache: 'no-store' to ensure fresh data on each request
//     const response = await fetch(url, {
//       cache: 'no-store',
//       next: { revalidate: 0 }, // Revalidate immediately
//       // Add timeout for server-side requests
//       signal: AbortSignal.timeout(5000), // 5 second timeout
//     });
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     // Log the error for debugging
//     if (process.env.NODE_ENV === 'development') {
//       console.error('[fetchAllPosts] Error details:', {
//         message: error.message,
//         cause: error.cause,
//         url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts`,
//       });
//     }
//     // Re-throw the error so the caller can handle it
//     // This allows posts-utils to gracefully fallback to static posts
//     throw error;
//   }
// }

// export async function fetchPostBySlug(slug: string): Promise<Post | null> {
//   try {
//     // Use absolute URL for server-side rendering
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
//     const url = `${apiUrl}/posts/slug/${slug}`;
    
//     // Add cache: 'no-store' to ensure fresh data on each request
//     const response = await fetch(url, {
//       cache: 'no-store',
//       next: { revalidate: 0 }, // Revalidate immediately
//       // Add timeout for server-side requests
//       signal: AbortSignal.timeout(5000), // 5 second timeout
//     });
    
//     if (!response.ok) {
//       return null;
//     }
    
//     const data = await response.json();
//     return data;
//   } catch (error: any) {
//     // Log the error for debugging
//     if (process.env.NODE_ENV === 'development') {
//       console.error('[fetchPostBySlug] Error details:', {
//         message: error.message,
//         cause: error.cause,
//         slug,
//         url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/posts/slug/${slug}`,
//       });
//     }
//     // Re-throw the error so the caller can handle it
//     // This allows posts-utils to gracefully fallback to static posts
//     throw error;
//   }
// }

// lib/posts-api.ts

export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Never crash at build time
  if (!apiUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "NEXT_PUBLIC_API_URL is not set. Falling back to http://localhost:3001"
      );
    }
    return "http://localhost:3001";
  }

  return apiUrl;
};

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
  const url = `${getApiUrl()}/posts`;

  const response = await fetch(url, {
    cache: "no-store",
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch posts: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function fetchPostBySlug(
  slug: string
): Promise<Post | null> {
  const url = `${getApiUrl()}/posts/slug/${slug}`;

  const response = await fetch(url, {
    cache: "no-store",
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
