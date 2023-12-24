export const BASE_COURSE = 'courses';

export interface User { data: {id : string; name: string}; posts: Array<{id: string; title: string, content: string}>;}
