import { ARTICLES } from './seed';

export type Article = {
  id: string;
  title: string;
  lead: string;
  body: string;
  author: string;
  publishedAt: string;
  topics: { id: string; name: string }[];
  premium: boolean;
  imageUrl: string | null;
};

export type FeedResponse = {
  data: Article[];
  meta: { nextPage: number | null; total: number };
};

const PAGE_SIZE = 10;

export async function fetchFeed(
  params: { page?: number; topics?: string[]; q?: string } = {}
): Promise<FeedResponse> {
  await delay();
  if (Math.random() < 0.05) throw new Error('Network error');

  const page = params.page ?? 0;

  let filtered = ARTICLES;
  if (params.topics?.length) {
    filtered = filtered.filter(a =>
      a.topics.some(t => params.topics!.includes(t.id))
    );
  }
  if (params.q) {
    const q = params.q.toLowerCase();
    filtered = filtered.filter(a =>
      [a.title, a.lead, a.body].some(f => f.toLowerCase().includes(q))
    );
  }

  const start = page * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);
  const nextPage = start + PAGE_SIZE < filtered.length ? page + 1 : null;

  return { data: slice, meta: { nextPage, total: filtered.length } };
}

export async function fetchArticle(id: string): Promise<Article> {
  await delay();
  const article = ARTICLES.find(a => a.id === id);
  if (!article) throw new Error('Not found');
  return article;
}

const delay = () =>
  new Promise(r => setTimeout(r, 300 + Math.random() * 400));
