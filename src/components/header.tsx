import { Button, SearchField, Input, Label, Group } from 'react-aria-components';

interface HeaderProps {
  activePage: 'feed' | 'bookmarks';
  onPageChange: (page: 'feed' | 'bookmarks') => void;
}

export function Header({ activePage, onPageChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg)] px-8 py-4">
      <div className="mx-auto flex flex-row max-w-[1200px] items-center justify-between gap-8 max-md:flex-col max-md:gap-4">
        <div className="shrink-0 cursor-pointer" onClick={() => onPageChange('feed')}>
          <h5 className="m-0 text-sm font-medium text-[var(--text-h)]">The Reader's Corner</h5>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-6 max-md:w-full max-md:flex-col max-md:gap-4">
          <SearchField className="flex w-full max-w-[400px] flex-col gap-1 max-md:max-w-none">
            <Label className="hidden">Search</Label>
            <Group className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--social-bg)] px-3 py-1 transition-all focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]">
              <Input 
                placeholder="Search articles..." 
                className="w-full border-none bg-transparent py-1.5 text-base text-[var(--text)] outline-none placeholder:text-[var(--text)]/50"
              />
              <Button 
                slot="clear" 
                className="flex items-center justify-center rounded p-1 text-sm text-[var(--text)] hover:bg-[var(--border)] pressed:bg-[var(--border)]"
              >
                ✕
              </Button>
            </Group>
          </SearchField>

          <nav className="flex gap-3">
            <Button 
              onPress={() => onPageChange('feed')}
              className={`rounded-lg border border-transparent px-4 py-2 text-base font-medium transition-all hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${activePage === 'feed' ? 'bg-[var(--accent-bg)] text-[var(--accent)]' : 'text-[var(--text)]'}`}
            >
              Feed
            </Button>
            <Button 
              onPress={() => onPageChange('bookmarks')}
              className={`rounded-lg border border-transparent px-4 py-2 text-base font-medium transition-all hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${activePage === 'bookmarks' ? 'bg-[var(--accent-bg)] text-[var(--accent)]' : 'text-[var(--text)]'}`}
            >
              Bookmarks
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
