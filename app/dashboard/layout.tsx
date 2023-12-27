'use client';
import SideNav from '@/app/ui/dashboard/sidenav';
import React from 'react';
import useUserStore, { users } from '@/app/store/user';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id, set } = useUserStore();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <div className="flex py-12">
          <p className="mr-8 mt-2">Current User</p>
          <select value={id} onChange={(e) => set(e.target.value)}>
            {users.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <hr className="mb-4 border-gray-200 dark:border-gray-700 sm:mx-auto lg:mb-4" />
        {children}
      </div>
    </div>
  );
}
