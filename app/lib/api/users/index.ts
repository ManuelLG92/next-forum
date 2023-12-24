export const BASE_USERS = 'users';

export interface User {
  data: { id: string; name: string };
  posts: Array<{ id: string; title: string; content: string }>;
}
