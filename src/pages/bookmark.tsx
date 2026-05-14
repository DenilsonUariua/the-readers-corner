import { Button, GridList, GridListItem, Heading, Text } from 'react-aria-components';
import { useBookmarks } from '../lib/useBookmarks';

export default function BookmarkPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();

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
                    className="rounded-full p-2.5 text-[var(--accent)] transition-colors hover:bg-[var(--accent-bg)]"
                  >
                    <span className="text-xl">🔖</span>
                  </Button>
                </div>
              </div>
            </GridListItem>
          )}
        </GridList>
      )}
    </main>
  );
}
