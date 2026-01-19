// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import BlogTemplate from '@/components/BlogTemplate/BlogTemplate';
import { getAllMergedPosts, getMergedPostBySlug } from '../../../libs/posts-utils';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts (static + API)
export async function generateStaticParams() {
  try {
    const posts = await getAllMergedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getMergedPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getMergedPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogTemplate post={post} />;
}