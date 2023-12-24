'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Limit() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLimit = Number(searchParams.get('limit') || 10);

  const route = useRouter();
  const [selected, setSelected] = React.useState(currentLimit);
  const createPageURL = (limit: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', limit.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelected(+selected);
    const url = createPageURL(selected);
    route.push(url);
  };

  return (
    <>
      <select onChange={handleChange} value={selected}>
        {[1, 2, 3, 4, 5, 10].map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
