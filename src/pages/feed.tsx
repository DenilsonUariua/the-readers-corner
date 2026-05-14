import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Button, GridList, Text, TagGroup, Tag, TagList, Label } from 'react-aria-components';
import { fetchFeed, type Article } from '../lib/mockApi';
import { TOPICS } from '../lib/seed';
import { useBookmarks } from '../context/BookmarkContext';
import { ArticleCard } from '../components/articleCard';

interface FeedPageProps {
  searchQuery?: string;
  onOpenArticle: (articleId: string) => void;
}

export default function FeedPage({ searchQuery = '', onOpenArticle }: FeedPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());
  const [nextPage, setNextPage] = useState<number | null>(null);

  const { toggleBookmark, isBookmarked } = useBookmarks();
  const observerTarget = useRef<HTMLDivElement>(null);
  const selectedTopicsArray = useMemo(() => Array.from(selectedTopicIds), [selectedTopicIds]);

  const loadInitialFeed = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchFeed({ topics: selectedTopicsArray, page: 0, q: searchQuery });
      setArticles(response.data);
      setNextPage(response.meta.nextPage);
    } catch (err) {
      setError('Failed to load feed. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopicsArray, searchQuery]);

  useEffect(() => {
    loadInitialFeed();
  }, [loadInitialFeed]);

  const loadMore = useCallback(async () => {
    if (nextPage === null || isFetchingMore || isLoading) return;

    try {
      setIsFetchingMore(true);
      const response = await fetchFeed({ topics: selectedTopicsArray, page: nextPage, q: searchQuery });
      setArticles(prev => [...prev, ...response.data]);
      setNextPage(response.meta.nextPage);
    } catch (err) {
      console.error('Failed to load more articles:', err);
    } finally {
      setIsFetchingMore(false);
    }
  }, [nextPage, isFetchingMore, isLoading, selectedTopicsArray, searchQuery]);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || nextPage === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loadMore, nextPage]);

  if (isLoading && articles.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Text className="text-lg text-[var(--text)]">Loading your feed...</Text>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-8 md:py-16">

      <div className="mb-10">
        <TagGroup 
          selectionMode="multiple" 
          selectedKeys={selectedTopicIds}
          onSelectionChange={(keys) => setSelectedTopicIds(keys as Set<string>)}
          className="flex flex-col gap-3"
        >
          <Label className="text-sm self-start font-semibold uppercase tracking-wider text-[var(--text)]/60">
            Filter by Topic
          </Label>
          <TagList 
            items={TOPICS}
            className="flex flex-wrap gap-2"
          >
            {(topic) => (
              <Tag 
                id={topic.id}
                className={({ isSelected, isFocusVisible }) => `
                  cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-all
                  ${isSelected 
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-white' 
                    : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}
                  ${isFocusVisible ? 'ring-2 ring-[var(--accent)] ring-offset-2' : 'outline-none'}
                `}
              >
                {topic.name}
              </Tag>
            )}
          </TagList>
        </TagGroup>
      </div>

      {error ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
          <Text className="text-lg font-medium text-red-600">{error}</Text>
          <Button 
            onPress={loadInitialFeed}
            className="rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Retry
          </Button>
        </div>
      ) : articles.length === 0 && !isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--social-bg)] p-8 text-center">
          <Text className="text-xl font-medium text-[var(--text-h)]">No stories found</Text>
          <Text className="text-[var(--text)]">Try selecting different topics or clear your filters.</Text>
          <Button 
            onPress={() => setSelectedTopicIds(new Set())}
            className="mt-2 text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          <GridList 
            items={articles} 
            aria-label="Article feed"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {(article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                isBookmarked={isBookmarked(article.id)} 
                onToggleBookmark={toggleBookmark} 
                onOpen={onOpenArticle}
              />
            )}
          </GridList>

          <div ref={observerTarget} className="mt-12 flex justify-center py-8">
            {isFetchingMore ? (
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent-bg)] border-t-[var(--accent)]"></div>
                <Text className="text-sm font-medium text-[var(--text)]">Loading more stories...</Text>
              </div>
            ) : nextPage === null && articles.length > 0 ? (
              <Text className="text-sm font-medium text-[var(--text)]/40">You've reached the end of the feed.</Text>
            ) : null}
          </div>
        </>
      )}
    </main>
  );
}
