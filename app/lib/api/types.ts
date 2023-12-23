export type BaseFields = {
  id: string;
  createdAt: string;
  updatedAt?: string;
};

export type Address = {
  street: string;
  state: string;
  city: string;
  postalCode: string;
  country: string;
};

export type Subject = {
  name: string;
  course: Course;
} & BaseFields;

export type Student = {
  section: Section;
  parents: Person[];
} & Person;
export type Section = {
  name: string;
  courses: Course[];
  students: Student[];
} & BaseFields;
export type Course = {
  name: string;
  seasons: Season[];
  sections: Section[];
  subjects: Subject[];
} & BaseFields;

export type BaseList<T> = {
  data: T[];
  count?: number;
  currentPage?: number;
};
export type Season = {
  name: string;
  startAt: string;
  endAt: string;
  school: School;
  courses: Course[];
} & BaseFields;

export enum PersonRoles {
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent',
}

export type Person = {
  name: string;
  age: number;
  role: PersonRoles;
  address: Address;
} & BaseFields;

export type School = {
  name: string;
  address: Address;
  seasons: Season[];
  teachers: Person[];
} & BaseFields;
