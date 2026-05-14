import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchFeed, fetchArticle } from './mockApi';
import { ARTICLES } from './seed';

describe('mockApi', () => {
  let randomSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5); // Prevent random errors
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchFeed', () => {
    it('fetches the first page of articles', async () => {
      const response = await fetchFeed();
      expect(response.data).toHaveLength(10);
      expect(response.meta.total).toBe(ARTICLES.length);
      expect(response.meta.nextPage).toBe(1);
    });

    it('filters articles by topic', async () => {
      const topicId = ARTICLES[0].topics[0].id;
      const response = await fetchFeed({ topics: [topicId] });
      
      response.data.forEach(article => {
        expect(article.topics.some(t => t.id === topicId)).toBe(true);
      });
    });

    it('filters articles by search query', async () => {
      const query = ARTICLES[0].title.split(' ')[0];
      const response = await fetchFeed({ q: query });
      
      expect(response.data.length).toBeGreaterThan(0);
      response.data.forEach(article => {
        const matches = [article.title, article.lead, article.body].some(f => 
          f.toLowerCase().includes(query.toLowerCase())
        );
        expect(matches).toBe(true);
      });
    });

    it('returns empty data when no articles match', async () => {
      const response = await fetchFeed({ q: 'nonexistent-query-12345' });
      expect(response.data).toHaveLength(0);
      expect(response.meta.total).toBe(0);
    });

    it('throws network error randomly', async () => {
      randomSpy.mockReturnValue(0.01); // Trigger error
      await expect(fetchFeed()).rejects.toThrow('Network error');
    });
  });

  describe('fetchArticle', () => {
    it('fetches a single article by id', async () => {
      const article = await fetchArticle(ARTICLES[0].id);
      expect(article).toEqual(ARTICLES[0]);
    });

    it('throws error for non-existent article', async () => {
      await expect(fetchArticle('non-existent-id')).rejects.toThrow('Not found');
    });
  });
});
