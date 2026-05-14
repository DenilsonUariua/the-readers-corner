import { useState, useEffect } from 'react'
import { Header } from './components/header'
import FeedPage from './pages/feed'
import BookmarkPage from './pages/bookmark'

function App() {
  const [currentPage, setCurrentPage] = useState<'feed' | 'bookmarks'>('feed')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

  // Debounce search query to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <Header 
        activePage={currentPage} 
        onPageChange={(page) => setCurrentPage(page)} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {currentPage === 'feed' ? (
        <FeedPage searchQuery={debouncedSearchQuery} />
      ) : (
        <BookmarkPage />
      )}
    </div>
  )
}

export default App
