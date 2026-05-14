import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Article } from '../lib/mockApi';

interface BookmarkContextType {
  bookmarks: Article[];
  toggleBookmark: (article: Article) => void;
  isBookmarked: (articleId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (article: Article) => {
    setBookmarks((prev) => {
      const isCurrentlyBookmarked = prev.some((b) => b.id === article.id);
      if (isCurrentlyBookmarked) {
        return prev.filter((b) => b.id !== article.id);
      } else {
        return [...prev, article];
      }
    });
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.some((b) => b.id === articleId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
