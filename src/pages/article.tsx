import { useEffect, useState, useMemo } from 'react';
import { Button, Heading, Text } from 'react-aria-components';
import { fetchArticle, type Article } from '../lib/mockApi';
import { useBookmarks } from '../lib/useBookmarks';

interface ArticlePageProps {
  articleId: string;
  onBack: () => void;
}

export default function ArticlePage({ articleId, onBack }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    async function loadArticle() {
      try {
        setIsLoading(true);
        const data = await fetchArticle(articleId);
        setArticle(data);
      } catch (err) {
        setError('Failed to load article.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticle();
  }, [articleId]);

  const processedBody = useMemo(() => {
    if (!article) return null;
    
    // Split by sentences (simple regex for periods followed by space)
    const sentences = article.body.split(/(?<=\. )/);
    
    if (article.premium && sentences.length > 2) {
      const visible = sentences.slice(0, 2).join('');
      const blurred = sentences.slice(2).join('');
      return (
        <div className="relative">
          <p className="mb-4 text-lg leading-relaxed text-[var(--text)]">
            {visible}
          </p>
          <div className="relative overflow-hidden rounded-lg">
            <p className="text-lg leading-relaxed text-[var(--text)] blur-md select-none">
              {blurred}
            </p>
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-8 text-center shadow-2xl">
                <span className="mb-4 block text-4xl">💎</span>
                <Heading level={3} className="mb-2 text-xl font-bold text-[var(--text-h)]">
                  Premium Content
                </Heading>
                <Text className="mb-6 block text-[var(--text)]">
                  This article is part of our premium collection.
                </Text>
                <Button className="rounded-full bg-[var(--accent)] px-8 py-3 font-bold text-white transition-all hover:bg-[var(--accent)]/90">
                  Upgrade to Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <p className="text-lg leading-relaxed text-[var(--text)] whitespace-pre-wrap">
        {article.body}
      </p>
    );
  }, [article]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Text className="text-lg text-[var(--text)]">Loading article...</Text>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Heading className="mb-4 text-2xl font-bold text-red-600">Error</Heading>
        <Text className="mb-8 block text-[var(--text)]">{error || 'Article not found.'}</Text>
        <Button 
          onPress={onBack}
          className="rounded-full bg-[var(--accent)] px-6 py-2 text-white"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <article className="mx-auto w-full max-w-[800px] px-6 py-10 md:py-16">
      <Button 
        onPress={onBack}
        className="mb-12 flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
      >
        ← Back to Feed
      </Button>

      <header className="mb-12">
        <div className="mb-6 flex flex-wrap gap-3">
          {article.topics.map(topic => (
            <span key={topic.id} className="text-sm font-bold uppercase tracking-widest text-[var(--accent)]">
              {topic.name}
            </span>
          ))}
          {article.premium && (
            <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950 shadow-sm">
              Premium
            </span>
          )}
        </div>

        <Heading level={1} className="mb-8 text-4xl font-bold leading-tight text-[var(--text-h)] md:text-5xl lg:text-6xl">
          {article.title}
        </Heading>

        <div className="flex items-center justify-between border-y border-[var(--border)] py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-bg)] text-lg font-bold text-[var(--accent)]">
              {article.author.charAt(0)}
            </div>
            <div className="flex flex-col">
              <Text className="font-bold text-[var(--text-h)]">{article.author}</Text>
              <Text className="text-sm text-[var(--text)]/60">
                {new Date(article.publishedAt).toLocaleDateString(undefined, { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </div>
          </div>
          <Button 
            onPress={() => toggleBookmark(article)}
            className={`rounded-full p-3 transition-colors hover:bg-[var(--accent-bg)] ${isBookmarked(article.id) ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}
          >
            <span className="text-2xl">🔖</span>
          </Button>
        </div>
      </header>

      {article.imageUrl && (
        <div className="mb-12 overflow-hidden rounded-3xl bg-[var(--social-bg)]">
          <img 
            src={article.imageUrl} 
            alt="" 
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="article-content">
        <p className="mb-10 text-xl font-medium leading-relaxed text-[var(--text-h)]">
          {article.lead}
        </p>
        {processedBody}
      </div>
    </article>
  );
}
