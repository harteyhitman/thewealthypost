import { supabase } from './supabaseClient';

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
  created_at?: string;
  updated_at?: string;
}

/* ============================================================
   API calls (Supabase)
============================================================ */

/**
 * Fetch all published posts
 */
export async function fetchAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message, error.code);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return data as Post[];
}

/**
 * Fetch all posts (including unpublished) for admin
 */
export async function fetchAllPostsAdmin(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts for admin:', error.message, error.code);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return data as Post[];
}

/**
 * Fetch a single post by slug
 */
export async function fetchPostBySlug(
  slug: string,
): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Record not found
      return null;
    }
    console.error(`Error fetching post by slug ${slug}:`, error.message, error.code);
    return null;
  }

  return data as Post;
}

/**
 * Fetch a single post by ID
 */
export async function fetchPostById(
  id: number | string,
): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching post by ID ${id}:`, error.message, error.code);
    return null;
  }

  return data as Post;
}

/**
 * Create a new post
 */
export async function createPost(post: Partial<Post>): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error.message, error);
    throw new Error(`Failed to create post: ${error.message}`);
  }

  return data as Post;
}

/**
 * Update an existing post
 */
export async function updatePost(id: number | string, post: Partial<Post>): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .update(post)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating post ${id}:`, error.message, error);
    throw new Error(`Failed to update post: ${error.message}`);
  }

  return data as Post;
}

/**
 * Delete a post
 */
export async function deletePost(id: number | string): Promise<boolean> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting post ${id}:`, error.message, error);
    throw new Error(`Failed to delete post: ${error.message}`);
  }

  return true;
}

/**
 * Upload an image to Supabase Storage
 */
export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}-${Math.floor(Date.now() / 1000)}.${fileExt}`;
  const filePath = fileName;

  const { data, error } = await supabase.storage
    .from('blog-posts')
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error.message, error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('blog-posts')
    .getPublicUrl(filePath);

  return publicUrl;
}
