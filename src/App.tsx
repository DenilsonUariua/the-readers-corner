import { useState, useEffect } from 'react'
import { Header } from './components/header'
import FeedPage from './pages/feed'
import BookmarkPage from './pages/bookmark'
import ArticlePage from './pages/article'
import { BookmarkProvider } from './context/BookmarkContext'

type Page = 'feed' | 'bookmarks' | 'article';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('feed')
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleOpenArticle = (id: string) => {
    setSelectedArticleId(id)
    setCurrentPage('article')
    window.scrollTo(0, 0)
  }

  const handleBackToFeed = () => {
    setCurrentPage('feed')
    setSelectedArticleId(null)
  }

  return (
    <BookmarkProvider>
      <div className="flex min-h-screen flex-col bg-[var(--bg)]">
        <Header 
          activePage={currentPage === 'article' ? 'feed' : currentPage} 
          onPageChange={(page) => {
            setCurrentPage(page)
            setSelectedArticleId(null)
          }} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        {currentPage === 'feed' && (
          <FeedPage 
            searchQuery={debouncedSearchQuery} 
            onOpenArticle={handleOpenArticle} 
          />
        )}
        
        {currentPage === 'bookmarks' && (
          <BookmarkPage 
            onOpenArticle={handleOpenArticle} 
          />
        )}
        
        {currentPage === 'article' && selectedArticleId && (
          <ArticlePage 
            articleId={selectedArticleId} 
            onBack={handleBackToFeed} 
          />
        )}
      </div>
    </BookmarkProvider>
  )
}

export default App
