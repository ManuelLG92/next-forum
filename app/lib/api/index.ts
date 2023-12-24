import { unstable_noStore as noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';
const BASE_API = 'http://localhost:8080';

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const buildFilters = (data: Record<string, string>) => {
  let init: Record<string, string> = {};
  const values = Object.entries(data).reduce((prev, [key, value]) => {
    if (value) {
      prev[key] = value.toString();
    }
    return prev;
  }, init);
  return new URLSearchParams(values);
};

export const fetcher = async (
  url: string,
  method: HTTP_METHODS,
  body?: any,
) => {
  noStore();
  const data = await fetch(`${BASE_API}/${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await data.json();
  if (data.status > 399) {
    console.log(dataJson);
    throw new Error(dataJson.message);
  }
  return dataJson;
};
