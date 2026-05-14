import { useState, useEffect } from 'react';
import type { Article } from './mockApi';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article: Article) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.id === article.id);
      if (isBookmarked) {
        return prev.filter((b) => b.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.some((b) => b.id === articleId);
  };

  return { bookmarks, toggleBookmark, isBookmarked };
}
