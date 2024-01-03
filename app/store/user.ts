import { create } from 'zustand';

export const intialUsers = [
  '6f444d5b-af63-4d24-a6e7-9ca967510eba',
  '9feb8add-caad-41db-ac42-75499e7bf198',
  'e85b4f69-540a-431e-bfaa-dc0ffed12993',
  '56e30aaf-d5e2-458d-b346-cd8cad5dcc4c',
  '93b0a39f-2208-4f6d-8581-538c29dfdccf',
];
const getRandomUser = () =>
  intialUsers[Math.floor(Math.random() * intialUsers.length)];

type UserState = {
  id: string;
  users: Array<string>;
  addUser: (value: string) => void;
  removeUser: (value: string) => void;
  set: (value: string) => void;
  reset: () => void;
};

const useUserStore = create<UserState>((set, get) => ({
  id: getRandomUser(),
  users: intialUsers,
  addUser: (value: string) =>
    set((state) => ({ users: [...state.users, value] })),
  removeUser: (value: string) =>
    set((state) => ({ users: state.users.filter((user) => user !== value) })),
  set: (value: string) => set({ id: value }),
  reset: () => () => set({ id: '' }),
}));

export default useUserStore;
