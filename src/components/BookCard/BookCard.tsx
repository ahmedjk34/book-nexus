import React from "react";
import styles from "./book-card.module.scss";
import { DetailedBook, SimpleBook } from "@/util/Types";
import { isDetailedBook, processBookAuthors } from "@/util/util";
import Link from "next/link";
import BookImage from "./BookImage";

type Props = {
  book: SimpleBook | DetailedBook;
};

function BookCard({ book }: Props) {
  const imageName = isDetailedBook(book) ? book.cover_id : book?.cover_i;
  const bookImageURL = `https://covers.openlibrary.org/b/id/${imageName}-L.jpg`;

  return (
    <Link className={styles.bookCard} href={`/book/${book.key.split("/")[2]}`}>
      <BookImage src={bookImageURL} alt={book.title} />
      <div className={styles.noBookCoverOverlay}>No Book Cover Found</div>
      <div className={styles.bookOverlay}>
        <h3>{book.title}</h3>
        <h4>
          Written by:{" "}
          {isDetailedBook(book)
            ? processBookAuthors(book.authors)
            : processBookAuthors(book.author_name)}
        </h4>
      </div>
    </Link>
  );
}

export default BookCard;
