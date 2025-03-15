export interface SimpleBook {
  key: string;
  title: string;
  cover_id: string;
  authors: string[];
}

export interface DetailedBook {
  title: string;
  authors_names: string[];
  authors_details: Author[];
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

export interface Author {
  photos: number[];
  source_records: string[];
  type: { key: string };
  links: {
    url: string;
    title: string;
    type: object[];
  }[];
  remote_ids: {
    isni: string;
    wikidata: string;
    viaf: string;
  };
  title: string;
  personal_name: string;
  key: string;
  name: string;
  birth_date: string;
  bio: string;
  alternate_names: string[];
  death_date: string;
  latest_revision: number;
  revision: number;
  created: { type: string; value: string };
  last_modified: { type: string; value: string };
}
