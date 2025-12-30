// components/BlogGrid/BlogGrid.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import BlogCard from '../BlogCard/BlogCard';
import styles from './BlogGrid.module.scss';

interface Post {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  slug: string;
  category?: string;
  date?: string;
  author?: string;
}

interface BlogGridProps {
  posts: Post[];
  itemsPerPage?: number;
}

const BlogGrid = ({ posts, itemsPerPage = 9 }: BlogGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    posts.forEach(post => {
      if (post.category) {
        uniqueCategories.add(post.category);
      }
    });
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [posts]);

  // Filter posts by category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') {
      return posts;
    }
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Calculate total pages based on filtered posts
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  // Get current posts for the current page
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const getPageNumbers = () => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1); // Changed to const
  
  // Adjust if we're at the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
};
  if (filteredPosts.length === 0) {
    return (
      <div className={styles.blogGridContainer}>
        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          <label htmlFor="category-select" className={styles.categoryLabel}>
            Filter by Category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.noPosts}>
          <p>No blog posts found{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogGridContainer}>
      {/* Category Filter */}
      <div className={styles.categoryFilter}>
        <label htmlFor="category-select" className={styles.categoryLabel}>
          Filter by Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.categorySelect}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Grid */}
      <div className={styles.blogGrid}>
        {currentPosts.map((post, index) => (
          <BlogCard 
            key={post.slug} 
            post={post} 
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {/* Previous Button */}
          <button
            className={`${styles.pageButton} ${styles.navButton}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className={styles.pageNumbers}>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.active : ''
                }`}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            className={`${styles.pageButton} ${styles.navButton}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next →
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className={styles.pageInfo}>
        Showing {((currentPage - 1) * itemsPerPage) + 1} -{' '}
        {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
        {selectedCategory !== 'All' && (
          <span className={styles.categoryInfo}> in {selectedCategory}</span>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;