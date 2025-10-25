// services/api.service.ts
import { BlogPost, CreateBlogPostDto } from '@/types/blog';

class ApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}, 
    includeAuth: boolean = true
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Fixed headers initialization
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth header if needed
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    // Merge with any existing headers from options
    const finalHeaders = {
      ...headers,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: finalHeaders,
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check if the server is running.');
    }
  }

  // Auth methods
  async login(username: string, password: string) {
    const result = await this.request<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }, false);
    
    if (result.access_token) {
      this.setToken(result.access_token);
    }
    
    return result;
  }

  async register(username: string, password: string) {
    return this.request<{ id: number; username: string; createdAt: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }, false);
  }

  async validateToken() {
    return this.request<{ valid: boolean; user: any }>('/auth/validate', {
      method: 'GET', // Changed to GET as it's more appropriate for validation
    });
  }

  // Blog post methods
  async getBlogPosts() {
    return this.request<BlogPost[]>('/blog-posts', {}, false);
  }

  async getBlogPost(id: number) {
    return this.request<BlogPost>(`/blog-posts/${id}`, {}, false);
  }

  async createBlogPost(postData: CreateBlogPostDto) {
    return this.request<BlogPost>('/blog-posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updateBlogPost(id: number, postData: Partial<CreateBlogPostDto>) {
    return this.request<BlogPost>(`/blog-posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deleteBlogPost(id: number) {
    return this.request<void>(`/blog-posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Token management
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }
}

export const apiService = new ApiService();