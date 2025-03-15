export interface SimpleBook {
  key: string;
  title: string;
  cover_id: string;
  authors: string[];
}

export interface DetailedBook {
  title: string;
  author: string;
  authorDetails?: {
    name: string;
    birth_date?: string;
    death_date?: string;
    bio?: string | { value: string };
  } | null;
  description: string;
  genres: string[];
  editions: Edition | Edition[];
  cover_id: string;
}

export interface Edition {
  type: {
    key: string;
  };
  key: string;
  title: string;
  full_title: string;
  authors: Array<{
    key: string;
  }>;
  isbn_13: string[];
  languages: Array<{
    key: string;
  }>;
  pagination: string;
  publish_date: string;
  publishers: string[];
  source_records: string[];
  subjects: string[];
  works: Array<{
    key: string;
  }>;
  covers: number[];
  number_of_pages: number;
  weight: string;
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
}
