import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBookmarks } from './useBookmarks';
import type { Article } from './mockApi';

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  lead: 'Lead',
  body: 'Body',
  author: 'Author',
  publishedAt: '2024-01-01',
  topics: [{ id: '1', name: 'Topic' }],
  premium: false,
  imageUrl: null,
};

describe('useBookmarks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts with an empty array of bookmarks', () => {
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([]);
  });

  it('loads initial bookmarks from localStorage', () => {
    localStorage.setItem('bookmarks', JSON.stringify([mockArticle]));
    const { result } = renderHook(() => useBookmarks());
    expect(result.current.bookmarks).toEqual([mockArticle]);
  });

  it('toggles a bookmark on', () => {
    const { result } = renderHook(() => useBookmarks());
    
    act(() => {
      result.current.toggleBookmark(mockArticle);
    });

    expect(result.current.bookmarks).toEqual([mockArticle]);
    expect(result.current.isBookmarked('1')).toBe(true);
    expect(JSON.parse(localStorage.getItem('bookmarks') || '[]')).toEqual([mockArticle]);
  });

  it('toggles a bookmark off', () => {
    localStorage.setItem('bookmarks', JSON.stringify([mockArticle]));
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark(mockArticle);
    });

    expect(result.current.bookmarks).toEqual([]);
    expect(result.current.isBookmarked('1')).toBe(false);
    expect(JSON.parse(localStorage.getItem('bookmarks') || '[]')).toEqual([]);
  });
});
