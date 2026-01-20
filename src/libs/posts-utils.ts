// Utility functions to merge static posts with API posts

import {
  getAllPosts,
  getPostBySlug as getStaticPostBySlug,
} from './posts-data';

import {
  fetchAllPosts,
  fetchPostBySlug as fetchApiPostBySlug,
  Post as ApiPost,
} from './api';

/* ============================================================
   Types
============================================================ */

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

/* ============================================================
   Helpers
============================================================ */

/**
 * Normalize image paths so they ALWAYS work in Next.js
 */
const normalizeImagePath = (image?: string): string => {
  if (!image) return '';

  // Absolute URL (Cloudinary, CDN, etc.)
  if (image.startsWith('http')) {
    return image;
  }

  // Absolute public path
  if (image.startsWith('/')) {
    return image;
  }

  // Relative → make public
  return `/${image}`;
};

/**
 * Normalize API image paths
 * Backend already serves images publicly
 */
const normalizeApiImage = (image?: string): string => {
  if (!image) return '';

  // Already valid
  if (image.startsWith('http') || image.startsWith('/')) {
    return image;
  }

  // Relative path → public path
  return `/${image}`;
};

/* ============================================================
   Merge all posts
============================================================ */

export async function getAllMergedPosts(): Promise<MergedPost[]> {
  const staticPosts = getAllPosts();
  let apiPosts: ApiPost[] = [];

  try {
    apiPosts = await fetchAllPosts();
  } catch {
    // Silent fallback — static posts only
  }

  const mergedPostsMap = new Map<string, MergedPost>();

  /* ---------- Static posts first ---------- */
  staticPosts.forEach((post) => {
    let imagePath = '';

    if (typeof post.image === 'string') {
      imagePath = normalizeImagePath(post.image);
    } else if (
      post.image &&
      typeof post.image === 'object' &&
      'src' in post.image
    ) {
      imagePath = (post.image as any).src || '';
    }

    mergedPostsMap.set(post.slug, {
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
      published: true,
    });
  });

  /* ---------- API posts override ---------- */
  apiPosts.forEach((apiPost) => {
    if (apiPost.published === false) return;

    mergedPostsMap.set(apiPost.slug, {
      id: apiPost.id,
      slug: apiPost.slug,
      title: apiPost.title,
      excerpt: apiPost.excerpt,
      content: apiPost.content,
      image: normalizeApiImage(apiPost.image),
      author: apiPost.author,
      date: apiPost.date,
      tags: apiPost.tags,
      category: apiPost.category,
      published: true,
    });
  });

  /* ---------- Sort newest first ---------- */
  return Array.from(mergedPostsMap.values()).sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.id - a.id;
  });
}

/* ============================================================
   Get post by slug
============================================================ */

export async function getMergedPostBySlug(
  slug: string,
): Promise<MergedPost | null> {
  /* ---------- Try API first ---------- */
  try {
    const apiPost = await fetchApiPostBySlug(slug);

    if (apiPost && apiPost.published !== false) {
      return {
        id: apiPost.id,
        slug: apiPost.slug,
        title: apiPost.title,
        excerpt: apiPost.excerpt,
        content: apiPost.content,
        image: normalizeApiImage(apiPost.image),
        author: apiPost.author,
        date: apiPost.date,
        tags: apiPost.tags,
        category: apiPost.category,
        published: true,
      };
    }
  } catch {
    // fallback
  }

  /* ---------- Static fallback ---------- */
  const staticPost = getStaticPostBySlug(slug);
  if (!staticPost) return null;

  let imagePath = '';

  if (typeof staticPost.image === 'string') {
    imagePath = normalizeImagePath(staticPost.image);
  } else if (
    staticPost.image &&
    typeof staticPost.image === 'object' &&
    'src' in staticPost.image
  ) {
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
