export interface SimpleBook {
  author_key: string[];
  author_name: string[];
  cover_edition_key: string;
  cover_i: number;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  ia: string[];
  ia_collection_s: string;
  key: string;
  language: string[];
  lending_edition_s: string;
  lending_identifier_s: string;
  public_scan_b: boolean;
  title: string;
}

export interface DetailedBook {
  key: string;
  title: string;
  edition_count: number;
  cover_id: number;
  cover_edition_key: string;
  subject: string[];
  ia_collection: string[];
  printdisabled: boolean;
  lending_edition: string;
  lending_identifier: string;
  authors: { key: string; name: string }[];
  first_publish_year: number;
  ia: string;
  public_scan: boolean;
  has_fulltext: boolean;
  availability: {
    status: string;
    available_to_browse: boolean;
    available_to_borrow: boolean;
    available_to_waitlist: boolean;
    is_printdisabled: boolean;
    is_readable: boolean;
    is_lendable: boolean;
    is_previewable: boolean;
    identifier: string;
    isbn: string | null;
    oclc: string | null;
    openlibrary_work: string;
    openlibrary_edition: string;
    last_loan_date: string | null;
    num_waitlist: number | null;
    last_waitlist_date: string | null;
    is_restricted: boolean;
    is_browseable: boolean;
    __src__: string;
  };
}
