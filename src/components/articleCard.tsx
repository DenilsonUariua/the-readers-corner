import { Button, GridListItem, Heading, Text } from 'react-aria-components';
import type { Article } from '../lib/mockApi';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  onOpen: (articleId: string) => void;
}

export function ArticleCard({ article, isBookmarked, onToggleBookmark, onOpen }: ArticleCardProps) {
  return (
    <GridListItem 
      textValue={article.title}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] transition-all hover:border-[var(--accent-border)] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] active:scale-[0.98] active:border-[var(--accent)]"
    >
      <div 
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-[var(--social-bg)]"
        onClick={() => onOpen(article.id)}
      >
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

        <Heading 
          level={2} 
          className="mb-3 cursor-pointer line-clamp-2 text-2xl font-bold leading-tight text-[var(--text-h)] group-hover:text-[var(--accent)]"
          onClick={() => onOpen(article.id)}
        >
          {article.title}
        </Heading>

        <Text 
          slot="description" 
          className="mb-8 cursor-pointer line-clamp-3 flex-1 text-base leading-relaxed text-[var(--text)]"
          onClick={() => onOpen(article.id)}
        >
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
            onPress={(e) => {
              // Stop propagation to prevent opening the article when clicking the bookmark button
              e.continuePropagation();
              onToggleBookmark(article);
            }}
            className={`rounded-full p-2.5 transition-all hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] 
              ${isBookmarked 
                ? 'bg-[var(--accent)] text-white shadow-md' 
                : 'bg-[var(--accent-bg)]/30 text-[var(--text)] hover:scale-110'}`}
            aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
          >
            <span className={`text-xl transition-transform ${isBookmarked ? 'scale-110' : ''}`}>
              {isBookmarked ? '🔖' : '🔖'}
            </span>
          </Button>
        </div>
      </div>
    </GridListItem>
  );
}
