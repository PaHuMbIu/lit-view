export interface BookInfo {
  author: string;
  download_count: number;
  id: number;
  title: string;
  formats: string | null;
  subjects?: string[];
}

export interface ApiBook {
  id: number;
  title: string;
  authors: { name: string }[];
  download_count: number;
  formats: { [key: string]: string };
  subjects?: string[];
}

export interface ApiBookRes {
  results: ApiBook[];
  next: string | null;
}
