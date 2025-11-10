// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import BlogTemplate from '@/components/BlogTemplate/BlogTemplate';
import { getPostBySlug, getAllPosts } from '../../../libs/posts-data';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  
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

export default function BlogPost({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return <BlogTemplate post={post} />;
}