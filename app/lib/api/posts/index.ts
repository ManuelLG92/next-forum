export const BASE_POSTS = 'posts';

export interface Posts {
  id: string;
  title: string;
  content: string;
  user: {
    id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
}
