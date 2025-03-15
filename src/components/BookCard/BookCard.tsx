import React from "react";
import styles from "./book-card.module.scss";
import { SimpleBook } from "@/util/Types";
import { processBookAuthors } from "@/util/util";
import Link from "next/link";
import VerticalBookImage from "../VerticalBookImage/VerticalBookImage";

type Props = {
  book: SimpleBook;
};

function BookCard({ book }: Props) {
  const bookImageURL = `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`;

  return (
    <Link className={styles.bookCard} href={`/book/${book.key.split("/")[2]}`}>
      <VerticalBookImage src={bookImageURL} alt={book.title} />
      <div className={styles.noBookCoverOverlay}>No Book Cover Found</div>
      <div className={styles.bookOverlay}>
        <h3>{book.title}</h3>
        <h4>Written by: {processBookAuthors(book.authors)}</h4>
      </div>
    </Link>
  );
}

export default BookCard;
