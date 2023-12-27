import { create } from 'zustand';

export const users = [
  '6f444d5b-af63-4d24-a6e7-9ca967510eba',
  '9feb8add-caad-41db-ac42-75499e7bf198',
  'e85b4f69-540a-431e-bfaa-dc0ffed12993',
  '56e30aaf-d5e2-458d-b346-cd8cad5dcc4c',
  '93b0a39f-2208-4f6d-8581-538c29dfdccf',
];
const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

type UserState = {
  id: string;
  set: (value: string) => void;
  reset: () => void;
};

const useUserStore = create<UserState>((set) => ({
  id: getRandomUser(),
  set: (value: string) => set({ id: value }),
  reset: () => () => set({ id: '' }),
}));

export default useUserStore;
