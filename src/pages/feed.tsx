import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Button, GridList, GridListItem, Heading, Text, TagGroup, Tag, TagList, Label } from 'react-aria-components';
import { fetchFeed, type Article } from '../lib/mockApi';
import { TOPICS } from '../lib/seed';
import { useBookmarks } from '../lib/useBookmarks';

interface FeedPageProps {
  searchQuery?: string;
}

export default function FeedPage({ searchQuery = '' }: FeedPageProps) {
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
              <GridListItem 
                key={article.id} 
                textValue={article.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] transition-all hover:border-[var(--accent-border)] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--social-bg)]">
                  {article.imageUrl ? (
                    <img 
                      src={article.imageUrl} 
                      alt="" 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[var(--text)]/20">
                      <span className="text-5xl">📖</span>
                    </div>
                  )}
                  {article.premium && (
                    <div className="absolute top-4 right-4 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950 shadow-sm">
                      Premium
                    </div>
                  )}
                </div>
                
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {article.topics.map(topic => (
                      <span 
                        key={topic.id} 
                        className="text-xs font-bold uppercase tracking-widest text-[var(--accent)]"
                      >
                        {topic.name}
                      </span>
                    ))}
                  </div>

                  <Heading level={2} className="mb-3 line-clamp-2 text-2xl font-bold leading-tight text-[var(--text-h)] group-hover:text-[var(--accent)]">
                    {article.title}
                  </Heading>

                  <Text slot="description" className="mb-8 line-clamp-3 flex-1 text-base leading-relaxed text-[var(--text)]">
                    {article.lead}
                  </Text>

                  <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-bg)] text-sm font-bold text-[var(--accent)]">
                        {article.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <Text className="text-sm font-bold text-[var(--text-h)]">
                          {article.author}
                        </Text>
                        <Text className="text-xs text-[var(--text)]/60">
                          {new Date(article.publishedAt).toLocaleDateString(undefined, { 
                            month: 'long', 
                            day: 'numeric'
                          })}
                        </Text>
                      </div>
                    </div>
                    <Button 
                      onPress={() => toggleBookmark(article)}
                      className={`rounded-full p-2.5 transition-colors hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] ${isBookmarked(article.id) ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}
                    >
                      <span className="text-xl">🔖</span>
                    </Button>
                  </div>
                </div>
              </GridListItem>
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
