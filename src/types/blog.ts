// types/blog.ts
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags?: string;
  slug?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: number;
    username: string;
  };
}

export interface CreateBlogPostDto {
  title: string;
  content: string;
  tags?: string;
  slug?: string;
}