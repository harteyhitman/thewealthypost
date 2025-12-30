// Utility functions to merge static posts with API posts
import { getAllPosts, getPostBySlug as getStaticPostBySlug } from './posts-data';
import { fetchAllPosts, fetchPostBySlug as fetchApiPostBySlug, Post as ApiPost } from './api';

export interface MergedPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author?: string;
  date?: string;
  tags?: string[];
  category?: string;
  published?: boolean;
}

/**
 * Merges static posts with API posts
 * API posts take precedence if there's a duplicate slug
 */
export async function getAllMergedPosts(): Promise<MergedPost[]> {
  // Get static posts
  const staticPosts = getAllPosts();
  
  // Get API posts (gracefully handle if backend is not running)
  let apiPosts: ApiPost[] = [];
  try {
    apiPosts = await fetchAllPosts();
    if (process.env.NODE_ENV === 'development') {
      console.log(`[getAllMergedPosts] Fetched ${apiPosts.length} posts from API`);
    }
  } catch (error) {
    // Silently fallback to static posts if API is unavailable
    // This allows the site to work even when backend is not running
    if (process.env.NODE_ENV === 'development') {
      console.warn('Backend API unavailable, using static posts only. Start the backend server to see new posts.', error);
    }
  }
  
  // Create a map of API posts by slug for quick lookup
  const apiPostsMap = new Map<string, ApiPost>();
  apiPosts.forEach(post => {
    apiPostsMap.set(post.slug, post);
  });
  
  // Transform static posts to merged format
  const mergedStaticPosts: MergedPost[] = staticPosts.map(post => {
    // Convert StaticImageData to string path
    let imagePath = '';
    if (typeof post.image === 'string') {
      imagePath = post.image;
    } else if (post.image && typeof post.image === 'object' && 'src' in post.image) {
      // StaticImageData has a src property that's already a valid path
      imagePath = (post.image as any).src || '';
    }
    
    return {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: imagePath,
      author: post.author,
      date: post.date,
      tags: post.tags,
      category: post.category,
      published: true, // Static posts are always published
    };
  });
  
  // Add API posts, replacing static posts with same slug
  const mergedPostsMap = new Map<string, MergedPost>();
  
  // First, add all static posts
  mergedStaticPosts.forEach(post => {
    mergedPostsMap.set(post.slug, post);
  });
  
  // Then, add/override with API posts (only published ones)
  let addedApiPostsCount = 0;
  apiPosts.forEach(apiPost => {
    // Only include published posts (treat undefined/null as published)
    // This ensures all API posts are included unless explicitly set to false
    const isPublished = apiPost.published !== false;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[getAllMergedPosts] Processing API post: "${apiPost.title}" - published: ${apiPost.published}, isPublished: ${isPublished}`);
    }
    
    if (isPublished) {
      // Normalize image path - ensure it starts with / if it's a relative path
      let imagePath = apiPost.image || '';
      if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        imagePath = '/' + imagePath;
      }
      
      const mergedPost: MergedPost = {
        id: apiPost.id,
        slug: apiPost.slug,
        title: apiPost.title,
        excerpt: apiPost.excerpt,
        content: apiPost.content,
        image: imagePath,
        author: apiPost.author,
        date: apiPost.date,
        tags: apiPost.tags,
        category: apiPost.category,
        published: true, // Ensure it's marked as published
      };
      
      mergedPostsMap.set(apiPost.slug, mergedPost);
      addedApiPostsCount++;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[getAllMergedPosts] Added API post to map: "${apiPost.title}" (slug: "${apiPost.slug}")`);
      }
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[getAllMergedPosts] Skipping unpublished API post: "${apiPost.title}"`);
      }
    }
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[getAllMergedPosts] Added ${addedApiPostsCount} API posts to merged map`);
  }
  
  // Convert map to array and sort by date (newest first) or id
  const mergedPosts = Array.from(mergedPostsMap.values()).sort((a, b) => {
    // Try to sort by date if available
    if (a.date && b.date) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return dateB - dateA; // Newest first
      }
    }
    // Fallback to id (API posts typically have higher IDs)
    return b.id - a.id;
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[getAllMergedPosts] Final merged posts count: ${mergedPosts.length} (Static: ${staticPosts.length}, API: ${apiPosts.length})`);
  }
  
  return mergedPosts;
}

/**
 * Gets a post by slug, checking API first, then static posts
 */
export async function getMergedPostBySlug(slug: string): Promise<MergedPost | null> {
  // First try API
  try {
    const apiPost = await fetchApiPostBySlug(slug);
    if (apiPost) {
      return {
        id: apiPost.id,
        slug: apiPost.slug,
        title: apiPost.title,
        excerpt: apiPost.excerpt,
        content: apiPost.content,
        image: apiPost.image || '',
        author: apiPost.author,
        date: apiPost.date,
        tags: apiPost.tags,
        category: apiPost.category,
        published: apiPost.published,
      };
    }
  } catch (error) {
    // Silently fallback to static posts if API is unavailable
  }
  
  // Fallback to static posts
  const staticPost = getStaticPostBySlug(slug);
  if (staticPost) {
    let imagePath = '';
    if (typeof staticPost.image === 'string') {
      imagePath = staticPost.image;
    } else if (staticPost.image && typeof staticPost.image === 'object' && 'src' in staticPost.image) {
      // StaticImageData has a src property that's already a valid path
      imagePath = (staticPost.image as any).src || '';
    }
    
    return {
      id: staticPost.id,
      slug: staticPost.slug,
      title: staticPost.title,
      excerpt: staticPost.excerpt,
      content: staticPost.content,
      image: imagePath,
      author: staticPost.author,
      date: staticPost.date,
      tags: staticPost.tags,
      category: staticPost.category,
      published: true,
    };
  }
  
  return null;
}

