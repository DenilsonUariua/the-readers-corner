import { GridList, Heading, Text } from 'react-aria-components';
import { useBookmarks } from '../lib/useBookmarks';
import { ArticleCard } from '../components/articleCard';

interface BookmarkPageProps {
  onOpenArticle: (id: string) => void;
}

export default function BookmarkPage({ onOpenArticle }: BookmarkPageProps) {
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-8 md:py-16">
      <header className="mb-12">
        <Heading level={1} className="text-4xl font-bold tracking-tight text-[var(--text-h)] md:text-5xl">
          Your Bookmarks
        </Heading>
        <Text className="mt-4 block text-lg leading-relaxed text-[var(--text)]">
          Stories you've saved to read later.
        </Text>
      </header>

      {bookmarks.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--social-bg)] p-8 text-center">
          <Text className="text-xl font-medium text-[var(--text-h)]">No bookmarks yet</Text>
          <Text className="text-[var(--text)]">Articles you bookmark will appear here.</Text>
        </div>
      ) : (
        <GridList 
          items={bookmarks} 
          aria-label="Bookmarked articles"
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
      )}
    </main>
  );
}
