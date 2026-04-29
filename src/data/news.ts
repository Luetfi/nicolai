export type NewsCategory = 'news' | 'course' | 'info';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: NewsCategory;
}

export interface NewsFile {
  _updated: string;
  items: NewsItem[];
}
