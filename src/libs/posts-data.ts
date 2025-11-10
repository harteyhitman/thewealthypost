// lib/posts-data.ts
export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content: string;
  author?: string;
  date?: string;
  tags?: string[];
}

export const posts: Post[] = [
  {
    id: 1,
    slug: 'post-1-headline',
    title: 'Post 1 Headline',
    excerpt: 'Sample small text. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
    image: '/images/post1.jpg',
    content: `
      <h2>Introduction</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    `,
    author: 'John Doe',
    date: 'January 1, 2024',
    tags: ['Technology', 'Web Development']
  },
  {
    id: 2,
    slug: 'post-2-headline',
    title: 'Post 2 Headline',
    excerpt: 'Sample small text. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
    image: '/images/post2.jpg',
    content: `
      <h2>Getting Started</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
    `,
    author: 'Jane Smith',
    date: 'January 2, 2024',
    tags: ['Design', 'UI/UX']
  },
  {
    id: 3,
    slug: 'post-3-headline',
    title: 'Post 3 Headline',
    excerpt: 'Sample small text. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
    image: '/images/post3.jpg',
    content: `
      <h2>Advanced Techniques</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
    `,
    author: 'Mike Johnson',
    date: 'January 3, 2024',
    tags: ['Business', 'Marketing']
  }
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}