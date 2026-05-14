import { useState } from 'react'
import { Header } from './components/header'
import FeedPage from './pages/feed'
import BookmarkPage from './pages/bookmark'

function App() {
  const [currentPage, setCurrentPage] = useState<'feed' | 'bookmarks'>('feed')

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <Header 
        activePage={currentPage} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
      {currentPage === 'feed' ? (
        <FeedPage />
      ) : (
        <BookmarkPage />
      )}
    </div>
  )
}

export default App
