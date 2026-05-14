import { useState } from 'react'
import { Header } from './components/header'
import FeedPage from './pages/feed'


function App() {
  const [currentPage, setCurrentPage] = useState<'bookmarks' | 'feed'>('feed')

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <Header />
      {currentPage === 'bookmarks' ? (
        <>
          <section id="center">
            {/* Existing landing page content */}
          </section>
        </>
      ) : (
        <FeedPage />
      )}
    </div>
  )
}

export default App
