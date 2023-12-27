export interface User {
  id: string;
  name: string;
  created_at: string;

  posts: Array<{ id: string; title: string; content: string }>;
}

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};
