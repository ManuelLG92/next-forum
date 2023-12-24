export interface User {
  data: { id: string; name: string };
  posts: Array<{ id: string; title: string; content: string }>;
}

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};
