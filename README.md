# The Reader's Corner

A modern, accessible web application for discovering and saving articles. Built with a focus on UX, accessibility, and clean component architecture.

## 🚀 Getting Started

To run this project locally from a clean clone:

```bash
# Install dependencies
yarn install

# Start the development server
yarn run dev

# Run unit tests
yarn test
```

The application will be available at `https://the-readers-corner.vercel.app/`.

## � Deployment & CI/CD

This project is hosted on **Vercel**. 

- **Automated Workflow**: Any merge or changes into/on the `main` branch triggers an automatic deployment to the production environment.
- **Preview Deployments**: Pull requests and commits to other branches generate unique preview URLs for testing before merging to production.

## � Tech Stack

- **React 19**: Core UI library.
- **Vite 8**: Next-generation frontend tooling.
- **React Aria Components**: For building accessible, high-quality UI components with built-in keyboard support and ARIA patterns.
- **Tailwind CSS 4**: Utility-first styling for a responsive and modern design.
- **TypeScript 6**: For strict type safety and a robust developer experience.
- **Local Storage**: Used for persistent bookmark management without a backend.
- **Vitest & Testing Library**: For unit testing business logic and hooks.

## 📝 Project Details

### What's done?
- **Responsive Header**: Includes a search bar and navigation between Feed and Bookmarks.
- **Article Feed**:
  - **Live Search**: Integrated search bar in the header that filters articles by title with debouncing for performance.
  - Infinite scroll pagination using `IntersectionObserver`.
  - Topic-based filtering with multi-select support.
  - Robust loading, error (with in-situ retry), and empty states.
- **Bookmark System**: Users can save articles which persist across sessions using `localStorage`.
- **Accessible UI**: Leveraged React Aria for components like `TagGroup`, `GridList`, and `SearchField` to ensure full keyboard navigation and screen-reader compatibility.
- **Modern Styling**: A clean, editorial-style layout using Tailwind CSS that works seamlessly on mobile and desktop.
- **Unit Testing**: Comprehensive test suite for core business logic:
  - **Mock API**: Validates pagination, topic filtering, search, and error handling.
  - **Custom Hooks**: Verifies bookmark persistence and state management in `useBookmarks`.
  - **Environment**: Powered by Vitest and JSDOM for fast, reliable testing.

### What's skipped — and why?
- **Full Routing (e.g., React Router)**: I opted for a simple state-based conditional rendering in `App.tsx` to keep the project lightweight and focused on the core requirements. For a larger app, I would implement URL-based routing.
- **Article Detail Pages**: The mock API supports fetching individual articles, but I focused on the "Feed" and "Bookmark" views as per the core request.
- **Full UI Testing**: While business logic in `lib` is covered by unit tests, I've skipped full component/integration testing (e.g. testing the Header navigation or Infinite Scroll interactions) due to time constraints.

### What would come next?
- **URL as State**: Syncing topic filters and search queries with URL search parameters to allow for deep linking.
- **Component & Integration Tests**: Adding tests for complex UI interactions like the `IntersectionObserver` and navigation.
- **Article Reading View**: Implementing a dedicated page for reading full articles.
- **Animation**: Adding micro-interactions using Framer Motion for smoother transitions between states.

## ⚖️ Trade-offs & Decisions

1. **React Aria vs. Custom Components**: I chose React Aria Components to ensure world-class accessibility without reinventing complex patterns like keyboard navigation for grids and tag lists. This allows the code to remain "clean" while being highly functional.
2. **Local Storage for Bookmarks**: Since there's no backend, `localStorage` was the most sensible choice for persistence. I wrapped this in a custom `useBookmarks` hook to separate business logic from UI components.
3. **Tailwind v4 with CSS Variables**: I utilized Tailwind 4's new features alongside the existing project's CSS variables (`--accent`, `--text-h`) to maintain a consistent theme while gaining the speed of utility classes.
4. **Retry Logic**: Instead of a simple page reload, the retry button refetches the data using the `loadInitialFeed` callback, providing a better "Single Page App" experience.
